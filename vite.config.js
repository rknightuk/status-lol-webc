import { resolve } from "path";

export default {
  build: {
    outDir: "dist",
    lib: {
      entry: resolve(__dirname, "src/index.js"),
      name: "status.lol widget",
      formats: ["es", "cjs"],
      fileName: "status-lol",
    },
  },
};
