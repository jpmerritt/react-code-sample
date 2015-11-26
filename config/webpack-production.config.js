"use strict";
/**
 * Create Production bundles bundle.js, style.css
 * Differences from development:
 * * CSS is pulled out to style.css instead of being inline
 * * react-loader is used instead of react-hot which cuts unneeded libs from bundle.js
 * * No source maps
*/
const //
	webpack           = require( "webpack" ),
	ExtractTextPlugin = require( "extract-text-webpack-plugin" ),
	path              = require( "path" );


module.exports = {
	entry: {
		app: __dirname + "/../front/app/index.jsx",
		vendors: [ "react", "react-dom", "react-router", "react-redux", "history", "lodash", "classnames" ]
	},
	output: {
		path: __dirname + "/../front/build",
		filename: "bundle.js"
	},
	resolve: {
		root: path.resolve(__dirname),
		modulesDirectories: [ "shared", "node_modules" ],
		extensions: [ "", ".js", ".jsx", ".json" ],
		alias: {}
	},
	module: {
		loaders: [
			{
				include: /\.json$/,
				loaders: ["json-loader"] },
			{
				test    : /\.jsx$/,
				loaders : [ "babel?cacheDirectory" ],
				exclude : /node_modules/
			},
			{
				test    : /\.js$/,
				loaders : [ "babel?cacheDirectory" ],
				exclude : /node_modules/
			},
			{
				test    : /\.scss$/,
				loader  : ExtractTextPlugin.extract( "style-loader", "css?module&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!sass" ),
				exclude : /node_modules/
			}
		]
	},
	postcss: [
		require( "autoprefixer" ),
	],
	cache: true,
	externals: {},
	plugins: [
		new ExtractTextPlugin( "style.css", { allChunks: true }),
		new webpack.optimize.OccurenceOrderPlugin(true),
		new webpack.optimize.CommonsChunkPlugin({
			name     : "vendors",
			filename : "vendors.js"
		}),
    new webpack.DefinePlugin({
      "process.env":{
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      },
      APP_VERSION : JSON.stringify(require('../package.json').version)
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: false
      }
    })
	]
}