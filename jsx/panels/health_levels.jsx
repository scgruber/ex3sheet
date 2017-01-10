var React = require('react');

var BigPanel = require('../components/big_panel');
var Box = require('../components/box');

var HealthLevel = React.createClass({
    propTypes: {
        penalty: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.oneOf(['I'])]).isRequired,
        levels: React.PropTypes.number.isRequired,
        bashing: React.PropTypes.number.isRequired,
        lethal: React.PropTypes.number.isRequired,
        aggravated: React.PropTypes.number.isRequired
    },

    openLevel: <Box mode="open"/>,
    bashingLevel: <Box mode="slash"/>,
    lethalLevel: <Box mode="cross"/>,
    aggravatedLevel: <Box mode="star"/>,
    inactiveLevel: <Box mode="light" />,

    render: function () {
        var levels = [];
        for (var i=0; i<this.props.levels; i++) {
            if ((i % 5 == 0) && i != 0) {
                levels.push(<br/>);
            }
            if (i < this.props.aggravated) {
                levels.push(this.aggravatedLevel);
            } else if (i < (this.props.aggravated + this.props.lethal)) {
                levels.push(this.lethalLevel);
            } else if (i < (this.props.aggravated + this.props.lethal + this.props.bashing)) {
                levels.push(this.bashingLevel);
            } else {
                levels.push(this.openLevel);
            }
        }
        for (var i=0; i<(5-(this.props.levels%5)); i++) {
            levels.push(this.inactiveLevel);
        }
        return (<div className="health-level flex-container">
            <div className="health-level-penalty flex-1">{ this.props.penalty }</div>
            <div className="health-level-levels">{ levels }</div>
        </div>)
    }
});

var HealthLevelsPanel = React.createClass({
    propTypes: {
        attributes: React.PropTypes.shape({
            'Stamina': React.PropTypes.number
        }),
        health: React.PropTypes.shape({
            bashing: React.PropTypes.number,
            lethal: React.PropTypes.number,
            aggravated: React.PropTypes.number
        }),
        charms: React.PropTypes.objectOf(React.PropTypes.shape({
            multi: React.PropTypes.number
        }))
    },

    baseLevels: [
        { penalty: -0, levels: 1 },
        { penalty: -1, levels: 2 },
        { penalty: -2, levels: 2 },
        { penalty: -4, levels: 1 },
        { penalty: 'I', levels: 1 }
    ],

    totalLevels: function() {
        var self = this;
        if (this.props.attributes['Stamina'] <= 2) {
            var oxBodyLevels = [
                { penalty: -1, levels: 1 },
                { penalty: -2, levels: 1 },
            ];
        } else if (this.props.attributes['Stamina'] <= 4) {
            var oxBodyLevels = [
                { penalty: -1, levels: 1 },
                { penalty: -2, levels: 2 },
            ];
        } else {
            var oxBodyLevels = [
                { penalty: -0, levels: 1 },
                { penalty: -1, levels: 1 },
                { penalty: -2, levels: 1 },
            ];
        }
        return this.baseLevels.map(function(l) {
            var oxBodyLevel = oxBodyLevels.find(function(obl) { return obl.penalty === l.penalty; });
            var bonusLevels = self.props.charms['Ox-Body Technique'] ? ((self.props.charms['Ox-Body Technique'].multi || 1) * (oxBodyLevel || { levels: 0 }).levels) : 0;
            return { penalty: l.penalty, levels: l.levels + bonusLevels };
        });
    },

    render: function () {
        var self = this;
        var totalLevels = this.totalLevels();
        var healthLevels = totalLevels.map(function(l, i) {
            var levelsBefore = totalLevels.slice(0,i).reduce(function(acc,e) { return acc + e.levels; }, 0);
            var aggravated = Math.min(Math.max(0, self.props.health.aggravated - levelsBefore), l.levels);
            var lethal = Math.min(Math.min(Math.max(0, (self.props.health.aggravated + self.props.health.lethal) - levelsBefore), self.props.health.lethal), l.levels - aggravated);
            var bashing = Math.min(Math.min(Math.max(0, (self.props.health.aggravated + self.props.health.lethal + self.props.health.bashing) - levelsBefore), self.props.health.bashing), l.levels - aggravated - lethal);;
            return { penalty: l.penalty, levels: l.levels, bashing: bashing, lethal: lethal, aggravated: aggravated };
        });
        return (<BigPanel title="Health Levels" id="health-levels">
            { healthLevels.map(function(l) {
                return (<HealthLevel key={ l.penalty } penalty={ l.penalty } levels={ l.levels } bashing={ l.bashing } lethal={ l.lethal } aggravated={ l.aggravated }/>);
            }) }
        </BigPanel>);
    }
});

module.exports = HealthLevelsPanel;
