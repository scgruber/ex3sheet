var React = require('react');

var Dot = React.createClass({
    propTypes: {
        mode: React.PropTypes.oneOf(['open', 'filled'])
    },

    render: function () {
        var classes = ['dot', this.props.mode].join(' ');
        return (<svg width="0.6em" height="1em" viewBox="0.2 0 0.6 1">
            <circle className={ classes } cx="0.5" cy="0.5" r="0.225"></circle>
        </svg>);
    }
});

module.exports = Dot;
