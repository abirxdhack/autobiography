import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: process.env["GITHUB_ACTIONS"] ? { base: "/autobiography-/" } : {},
  tanstackStart: {
    server: { entry: "server" },
  },
});
