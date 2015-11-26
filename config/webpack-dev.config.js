"use strict";
/**
 * Development variant of webpack with source maps, hot module replacemnent and inline css
*/
const //
	webpack           = require( "webpack" ),
	ExtractTextPlugin = require( "extract-text-webpack-plugin" ),
	path              = require( "path" );


module.exports = {
	entry: {
		app: [
			"webpack-dev-server/client?http://0.0.0.0:3000",
			"webpack/hot/only-dev-server",
			__dirname + "/../front/app/index.jsx"
		]
	},
	output: {
		path       : __dirname + "/../front/build",
		filename   : "bundle.js",
		publicPath : "http://localhost:3000/build"
	},
	resolve: {
		root               : path.resolve(__dirname),
		modulesDirectories : [ "shared", "node_modules" ],
		extensions         : [ "", ".js", ".jsx", ".json" ]
	},
	module: {
		loaders: [
			{
				include : /\.json$/,
				loaders : ["json-loader"]
			},
			{
				test    : /\.jsx$/,
				loaders : [ "react-hot", "babel?cacheDirectory", ],
				exclude : /node_modules/
			},
			{
				test    : /\.js$/,
				loaders : [ "react-hot", "babel?cacheDirectory" ],
				exclude : /node_modules/
			},
			{
				test    : /\.scss$/,
				loaders : [ "react-hot", "style", "css?module&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]", "postcss-loader", "sass" ],
				exclude : /node_modules/
			}
		]
	},
	postcss: [
		require( "autoprefixer" ),
	],
	externals: {},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.DefinePlugin({
      "process.env":{
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      },
      APP_VERSION : JSON.stringify(require('../package.json').version)
    })
	],
	devtool: "eval-cheap-module-source-map",
	cache: true
}