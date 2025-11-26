import { defineConfig } from "vitest/config";

export default defineConfig(async () => {
  const react = await import("@vitejs/plugin-react");
  
  return {
    plugins: [react.default()],
    test: {
      environment: "happy-dom",
      globals: true,
    },
  };
});
