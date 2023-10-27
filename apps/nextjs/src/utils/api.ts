import { createTRPCReact } from "@trpc/react-query";

import type { AppRouter } from "@t3test/api";

export const api = createTRPCReact<AppRouter>();

export { type RouterInputs, type RouterOutputs } from "@t3test/api";
