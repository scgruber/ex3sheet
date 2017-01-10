var React = require('react');

var BigPanel = require('../components/big_panel');
var BigTable = require('../components/big_table');

var CharmsPanel = React.createClass({
    propTypes: {
        charms: React.PropTypes.objectOf(React.PropTypes.shape({
            multi: React.PropTypes.number,
            cost: React.PropTypes.shape({
                motes: React.PropTypes.number,
                motesPer: React.PropTypes.number,
                willpower: React.PropTypes.number,
                bashing: React.PropTypes.number,
                lethal: React.PropTypes.number,
                aggravated: React.PropTypes.number,
                anima: React.PropTypes.number,
                initiative: React.PropTypes.number,
                initiativePer: React.PropTypes.number,
                experience: React.PropTypes.number,
                silverExperience: React.PropTypes.number,
                goldExperience: React.PropTypes.number,
                whiteExperience: React.PropTypes.number
            }),
            type: React.PropTypes.string,
            duration: React.PropTypes.string,
            effects: React.PropTypes.string,
            source: React.PropTypes.string
        }))
    },

    convertToRow: function(name, props) {
        var name = props.multi ? [name, "(x" + props.multi + ")"].join(' ') : name;
        var source = props.source;
        var costMap = [
            ['motes', 'm'], ['motesPer', 'm per'], ['willpower', 'wp'], ['bashing', 'hl'], ['lethal', 'lhl'], ['aggravated', 'ahl'],
            ['anima', 'a'], ['initiative', 'i'], ['initiativePer', 'i per'], ['experience', 'xp'], ['silverExperience', 'sxp'],
            ['goldExperience', 'gxp'], ['whiteExperience', 'wxp']
        ];
        if (props.cost) {
            if (Object.keys(props.cost).length === 0) {
                var cost = "\u2014";
            } else {
                var cost = costMap.map(function(c) {
                    return props.cost[c[0]] ? [props.cost[c[0]], c[1]].join('') : null;
                }).filter(function(c) { return c; }).join(', ');
            }
        } else {
            var cost = null;
        }
        var type = {
            "Simple": "Simp",
            "Supplemental": "Sup",
            "Reflexive": "Ref",
            "Permanent": "Perm"
        }[props.type];
        var duration = props.duration;
        var effects = props.effects;
        return [name, cost, type, duration, effects, source];
    },

    render: function () {
        var self = this;
        return (<BigPanel title="Charms" id="charms">
            <BigTable columns={ [ {title: "Name", width: 6}, {title: "Cost", width: 2}, {title: "Type", width: 1}, {title: "Duration", width: 2},
                        {title: "Effects", width: 15}, {title: "Source", width: 2} ] }
                    values={ Object.keys(this.props.charms).sort().map(function(c) { return self.convertToRow(c, self.props.charms[c]); }) } />
        </BigPanel>);
    }
});

module.exports = CharmsPanel;
