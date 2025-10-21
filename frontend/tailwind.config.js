// import withMT from '@material-tailwind/react/utils/withMT';
// import { mtConfig } from "@material-tailwind/react";

// /** @type {import('tailwindcss').Config} */
// export default withMT({
//   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
//   theme: {
//     extend: {},
//   },
//   plugins: [require('daisyui')],
// });

import withMT from '@material-tailwind/react/utils/withMT';
import { mtConfig } from "@material-tailwind/react";

/** @type {import('tailwindcss').Config} */
export default {
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui'), mtConfig],
};

