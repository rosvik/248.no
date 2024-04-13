import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: 'https://248.no',
  base: "/",
  output: "server",
  trailingSlash: "ignore",
});
