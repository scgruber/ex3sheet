var React = require('react');

var Marks = require('./marks');
var Box = require('./box');

var Boxes = React.createClass({
    render: function () {
        return (<Marks mark={ Box } fill={ this.props.fill } max={ this.props.max } enabled={ this.props.enabled }/>);
}
});

module.exports = Boxes;
