// import { Suspense } from "react";

import { api } from "~/utils/server";

// import ClientComponent from "./ClientComponent";

// import { AuthShowcase } from "./_components/auth-showcase";
// import {
//   CreatePostForm,
//   PostCardSkeleton,
//   PostList,
// } from "./_components/posts";

// export const runtime = "edge";

export default async function HomePage() {
  const data = await api.post.getRooms.query();
  console.log(data[0]);
  return (
    <main>{data !== undefined ? <div>bet</div> : <div>not bet</div>}</main>
  );
}
