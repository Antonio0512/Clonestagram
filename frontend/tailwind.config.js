/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        fill: (theme) => ({
            red: theme("colors.red.primary"),
        }),
        extend: {
            colors: {
                white: "#ffffff",
                blue: {
                    medium: "#005c98",
                },
                black: {
                    light: "005c98",
                    faded: "#000059",
                },
                gray: {
                    base: "#616161",
                    backgroud: "#fafafa",
                    primary: "#dbdbdb",
                },
                red: {
                    primary: "#ed4956",
                },
            },
        },
    },
    plugins: [],
};
