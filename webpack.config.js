import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config = {
    entry: "./src/index.js",
    output: {
        path: resolve(__dirname, "./src/scripts"),
        filename: "firebase-auth.bundle.js",
    },
    devtool: "eval-source-map",
};

export default config;
