/**
 * Bootsrap our react app - defined route structure / redux store
*/


// Require global styles/defaults for use throughout the app
import "./shared/global.scss";

// npm modules
import React                             from "react";
import ReactDOM                          from "react-dom";
import { Router, Route, Link, Redirect } from "react-router";
import createBrowserHistory              from "history/lib/createBrowserHistory"
import { Provider, connect }             from "react-redux";


import App from "./screens/App";

/**
 * Render app route
 * rootInstance / module.hot wrapper are a workaround for webpack hot loading https://github.com/gaearon/react-hot-loader/tree/master/docs#usage-with-external-react
*/
let rootInstance = ReactDOM.render((
	<Router history={createBrowserHistory()}>
		<Route path="/" component={App} />
	</Router>
), document.getElementsByClassName("reactApp")[0] );


if ( module.hot ) {
	require( "react-hot-loader/Injection" ).RootInstanceProvider.injectProvider({
		getRootInstances: function () {
    	// Help React Hot Loader figure out the root component instances on the page:
			return [ rootInstance ];
		}
	});
}