var React = require('react');

var BigPanel = require('../components/big_panel');
var BigTable = require('../components/big_table');

var AttacksPanel = React.createClass({
    propTypes: {
        attacks: React.PropTypes.objectOf(React.PropTypes.shape({
            accuracy: React.PropTypes.number,
            witheringDamage: React.PropTypes.number,
            decisiveDamage: React.PropTypes.oneOf(['B','L','A']),
            defense: React.PropTypes.number,
            overwhelming: React.PropTypes.number,
            tags: React.PropTypes.arrayOf(React.PropTypes.string),
            ability: React.PropTypes.string
        })).isRequired
    },

    toSigned: function(num) {
        return num >= 0 ? "+"+num : ""+num;
    },

    convertToRow: function(name, props) {
        var acc = (Array.isArray(props.accuracy) ? props.accuracy : [props.accuracy]).map(this.toSigned).join('/');
        var dmg = [this.toSigned(props.witheringDamage), props.decisiveDamage].join('/');
        var def = props.defense === null ? "\u2014" : this.toSigned(props.defense);
        var ovw = ""+props.overwhelming;
        var tags = props.tags.join(', ');
        var abil = props.ability;
        return [name, acc, dmg, def, ovw, tags, abil];
    },

    render: function () {
        var self = this;
        var attacks = Object.assign({}, this.props.attacks, {
            'Unarmed': {
                accuracy: 4,
                witheringDamage: 7,
                decisiveDamage: 'B',
                defense: 0,
                overwhelming: 1,
                tags: ['Grappling', 'Natural'],
                ability: 'Brawl'
            }
        })
        var unarmed = [ 'Unarmed', 4, 7, 0, 1, ['Bashing', 'Brawl', 'Grappling', 'Natural'], 'Brawl']
        return (<BigPanel title="Attacks" id="attacks">
            <BigTable columns={ [ {title: 'Name', width: 10}, {title: 'Acc', width: 3}, {title: 'Dmg', width: 2},
                                {title: 'Def', width: 2}, {title: 'Ovw', width: 2}, {title: 'Tags', width: 8}, { title: 'Abil', width: 3} ] }
                      values={ Object.keys(attacks).sort().map(function(a) { return self.convertToRow(a, attacks[a]); }) } />
        </BigPanel>);
    }
});

module.exports = AttacksPanel;
