var React = require('react');

var Marks = require('./marks')
var Dot = require('./dot')

var Dots = React.createClass({
    render: function () {
        return (<Marks openMark={ <Dot mode="open"/> } fillMark={ <Dot mode="filled"/> } fill={ this.props.fill } max={ this.props.max }/>);
    }
});

module.exports = Dots;
