var React = require('react');

var Marks = React.createClass({
    propTypes: {
        mark: React.PropTypes.element.isRequired,
        fill: React.PropTypes.number.isRequired,
        max: React.PropTypes.number.isRequired,
        enabled: React.PropTypes.number,
    },

    render: function(){
        var marks = [];
        var enabled = this.props.enabled || this.props.max;
        for (var i=0; i<enabled; i++) {
            if (i < this.props.fill) {
                marks.push('filled');
            } else {
                marks.push('open');
            }
        }
        while (marks.length < this.props.max) {
            marks.push('light');
        }
        return (<span className="marks">
          { marks.map((t,i) => <this.props.mark key={ i } mode={ t }/>) }
        </span>);
    }
});

module.exports = Marks;
