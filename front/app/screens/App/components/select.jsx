/**
 * A general purpose dropdown select
**/

import style from "./select.scss";

import React    from "react";
import ReactDOM from "react-dom";
import _        from "lodash";
import cx       from "classnames";

const Select = React.createClass({
	displayName: "Select",
	propTypes: {
		options : React.PropTypes.array.isRequired,
		value   : React.PropTypes.oneOfType([ React.PropTypes.object, React.PropTypes.bool ]).isRequired
	},
	getInitialState: function() {
		return {
			currentlySelected : this.props.value,
			makingSelection   : false
		}
	},
	selectOption: function(option) {
		this.setState({ currentlySelected: option });
	},
	startSelection  : function() { this.setState({ makingSelection: true })},
	endSelection    : function() { this.setState({ makingSelection: false })},
	toggleSelection : function() { this.setState({ makingSelection: !this.state.makingSelection })},
	render: function() {
		let selectionText = this.state.currentlySelected === false ? "Make a selection.." : this.state.currentlySelected.label;
		return <div className={style.selectWrapper}>
			<div className={cx("componentBackdrop", { "hidden": !this.state.makingSelection })} onClick={this.endSelection}></div>
			<div className={cx(style.select)} onClick={this.toggleSelection}>
				<div className={style.selection}>{selectionText}</div>
				<div className={style.selectIcon}>{ this.state.makingSelection ? "\ue901" : "\ue900"}</div>
				<Options
					options           = {this.props.options}
					selectOption      = {this.selectOption}
					currentlySelected = {this.state.currentlySelected}
					makingSelection   = {this.state.makingSelection}
					endSelection      = {this.endSelection}
				/>
			</div>
		</div>
	}
})

// we are breaking out a full options component so that we can scroll to the currently selected option when rendered
const Options = React.createClass({
	displayName: "Options",
	propTypes: {
		options           : React.PropTypes.array.isRequired,
		selectOption      : React.PropTypes.func.isRequired,
		currentlySelected : React.PropTypes.oneOfType([ React.PropTypes.object, React.PropTypes.bool ]).isRequired,
		makingSelection   : React.PropTypes.bool.isRequired,
		endSelection      : React.PropTypes.func.isRequired
	},
	componentDidMount  : function() { this.scrollToSelected() },
	componentDidUpdate : function() { this.scrollToSelected() },
	// scroll the options select to the currently selected option
	scrollToSelected: function() {
		if ( this.props.currentlySelected === false ) return;
		let optionIndex = _.findIndex( this.props.options, option => _.eq( option, this.props.currentlySelected ) );
		let scrollTo = ( optionIndex - 2 ) * 24 + 5;
		ReactDOM.findDOMNode(this).scrollTop = scrollTo;
	},
	onOptionClick: function( option, e ) {
		e.stopPropagation();
		this.props.selectOption(option);
		this.props.endSelection();
	},
	render: function() {
		let selectOptions = _.map( this.props.options, ( option, i ) => {
			let isSelected = _.eq( this.props.currentlySelected, option );
			return <Option
				label         = {option.label}
				value         = {option.value}
				key           = {i}
				isSelected    = {isSelected}
				onOptionClick = {this.onOptionClick.bind( this, option )}
			/>
		});
		return <div className={cx( style.options, { "hidden": !this.props.makingSelection } )}>{selectOptions}</div>
	}
})

const Option = ({ label, value, isSelected, onOptionClick }) => {
	let styles = cx( style.option, { [style.selected]: isSelected } );
	return <div className={styles} onClick={onOptionClick}>{label}</div>
}



export default Select;


