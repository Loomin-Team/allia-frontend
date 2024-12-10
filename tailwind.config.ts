import type {Config} from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            maxWidth: {
                "generator": "var(--generator-max-width)",
            }
        },
        colors: {
            transparent: "transparent",
            background: "var(--background)",
            foreground: {
                DEFAULT: "var(--foreground)",
                muted: "var(--foreground-muted)",
                secondary: "var(--foreground-secondary)",
            },
            white: "var(--white)",
            black: "var(--black)",
            primary: {
                DEFAULT: "var(--primary)",
                muted: "var(--primary-muted)"
            },
            secondary: "var(--secondary)",
            tertiary: {
                DEFAULT: "var(--tertiary)",
                muted: "var(--tertiary-muted)",
            },
            accent: "var(--accent)",
            warning: {
                DEFAULT: "var(--warning)",
                muted: "var(--warning-muted)",
            },
            danger: {
                DEFAULT: "var(--danger)",
                muted: "var(--danger-muted)",
            },
            "input-border": "var(--input-border)"
        },
    },
    plugins: [],
} satisfies Config;
