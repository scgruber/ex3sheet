var React = require('react');

var Dots = require('./dots');

var DottedStat = React.createClass({
    propTypes: {
        stat: React.PropTypes.string,
        rating: React.PropTypes.number,
        max: React.PropTypes.number,
        statClassName: React.PropTypes.string
    },

    render: function() {
        return (<div className="flex-container">
            { this.props.stat ?
                (<div className={ ["stat", "ellipsis-overflow", "flex-1", this.props.statClassName].join(' ') }>{ this.props.stat }</div>)
              : (<div className="stat blank-line flex-1">&nbsp;</div>) }
            <div className="rating"><Dots fill={ this.props.rating } max={ this.props.max || 5 } /></div>
        </div>);
}
});

module.exports = DottedStat;
