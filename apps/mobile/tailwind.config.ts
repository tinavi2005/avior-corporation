import type { Config } from 'tailwindcss'
import nativewindPreset from 'nativewind/preset'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  presets: [nativewindPreset],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config
