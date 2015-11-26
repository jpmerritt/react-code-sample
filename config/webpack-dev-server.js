"use strict";
/**
 * This server allows us to hot load react.js changes when developing.
 * Should be run through npm commands in package.json.
*/
const
	webpack          = require( "webpack" ),
	WebpackDevServer = require( "webpack-dev-server" ),
	config           = require( "./webpack-dev.config" );

new WebpackDevServer( webpack( config ), {
 	publicPath         : config.output.publicPath,
 	hot                : true,
 	historyApiFallback : true,
 	stats              : { colors: true }
}).listen( 3000, "localhost", function ( err, result ) {
  if ( err ) {
    console.error( err );
  }

  console.info( "Listening at localhost:3000" );
});