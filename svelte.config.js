import adapter from "svelte-kit-sst";
import { vitePreprocess } from "@sveltejs/kit/vite";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  compilerOptions: {
    enableSourcemap: true,
  },
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
  },
  build: {
    sourcemap: true,
  },
};

export default config;
