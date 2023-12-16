/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: "jit",
    content: ["./src/**/*.{html,js}", "node_modules/preline/dist/*.js"],
    theme: {
        extend: {
            fontFamily: {
                "rethink": ["Rethink Sans", "sans-serif"],
            },
            fontWeight: {
                "regular": 400,
                "medium": 500,
                "semibold": 600,
                "bold": 700,
                "extrabold": 800,
            },
        },
    },
    plugins: [require("daisyui"), require("@tailwindcss/forms"), require("preline/plugin")],
};
