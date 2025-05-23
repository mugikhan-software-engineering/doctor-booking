import adapter from "svelte-kit-sst";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    version: {
      name: process.env.npm_package_version
    }
  }
};

export default config;
