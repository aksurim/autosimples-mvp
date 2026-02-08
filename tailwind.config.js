/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        brand: {
          teal: '#06777F',    // Cor Principal (Identidade)
          orange: '#FB4629',  // Ação / Urgência (Botões)
          lime: '#DAF043',    // Destaques / Energia
          dark: '#282828',    // Textos / Fundo Escuro
          light: '#F5F7FA',   // Fundo Claro (Suave)
        }
      }
    },
  },
  plugins: [],
}