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

// interface Messages {
//   id: string;
//   content: string | null;
//   createdAt: Date | null;
//   updatedAt: Date | null;
//   chatRoomId: string | null;
// }
const Index = () => {
  const [message, setMessage] = useState<string>("");
  //   const [messages, setMessages] = useState<Messages[]>();
  const mutation = api.post.sendMessage.useMutation();
  const { id } = useLocalSearchParams<{ id: string }>();

  function createRoom() {
    if (!id) return;
    if (!message) return;
    mutation.mutate({ roomId: id, message: message });
  }

  const { data } = api.post.getMessages.useQuery(id);
  console.log(id);
  console.log(data?.at(0));

  //   useEffect(() => {
  //     getMessages();
  //   }, []);
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
      <Button title="Send Message" onPress={createRoom} />
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
