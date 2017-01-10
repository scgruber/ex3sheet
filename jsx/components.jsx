var React = require('react');

var BigPanel = require('./components/big_panel');
var Marks = require('./components/marks');
var Dots = require('./components/dots');

var Box = React.createClass({
    propTypes: {
        mode: React.PropTypes.oneOf(['open', 'fill', 'slash', 'cross', 'star', 'light'])
    },

    render: function () {
        var classes = ['box', this.props.mode].join(' ');
        var marks = []
        if (this.props.mode === 'slash') {
            marks = [
                <line className="box-stroke" x1="0.25" y1="0.25" x2="0.75" y2="0.75"></line>
            ];
        } else if (this.props.mode === 'cross') {
            marks = [
                <line className="box-stroke" x1="0.25" y1="0.25" x2="0.75" y2="0.75"></line>,
                <line className="box-stroke" x1="0.25" y1="0.75" x2="0.75" y2="0.25"></line>
            ];
        } else if (this.props.mode === 'star') {
            marks = [
                <line className="box-stroke" x1="0.25" y1="0.25" x2="0.75" y2="0.75"></line>,
                <line className="box-stroke" x1="0.25" y1="0.75" x2="0.75" y2="0.25"></line>,
                <line className="box-stroke" x1="0.5" y1="0.225" x2="0.5" y2="0.775"></line>,
                <line className="box-stroke" x1="0.225" y1="0.5" x2="0.775" y2="0.5"></line>
            ];
        }
        return (<svg width="0.6em" height="1em" viewBox="0.2 0 0.6 1">
            <rect className={ classes } x="0.275" y="0.275" width="0.45" height="0.45"></rect>
            { marks }
        </svg>);
    }
})

var Boxes = React.createClass({
    render: function () {
        return (<Marks openMark={ <Box mode="open"/> } fillMark={ <Box mode="cross"/> } disableMark={ <Box mode="light"/> } fill={ this.props.fill } max={ this.props.max } enabled={ this.props.enabled }/>);
}
});

var DottedStat = require('./components/dotted_stat');
var BigTable = require('./components/big_table');

var LittleTable = React.createClass({
    propTypes: {
        columns: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
        values: React.PropTypes.arrayOf(React.PropTypes.node).isRequired
    },

    render: function () {
        return (<div className="little-table">
            <header className="flex-container">
                { this.props.columns.map(function(c) {
                    return (<div className="flex-1">{ c }</div>);
                }) }
            </header>
            <div className="flex-container">
                { this.props.values.map(function(v) {
                    return (<div className="flex-1">{ v }</div>);
                }) }
            </div>
        </div>)
    }
});

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

var ExperiencePanel = React.createClass({
    propTypes: {
        experience: React.PropTypes.shape({
            general: React.PropTypes.shape({
                free: React.PropTypes.number,
                total: React.PropTypes.number
            }),
            solar: React.PropTypes.shape({
                free: React.PropTypes.number,
                total: React.PropTypes.number
            })
        })
    },

    render: function () {
        return (<BigPanel title="Experience" id="experience">
            <LittleTable columns={ ['General', 'Solar'] }
                         values={ [ [this.props.experience.general.free, this.props.experience.general.total].join(' / '),
                                    [this.props.experience.solar.free, this.props.experience.solar.total].join(' / ') ] } />
        </BigPanel>)
}
});

var LimitBreakPanel = React.createClass({
    propTypes: {
        limit: React.PropTypes.shape({
            permanent: React.PropTypes.number.isRequired,
            accumulated: React.PropTypes.number.isRequired,
            trigger: React.PropTypes.string.isRequired
        })
    },

    render: function () {
        return (<BigPanel title="Limit Break" id="limit-break">
            <div id="limit-accumulated">
                <Boxes fill={ this.props.limit.accumulated } max={ 10 } enabled={ 10 - this.props.limit.permanent } />
            </div>
            <div id="limit-trigger">
                { this.props.limit.trigger.length === 0 ? <div className="blank-line"> </div> : <div>{ this.props.limit.trigger }</div> }
            </div>
        </BigPanel>);
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