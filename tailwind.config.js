/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],

  theme: { 
   
    extend: {
      fontFamily: {
        AnekLatin: ['Anek Latin','sans-serif'],
      },
      colors:{
       'gray-textColor': '#AEAEAE'
      }
    },
  },
  plugins: [],
}

