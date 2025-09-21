import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

const plugins = [
  resolve({ browser: true }),
  typescript({ useTsconfigDeclarationDir: true })
];

module.exports = {
  input: './src/react-faceage.tsx',
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true
    },
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      exports: 'named',
      sourcemap: true
    }
  ],
  external: ['react', 'face-age'],
  plugins
}