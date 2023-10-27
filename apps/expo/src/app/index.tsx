import { useState } from "react";
import { Button, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { api } from "@/utils/api";

const Index = () => {
  const [room, setRoom] = useState<string>("");
  // const [rooms, setRooms] = useState<Rooms[] | undefined>([]);
  const mutation = api.post.createRoom.useMutation();

  function createRoom() {
    console.log(room);
    mutation.mutate(room);
  }
  // useEffect(() => {
  //   const { data } = api.post.getRooms.useQuery();
  //   setRooms(data);
  // });
  return (
    <SafeAreaView>
      <Text className="p-4">the cool app</Text>
      <TextInput
        editable
        className="h-12 border-2 border-black p-4"
        value={room}
        onChangeText={setRoom}
        placeholder="room name"
      />
      <Button title="Join Room" onPress={createRoom} />
      <Link href="/rooms/n7g1g91360pl6vcpof5qj2su">
        <Text>Go to room n7g1g91360pl6vcpof5qj2su</Text>
      </Link>
    </SafeAreaView>
  );
};

export default Index;
