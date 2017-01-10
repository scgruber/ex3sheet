var React = require('react');

var BigPanel = require('../components/big_panel');
var BigTable = require('../components/big_table');
var LabeledField = require('../components/labeled_field');

var DefensesPanel = React.createClass({
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
        }).isRequired,
        abilities: React.PropTypes.objectOf(React.PropTypes.shape({
            rating: React.PropTypes.number,
            subs: React.PropTypes.objectOf(React.PropTypes.number)
        })).isRequired,
        armor: React.PropTypes.objectOf(React.PropTypes.shape({
            soak: React.PropTypes.number,
            hardness: React.PropTypes.number,
            mobility: React.PropTypes.number,
            tags: React.PropTypes.arrayOf(React.PropTypes.string)
        })),
        attacks: React.PropTypes.objectOf(React.PropTypes.shape({
            defense: React.PropTypes.number,
            ability: React.PropTypes.string
        })).isRequired
    },

    convertToRow: function(name, props) {
        return [name, props.soak, props.hardness, props.mobility, props.tags.join(', ')];
    },

    parry: function(ability) {
        var dex = this.props.attributes['Dexterity'];
        if (this.props.abilities[ability].subs) {
            var ab = Object.keys(this.props.abilities[ability].subs).map(function(a) { return this.props.abilities[ability].subs[a]; }).reduce(Math.max, 0);
        } else {
            var ab = this.props.abilities[ability].rating;
        }
        var def = 0;
        return Math.ceil((dex + ab)/2) + def;
    },

    evasion: function() {
        var self = this;
        var dex = this.props.attributes['Dexterity'];
        var dodge = this.props.abilities['Dodge'].rating;
        var mobility = Object.keys(this.props.armor).map(function(a) { return self.props.armor[a].mobility; }).reduce(function(acc, e) { return acc + e; }, 0);
        return Math.ceil((dex + dodge)/2) + mobility;
    },

    resolve: function() {
        var wits = this.props.attributes['Wits'];
        var integrity = this.props.abilities['Integrity'].rating;
        return Math.ceil((wits + integrity)/2);
    },

    guile: function() {
        var manip = this.props.attributes['Manipulation'];
        var socialize = this.props.abilities['Socialize'].rating;
        return Math.ceil((manip + socialize)/2);
    },

    joinBattle: function() {
        var wits = this.props.attributes['Wits'];
        var awareness = this.props.abilities['Awareness'].rating;
        return wits + awareness;
    },

    rush: function() {
        var dex = this.props.attributes['Dexterity'];
        var athletics = this.props.abilities['Athletics'].rating;
        return dex + athletics;
    },

    disengage: function() {
        var dex = this.props.attributes['Dexterity'];
        var dodge = this.props.abilities['Dodge'].rating;
        return dex + dodge;
    },

    render: function () {
        var self = this;
        var totalArmorSoak = Object.keys(this.props.armor).map(function(a) { return self.props.armor[a].soak; }).reduce(function(acc, e) { return acc + e; }, 0);
        return (<BigPanel title="Defenses" id="defenses">
            <div className="flex-container">
                <div className="flex-2">
                    <BigTable columns={ [ {title: "Armor", width: 5}, {title: "Soak", width: 1}, {title: "Hard", width: 1},
                                        {title: "Mob", width: 1}, {title: "Tags", width: 4} ] }
                            values={ Object.keys(this.props.armor).sort().map(function(a) { return self.convertToRow(a, self.props.armor[a]); }) }/>
                    <div id="soak" className="flex-container">
                        <div className="flex-1">
                            <LabeledField label="Natural Soak" value={ this.props.attributes['Stamina'] } smallValue={ true }/>
                        </div>
                        <div className="flex-1">
                            <LabeledField label="Total Soak" value={ this.props.attributes['Stamina'] + totalArmorSoak } smallValue={ true }/>
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="flex-container">
                        <div className="flex-1">
                            <LabeledField label="Parry" value={ Math.max(this.parry('Brawl'), this.parry('Martial Arts'), this.parry('Melee')) } smallValue={ true }/>
                            <LabeledField label="Evasion" value={ this.evasion() } smallValue={ true }/>
                            <LabeledField label="Rush" value={ this.rush() } smallValue={ true }/>
                        </div>
                        <div className="flex-1">
                            <LabeledField label="Resolve" value={ this.resolve() } smallValue={ true }/>
                            <LabeledField label="Guile" value={ this.guile() } smallValue={ true }/>
                            <LabeledField label="Disengage" value={ this.disengage() } smallValue={ true }/>
                        </div>
                    </div>
                    <div id="join-battle">
                        <LabeledField label="Join Battle" value={ this.joinBattle() } smallValue={ true }/>
                    </div>
                </div>
            </div>
        </BigPanel>);
    }
});

module.exports = DefensesPanel;
