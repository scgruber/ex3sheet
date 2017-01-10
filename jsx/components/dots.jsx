var React = require('react');

var Marks = require('./marks')
var Dot = require('./dot')

var Dots = React.createClass({
    render: function () {
        return (<Marks openMark={ <Dot filled={ false }/> } fillMark={ <Dot filled={ true }/> } fill={ this.props.fill } max={ this.props.max }/>);
    }
});

module.exports = Dots;
