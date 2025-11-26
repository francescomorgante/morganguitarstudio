import { defineConfig } from "vitest/config";

export default defineConfig(async () => {
  // Import ESM-only plugins dynamically to avoid ERR_REQUIRE_ESM
  const reactPlugin = (await import("@vitejs/plugin-react")).default;

  return {
    plugins: [reactPlugin()],
    test: {
      environment: "jsdom",
      globals: true,
      // Se hai uno setup file per testing-library, abilitalo qui (opzionale)
      // setupFiles: "tests/setup.ts",
    },
  };
});
