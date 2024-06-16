/** @type {import('tailwindcss').Config} */

import { poluiPlugin } from "pol-ui";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/pol-ui/**/*.js",
  ],

  plugins: [poluiPlugin()],
} satisfies Config;
