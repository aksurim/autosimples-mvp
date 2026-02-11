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
          teal: '#0155CF',    // Azul Royal (Principal)
          orange: '#FF8B00',  // Laranja Vibrante (Ação)
          lime: '#FEBF12',    // Amarelo Ouro (Destaque)
          dark: '#282828',    // Mantido (Fundo Escuro)
          light: '#F5F7FA',   // Mantido (Fundo Claro)
        }
      }
    },
  },
  plugins: [],
}