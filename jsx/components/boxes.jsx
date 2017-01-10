var React = require('react');

var Marks = require('./marks');
var Box = require('./box');

var Boxes = React.createClass({
    render: function () {
        return (<Marks openMark={ <Box mode="open"/> } fillMark={ <Box mode="cross"/> } disableMark={ <Box mode="light"/> } fill={ this.props.fill } max={ this.props.max } enabled={ this.props.enabled }/>);
}
});

module.exports = Boxes;
