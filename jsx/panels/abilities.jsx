var React = require('react');

var BigPanel = require('../components/big_panel');
var DottedStat = require('../components/dotted_stat');

var AbilitiesPanel = React.createClass({
    propTypes: {
        abilities: React.PropTypes.objectOf(React.PropTypes.shape({
            favored: React.PropTypes.boolean,
            rating: React.PropTypes.number,
            subs: React.PropTypes.objectOf(React.PropTypes.number)
        }))
    },

    render: function() {
        var self = this;
        var normalAbilities = Object.keys(this.props.abilities).filter(function(a) { return !Object.keys(self.props.abilities[a]).includes('subs'); });
        var normalAbilitySets = normalAbilities.reduce(function(acc, e) { if (acc[acc.length-1].length >= normalAbilities.length / 3) {
                acc.push([e]); return acc;
            } else {
                acc[acc.length-1].push(e); return acc;
            } }, [[]])
        var extraAbilityTypes = Object.keys(this.props.abilities).filter(function(a) { return Object.keys(self.props.abilities[a]).includes('subs'); });
        var extraAbilityProps = extraAbilityTypes.map(function(t) {
            var abilityType = self.props.abilities[t];
            return Object.keys(abilityType.subs).map(function(s) {
                var props = {};
                props[t + ": " + s] = { favored: abilityType.favored, rating: abilityType.subs[s].rating };
                return props;
            }).reduce(function(acc, e) { return Object.assign(acc, e); }, {});
        }).reduce(function(acc, e) { return Object.assign(acc, e); }, {});
        var extraAbilities = Object.keys(extraAbilityProps).sort();
        while (extraAbilities.length < normalAbilitySets[0].length) extraAbilities.push(null);
        return (<BigPanel title="Abilities" id="abilities">
            <div className="flex-container">
                { normalAbilitySets.map(function(abilitySet, idx) {
                    return (<div key={ "abilities-"+(idx+1) } className="flex-1">
                        { abilitySet.map(function(ability) {
                            var abilityClass = self.props.abilities[ability].favored ? "ability-favored" : null;
                            return <DottedStat key={ ability } stat={ ability } statClassName={ abilityClass } rating={ self.props.abilities[ability].rating }/>;
                        }) }
                    </div>);
                }) }
                <div className="extra-abilities flex-1">
                    { extraAbilities.map(function(a, idx) {
                        if (a) {
                            return <DottedStat key={ a } stat={ a } rating={ extraAbilityProps[a].rating } />;
                        } else {
                            return <DottedStat key={ "null"+idx } stat={ null } rating={ 0 } />;
                        }
                    }) }
                </div>
            </div>
        </BigPanel>);
    }
});

module.exports = AbilitiesPanel;
