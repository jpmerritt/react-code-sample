"use strict";
/**
 * Bootstrap the app webserver using babel.js to enable es6
*/
require("babel-core/register")({
  ignore: ["node_modules"]
});
require( "./server/server.js" );