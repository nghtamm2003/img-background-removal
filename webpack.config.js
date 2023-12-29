import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config = {
    entry: {
        firebase: "./src/scripts/unbundle/firebase.js",
        dropzone: "./src/scripts/unbundle/dropzone.js",
        emailjs: "./src/scripts/unbundle/emailjs.js"
    },
    output: {
        path: resolve(__dirname, "./src/scripts"),
        filename: "[name].bundle.js",
    },
    devtool: "eval-source-map",
};

export default config;
