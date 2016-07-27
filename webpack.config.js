// module.exports = {
//   entry: './src/decorators.ts',
//   output: {
//     filename: 'ng1-decorators.js',
//     library: 'ng1-decorators',
//     libraryTarget: 'commonjs'
//   },
//   resolve: {
//     // Add `.ts` and `.tsx` as a resolvable extension.
//     extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
//   },
//   module: {
//     loaders: [
//       // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
//       { test: /\.tsx?$/, loader: 'ts-loader' }
//     ]
//   }
// }

// module.exports = {
//   entry: './src/decorators.ts',
//     output: {
//         path: __dirname + '/dist',
//         filename: 'ng1-decorators.js'
//     },
//     resolve: {
//         extensions: ['', '.ts', '.tsx']
//     },
//     devtool: 'source-map', // if we want a source map
//     module: {
//         loaders: [
//             {
//                 test: /\.tsx?$/,
//                 loader: 'webpack-typescript?target=ES5&jsx=react'
//             }
//         ]
//     }
// }

module.exports = {

  // Currently we need to add '.ts' to the resolve.extensions array.
  resolve: {
    extensions: ['', '.ts', '.tsx', '.js', '.jsx']
  },

  // Source maps support ('inline-source-map' also works)
  devtool: 'source-map',

  // Add the loader for .ts files.
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  }
};