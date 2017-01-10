var React = require('react');

var Marks = React.createClass({
    propTypes: {
        openMark: React.PropTypes.node.isRequired,
        fillMark: React.PropTypes.node.isRequired,
        disableMark: React.PropTypes.node,
        fill: React.PropTypes.number.isRequired,
        max: React.PropTypes.number.isRequired,
        enabled: React.PropTypes.number,
    },

    render: function(){
        var output = [];
        var enabled = this.props.enabled || this.props.max;
        for (var i=0; i<enabled; i++) {
            if (i < this.props.fill) {
                output.push(this.props.fillMark);
            } else {
                output.push(this.props.openMark);
            }
        }
        while (output.length < this.props.max) {
            output.push(this.props.disableMark);
        }
        return (<span className="marks">{ output }</span>);
    }
});

module.exports = Marks;
