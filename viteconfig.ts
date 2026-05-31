import { cloudflare } from "@cloudflare/vite-plugin";
  export default defineConfig({
    plugins: [
      vinext(),
      cloudflare({
        viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
      }),
    ],
  });