/* eslint-disable no-undef */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ajuste conforme a estrutura do seu projeto
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'ui-sans-serif', 'system-ui'],
      },
      screens: {
        'xs': '475px', // Adiciona um ponto de interrupção para telas menores
      },
    },
  },
  plugins: [],
  
  darkMode: 'media', // ou 'class' se preferir usar a classe 'dark'
  
}