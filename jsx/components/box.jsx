var React = require('react');

var Box = React.createClass({
    propTypes: {
        mode: React.PropTypes.oneOf(['open', 'fill', 'slash', 'cross', 'star', 'light'])
    },

    render: function () {
        var classes = ['box', this.props.mode].join(' ');
        var marks = []
        if (this.props.mode === 'slash') {
            marks = [
                <line className="box-stroke" x1="0.25" y1="0.25" x2="0.75" y2="0.75"></line>
            ];
        } else if (this.props.mode === 'cross') {
            marks = [
                <line className="box-stroke" x1="0.25" y1="0.25" x2="0.75" y2="0.75"></line>,
                <line className="box-stroke" x1="0.25" y1="0.75" x2="0.75" y2="0.25"></line>
            ];
        } else if (this.props.mode === 'star') {
            marks = [
                <line className="box-stroke" x1="0.25" y1="0.25" x2="0.75" y2="0.75"></line>,
                <line className="box-stroke" x1="0.25" y1="0.75" x2="0.75" y2="0.25"></line>,
                <line className="box-stroke" x1="0.5" y1="0.225" x2="0.5" y2="0.775"></line>,
                <line className="box-stroke" x1="0.225" y1="0.5" x2="0.775" y2="0.5"></line>
            ];
        }
        return (<svg width="0.6em" height="1em" viewBox="0.2 0 0.6 1">
            <rect className={ classes } x="0.275" y="0.275" width="0.45" height="0.45"></rect>
            { marks }
        </svg>);
    }
});

module.exports = Box;
