import { defineConfig } from 'vite'
import fs from 'node:fs'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
//   server: {
//     https:{
//    key: fs.readFileSync('./localhost-key.pem'),
//       cert: fs.readFileSync('./localhost.pem'),
//   },
// }
})
