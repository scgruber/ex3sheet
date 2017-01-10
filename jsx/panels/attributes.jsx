var React = require('react');

var BigPanel = require('../components/big_panel');
var DottedStat = require('../components/dotted_stat');

var AttributesPanel = React.createClass({
    propTypes: {
        attributes: React.PropTypes.shape({
            'Strength': React.PropTypes.number.isRequired,
            'Dexterity': React.PropTypes.number.isRequired,
            'Stamina': React.PropTypes.number.isRequired,
            'Charisma': React.PropTypes.number.isRequired,
            'Manipulation': React.PropTypes.number.isRequired,
            'Appearance': React.PropTypes.number.isRequired,
            'Perception': React.PropTypes.number.isRequired,
            'Intelligence': React.PropTypes.number.isRequired,
            'Wits': React.PropTypes.number.isRequired,
        }).isRequired
    },

    render: function() {
        var self = this;
        var columns = [
            ['Strength', 'Dexterity', 'Stamina'],
            ['Charisma', 'Manipulation', 'Appearance'],
            ['Perception', 'Intelligence', 'Wits']
        ];
        return (<BigPanel title="Attributes" id="attributes">
            <div className="flex-container">
                { columns.map(function(col) {
                    return (<div key={ col.join() } className="flex-1">
                        { col.map(function(attr) {
                            return (<DottedStat key={ attr } stat={ attr } rating={ self.props.attributes[attr] }/>);
                        }) }
                    </div>);
                }) }
            </div>
        </BigPanel>)
    }
});

module.exports = AttributesPanel;
