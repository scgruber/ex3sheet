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

var SpecialtiesPanel = React.createClass({
    propTypes: {
        specialties: React.PropTypes.objectOf(React.PropTypes.arrayOf(React.PropTypes.string)).isRequired
    },

    sortIntoColumns: function(specialties) {
        var height = Math.ceil(specialties.length / 4) + 1;
        var columns = [ [], [], [], [] ];
        for (var i=0; i < specialties.length; i++) {
            columns[i%4].push(specialties[i]);
        }
        for (var j=0; j < 4; j++) {
            while (columns[j].length < height) {
                columns[j].push(null);
            }
        }
        return columns;
    },

    renderColumn: function(column, idx) {
        return (<div key={ idx } className="flex-1">
            { column.map(function(specialty) {
                if (specialty === null) {
                    return (<div key="null" className="blank-line">&nbsp;</div>);
                } else {
                    return (<div key={ specialty } className="ellipsis-overflow">{ specialty }</div>);
                }
            }) }
        </div>);
    },

    render: function () {
        var self = this;
        var flatSpecialties = [];
        Object.keys(this.props.specialties).sort().forEach(function(a) {
            flatSpecialties = flatSpecialties.concat(self.props.specialties[a].sort().map(function(s) {
                return a + ": " + s;
            }));
        });
        var columns = this.sortIntoColumns(flatSpecialties)
        return (<BigPanel title="Specialties" id="specialties">
          <div className="flex-container">
            { columns.map(function(column, idx) { return self.renderColumn(column, idx) }) }
          </div>
        </BigPanel>);
    }
});

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