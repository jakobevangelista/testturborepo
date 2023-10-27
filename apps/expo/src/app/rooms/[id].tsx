import { useState } from "react";
import {
  Button,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useLocalSearchParams } from "expo-router";
import { api } from "@/utils/api";
import { useQueryClient } from "@tanstack/react-query";

// import { getQueryKey } from "@trpc/react-query";

const Index = () => {
  const [message, setMessage] = useState<string>("");
  const queryClient = useQueryClient();

  const mutation = api.post.sendMessage.useMutation({
    onSuccess: () => {
      // queryClient.invalidateQueries();
    },
  });
  const { id } = useLocalSearchParams<{ id: string }>();
  if (!id) return;

  const { data } = api.post.getMessages.useQuery(id, {
    refetchInterval: 1000,
  });
  function sendMessage() {
    if (!id) return;
    if (!message) return;
    console.log(message);
    mutation.mutate({ roomId: id, message: message });
    setMessage("");

    // const sendMessageKey = getQueryKey(api.post.sendMessage);
  }

  return (
    <SafeAreaView>
      <Link href="/">
        <Pressable>
          <Text>Go back home</Text>
        </Pressable>
      </Link>
      <Text className="p-4">Page {id}</Text>
      <TextInput
        editable
        className="h-12 border-2 border-black p-4"
        value={message}
        onChangeText={setMessage}
        placeholder="room name"
      />
      <Button title="Send Message" onPress={sendMessage} />
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View className="p-4">
            <Text>{item.content}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default Index;
