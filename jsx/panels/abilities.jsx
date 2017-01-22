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

    ABILITIES: [
      ['Archery', 'Athletics', 'Awareness', 'Brawl', 'Bureaucracy', 'Dodge', 'Integrity', 'Investigation'],
      ['Larceny', 'Linguistics', 'Lore', 'Medicine', 'Melee', 'Occult', 'Performance', 'Presence'],
      ['Resistance', 'Ride', 'Sail', 'Socialize', 'Stealth', 'Survival', 'Thrown', 'War'],
      ['Craft', 'Martial Arts'],
    ],

    renderNormalAbilityColumn: function(abilitySet) {
      var self = this;
      return (<div key={ abilitySet.join('-') } className="flex-1">
        { abilitySet.map(function(ability) {
          var favoredClass = self.props.abilities[ability].favored ? "ability-favored" : null;
          var rating = self.props.abilities[ability].rating
          return <DottedStat  key={ ability }
                              stat={ ability }
                              statClassName={ favoredClass }
                              rating={ rating }/>;
        }) }
      </div>);
    },

    renderExtendedAbilityColumn: function(abilities) {
      var self = this;
      var extendedAbilities = [];
      abilities.forEach(function(ability) {
        Object.keys(self.props.abilities[ability].subs).forEach(function(subAbility) {
          extendedAbilities.push({
            name: ability + ": " + subAbility,
            rating: self.props.abilities[ability].subs[subAbility],
            favored: self.props.abilities[ability].favored,
          });
        });
      });
      while (extendedAbilities.length < this.ABILITIES[0].length) extendedAbilities.push(null);
      return (<div className="flex-1">
        { extendedAbilities.map(function(a, idx) {
          if (a) {
            var favoredClass = a.favored ? "ability-favored" : null;
            return <DottedStat  key={ a.name }
                                stat={ a.name }
                                statClassName={ favoredClass }
                                rating={ a.rating } />;
          } else {
            return <DottedStat  key={ "null"+idx }
                                stat={ null }
                                rating={ 0 } />;
          }
        }) }
      </div>);
    },

    render: function() {
        return (<BigPanel title="Abilities" id="abilities">
            <div className="flex-container">
                { this.ABILITIES.slice(0,3).map((abilitySet) => this.renderNormalAbilityColumn(abilitySet)) }
                { this.renderExtendedAbilityColumn(this.ABILITIES[3]) }
            </div>
        </BigPanel>);
    }
});

module.exports = AbilitiesPanel;
