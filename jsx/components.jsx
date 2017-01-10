var React = require('react');

var BigPanel = require('./components/big_panel');
var Marks = require('./components/marks');
var Dots = require('./components/dots');
var Box = require('./components/box');
var Boxes = require('./components/boxes');
var DottedStat = require('./components/dotted_stat');
var BigTable = require('./components/big_table');
var LittleTable = require('./components/little_table');
var LabeledField = require('./components/labeled_field');

var CharacterPanel = React.createClass({
    propTypes: {
        name: React.PropTypes.string,
        player: React.PropTypes.string,
        type: React.PropTypes.oneOf([
            'Solar Exalted',
        ]),
        caste: React.PropTypes.oneOf([ 'Dawn', 'Zenith', 'Twilight', 'Night', 'Eclipse' ]),
        concept: React.PropTypes.string,
        totem: React.PropTypes.string,
        abilities: React.PropTypes.objectOf(React.PropTypes.shape({
            supernal: React.PropTypes.boolean
        }))
    },

    supernal: function () {
        var self = this;
        return Object.keys(this.props.abilities).find(function(a) { return self.props.abilities[a].supernal === true; });
    },

    render: function () {
        return (<div>
            <header id="name"><h1>{ this.props.name }</h1></header>
            <LabeledField label="Player" value={ this.props.player } />
            <div id="portrait" />
            <LabeledField label="Type" value={ this.props.type } />
            <LabeledField label="Caste" value={ this.props.caste } />
            <LabeledField label="Concept" value={ this.props.concept } />
            <LabeledField label="Totem" value={ this.props.totem } />
            <LabeledField label="Supernal" value={ this.supernal() } />
        </div>);
    }
});

var EssencePanel = React.createClass({
    propTypes: {
        essence: React.PropTypes.shape({
            personal: React.PropTypes.shape({
                free: React.PropTypes.number
            }),
            peripheral: React.PropTypes.shape({
                free: React.PropTypes.number
            })
        }),
        experience: React.PropTypes.shape({
            general: React.PropTypes.shape({
                total: React.PropTypes.number
            })
        }),
        artifacts: React.PropTypes.objectOf(React.PropTypes.shape({
            attune: React.PropTypes.shape({
                motes: React.PropTypes.number,
                type: React.PropTypes.oneOf(['Personal', 'Peripheral'])
            })
        }))
    },

    committed: function(type) {
        var self = this;
        return Object.keys(this.props.artifacts).filter(function(a) { return self.props.artifacts[a].attune.type === type; })
            .map(function(a) { return self.props.artifacts[a].attune.motes; }).reduce(function(acc, e) { return acc+e; }, 0);
    },

    poolBreakdown: function(pool, props, committed) {
        return props.free + ' / ' + (pool - committed) + ' [' + committed + ']';
    },

    render: function () {
        var self = this;
        var essenceThresholds = [0, 50, 125, 200, 300];
        var essence = essenceThresholds.findIndex(function(t) { return self.props.experience.general.total < t; });
        if (essence == -1) essence = 5;

        var personalPool = essence*3 + 10;
        var peripheralPool = essence*7 + 26;

        return (<BigPanel title="Essence" id="essence">
            <div id="essence-rating">
                <Dots fill={ essence } max={ 5 }/>
            </div>
            <LittleTable columns={ ['Personal', 'Peripheral'] }
                         values={ [ this.poolBreakdown(personalPool, this.props.essence.personal, this.committed('Personal')),
                                    this.poolBreakdown(peripheralPool, this.props.essence.peripheral, this.committed('Peripheral')) ]} />
        </BigPanel>);
    }
});

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

        var Stats = React.createClass({
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
        return (<div className="flex-container">
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
        </div>);
    }
});

module.exports.Stats = Stats;