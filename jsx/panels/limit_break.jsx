var React = require('react');

var BigPanel = require('../components/big_panel');
var Boxes = require('../components/boxes');

var LimitBreakPanel = React.createClass({
    propTypes: {
        limit: React.PropTypes.shape({
            permanent: React.PropTypes.number.isRequired,
            accumulated: React.PropTypes.number.isRequired,
            trigger: React.PropTypes.string.isRequired
        })
    },

    render: function () {
        return (<BigPanel title="Limit Break" id="limit-break">
            <div id="limit-accumulated">
                <Boxes fill={ this.props.limit.accumulated } max={ 10 } enabled={ 10 - this.props.limit.permanent } />
            </div>
            <div id="limit-trigger">
                { this.props.limit.trigger.length === 0 ? <div className="blank-line"> </div> : <div>{ this.props.limit.trigger }</div> }
            </div>
        </BigPanel>);
    }
});

module.exports = LimitBreakPanel;
