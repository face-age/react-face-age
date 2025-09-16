import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify'

let pluginOptions = [
  resolve({
    browser: true
  }),
  babel({
    exclude: 'node_modules/**'
  }),
  uglify()
];

module.exports = {
  input: './src/react-faceage.jsx',
  output: [{
    name: 'ReactFaceAge',
    file: 'dist/react-faceage.iife.min.js',
    format: 'iife',
    globals: {
      react: "React",
      faceage: "FaceAge",
      'prop-types': "PropTypes"
    }
  }],
  external: ['react', 'face-age', 'prop-types'],
  plugins: pluginOptions
}