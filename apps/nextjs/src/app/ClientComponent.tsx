"use client";

import { useEffect, useState } from "react";

import { api } from "~/utils/api";

interface Rooms {
  id: string;
  name: string | null;
  inviteCode: string | null;
  description: string | null;
}
[];

const ClientComponent = () => {
  const [rooms, setRooms] = useState<Rooms>([]);

  useEffect(() => {
    const data: Rooms = api.post.getRooms.useQuery();
    setRooms(data);
    console.log(rooms);
  }, []);
  return (
    <>
      <div>ClientComponent</div>
    </>
  );
};

export default ClientComponent;
