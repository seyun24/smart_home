import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    base: "/smart_home/",
    plugins: [react()],
    server: {
        port: 5173,
        host: true
    }
})

