var React = require('react');

var BigPanel = require('../components/big_panel');
var Dots = require('../components/dots');
var Boxes = require('../components/boxes');

var WillpowerPanel = React.createClass({
    propTypes: {
        willpower: React.PropTypes.shape({
            channeled: React.PropTypes.number,
            rating: React.PropTypes.number
        })
    },

    render: function () {
        return (<BigPanel title="Willpower" id="willpower">
            <div id="willpower-rating">
                <Dots fill={ this.props.willpower.rating } max={ 10 } />
            </div>
            <div id="willpower-channels">
                <Boxes fill={ this.props.willpower.channeled } max={ 10 } enabled={ this.props.willpower.rating } />
            </div>
        </BigPanel>);
    }
});

module.exports = WillpowerPanel;
