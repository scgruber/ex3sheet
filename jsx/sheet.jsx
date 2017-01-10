var React = require('react');

var CharacterPanel = require('./panels/character');
var EssencePanel = require('./panels/essence');
var WillpowerPanel = require('./panels/willpower');
var ExperiencePanel = require('./panels/experience');
var LimitBreakPanel = require('./panels/limit_break');
var HealthLevelsPanel = require('./panels/health_levels');
var AttributesPanel = require('./panels/attributes');
var AbilitiesPanel = require('./panels/abilities');
var SpecialtiesPanel = require('./panels/specialties');
var MeritsPanel = require('./panels/merits');
var ArtifactsPanel = require('./panels/artifacts');
var AttacksPanel = require('./panels/attacks');
var DefensesPanel = require('./panels/defenses');
var IntimaciesPanel = require('./panels/intimacies');
var CharmsPanel = require('./panels/charms');

var Sheet = React.createClass({
    propTypes: {
        character: React.PropTypes.shape({
            name: React.PropTypes.any.isRequired,
            player: React.PropTypes.any.isRequired,
            type: React.PropTypes.any.isRequired,
            caste: React.PropTypes.any.isRequired,
            concept: React.PropTypes.any.isRequired,
            totem: React.PropTypes.any.isRequired,
            essence: React.PropTypes.any.isRequired,
            willpower: React.PropTypes.any.isRequired,
            limit: React.PropTypes.any.isRequired,
            experience: React.PropTypes.any.isRequired,
            health: React.PropTypes.any.isRequired,
            attributes: React.PropTypes.any.isRequired,
            abilities: React.PropTypes.any.isRequired,
            specialties: React.PropTypes.any.isRequired,
            merits: React.PropTypes.any.isRequired,
            artifacts: React.PropTypes.any.isRequired,
            attacks: React.PropTypes.any.isRequired,
            charms: React.PropTypes.any.isRequired,
        })
    },

    render: function() {
        return (<div>
            <div id="stats" className="flex-container">
                <section id="stats-left-column">
                    <CharacterPanel name        = { this.props.character.name }
                                    player      = { this.props.character.player }
                                    type        = { this.props.character.type }
                                    caste       = { this.props.character.caste }
                                    concept     = { this.props.character.concept }
                                    totem       = { this.props.character.totem }
                                    abilities   = { this.props.character.abilities } />
                    <EssencePanel   essence     = { this.props.character.essence }
                                    experience  = { this.props.character.experience }
                                    artifacts   = { this.props.character.artifacts } />
                    <WillpowerPanel willpower   = { this.props.character.willpower } />
                    <LimitBreakPanel    limit   = { this.props.character.limit } />
                    <ExperiencePanel    experience  = { this.props.character.experience } />
                    <HealthLevelsPanel  attributes  = { this.props.character.attributes }
                                        health      = { this.props.character.health }
                                        charms      = { this.props.character.charms } />
                </section>
                <section id="stats-right-column">
                    <AttributesPanel attributes={ this.props.character.attributes }/>
                    <AbilitiesPanel abilities={ this.props.character.abilities }/>
                    <SpecialtiesPanel specialties={ this.props.character.specialties }/>
                    <MeritsPanel merits={ this.props.character.merits }/>
                    <ArtifactsPanel artifacts={ this.props.character.artifacts }/>
                    <AttacksPanel attacks={ this.props.character.attacks }/>
                    <DefensesPanel  attributes  = { this.props.character.attributes }
                                    abilities   = { this.props.character.abilities }
                                    armor       = { this.props.character.armor }
                                    attacks     = { this.props.character.attacks } />
                </section>
            </div>
            <IntimaciesPanel intimacies={ this.props.character.intimacies }/>
            <CharmsPanel charms={ this.props.character.charms }/>
        </div>);
    }
});

module.exports = Sheet;
