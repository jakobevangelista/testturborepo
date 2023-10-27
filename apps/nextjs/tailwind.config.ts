import type { Config } from "tailwindcss";

import baseConfig from "@t3test/tailwind-config";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  presets: [baseConfig],
} satisfies Config;
