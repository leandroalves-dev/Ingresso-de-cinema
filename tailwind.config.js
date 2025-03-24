// tailwind.config.js
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Garante que Tailwind processe os arquivos corretamente
    theme: {
      extend: {
        backgroundImage: {
          'custom-bg': "url('src/assets/bg.png')",
        },
      },
    },
    plugins: [],
};
  