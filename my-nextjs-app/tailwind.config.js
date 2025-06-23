// tailwind.config.js
/** @type { import('tailwindcss').Config } */
module.exports = { // Changed from module.exports to export default
    content: [
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
