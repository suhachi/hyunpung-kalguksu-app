
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import path from 'path';

export default defineConfig({
  base: '/',
  plugins: [react()],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        'react-hook-form@7.55.0': 'react-hook-form',
        'lucide-react@0.487.0': 'lucide-react',
        'figma:asset/f881b2d8bf23006ccae73c3d977f87a2e2dccf47.png': path.resolve(__dirname, './src/assets/f881b2d8bf23006ccae73c3d977f87a2e2dccf47.png'),
        'figma:asset/92c9b32635da68466319c6dfafbaf99b129ec904.png': path.resolve(__dirname, './src/assets/92c9b32635da68466319c6dfafbaf99b129ec904.png'),
        'figma:asset/75b3c0027407bb9d32080f5b3eb51096c93f9933.png': path.resolve(__dirname, './src/assets/75b3c0027407bb9d32080f5b3eb51096c93f9933.png'),
        'figma:asset/72ab99587b1fb72aa04a7051333c2c1411037d0e.png': path.resolve(__dirname, './src/assets/72ab99587b1fb72aa04a7051333c2c1411037d0e.png'),
        'figma:asset/326493a3b65735707c0e5d3d387262bcd7cdcc21.png': path.resolve(__dirname, './src/assets/326493a3b65735707c0e5d3d387262bcd7cdcc21.png'),
        'figma:asset/1710e1c0c8f0aa11de622128fdd40c7e0ada1ddd.png': path.resolve(__dirname, './src/assets/1710e1c0c8f0aa11de622128fdd40c7e0ada1ddd.png'),
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      outDir: 'build',
    },
    server: {
      port: 3000,
      open: true,
    },
  });