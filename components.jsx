var BigPanel = React.createClass({
    propTypes: {
        title: React.PropTypes.string.isRequired,
        id: React.PropTypes.string
    },

    render: function() {
        return (<section className="big-panel" id={ this.props.id }>
            <header><h3>{ this.props.title }</h3></header>
            <div className="big-panel-content">
                { this.props.children }
            </div>
        </section>);
    }
});

var Marks = React.createClass({
    propTypes: {
        openMark: React.PropTypes.node.isRequired,
        fillMark: React.PropTypes.node.isRequired,
        disableMark: React.PropTypes.node,
        fill: React.PropTypes.number.isRequired,
        max: React.PropTypes.number.isRequired,
        enabled: React.PropTypes.number,
    },

    render: function(){
        var output = [];
        var enabled = this.props.enabled || this.props.max;
        for (var i=0; i<enabled; i++) {
            if (i < this.props.fill) {
                output.push(this.props.fillMark);
            } else {
                output.push(this.props.openMark);
            }
        }
        while (output.length < this.props.max) {
            output.push(this.props.disableMark);
        }
        return (<span className="marks">{ output }</span>);
    }
});

var Dot = React.createClass({
    propTypes: {
        filled: React.PropTypes.bool
    },

    render: function () {
        var classes = ['dot', (this.props.filled ? 'filled' : 'open')].join(' ');
        return (<svg width="0.6em" height="1em" viewBox="0.2 0 0.6 1">
            <circle className={ classes } cx="0.5" cy="0.5" r="0.225"></circle>
        </svg>);
    }
});

var Dots = React.createClass({
    render: function () {
        return (<Marks openMark={ <Dot filled={ false }/> } fillMark={ <Dot filled={ true }/> } fill={ this.props.fill } max={ this.props.max }/>);
    }
});

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

var DottedStat = React.createClass({
    propTypes: {
        stat: React.PropTypes.string,
        rating: React.PropTypes.number,
        statClassName: React.PropTypes.string
    },

    render: function() {
        return (<div className="flex-container">
            { this.props.stat ?
                (<div className={ ["stat", "ellipsis-overflow", "flex-1", this.props.statClassName].join(' ') }>{ this.props.stat }</div>)
              : (<div className="stat blank-line flex-1">&nbsp;</div>) }
            <div className="rating"><Dots fill={ this.props.rating } max={ 5 } /></div>
        </div>);
}
});

var BigTable = React.createClass({
    propTypes: {
        columns: React.PropTypes.arrayOf(React.PropTypes.shape({
            title: React.PropTypes.string,
            width: React.PropTypes.number
        })),
        values: React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.node))
    },

    render: function () {
        var self = this;
        return (<div className="big-table">
            <header className="big-table-header flex-container">
                { this.props.columns.map(function(c) {
                    return (<div key={ c.title } className="flex-inline" style={ {flex: c.width} }>{ c.title }</div>);
                }) }
            </header>
            { this.props.values.map(function(v) {
                return (<div key={ v.join() } className="big-table-row flex-container">
                    { v.map(function(c, idx) {
                        var col = self.props.columns[idx];
                        return (<div key={ col.title } className="flex-inline" style={ {flex: col.width} }>{ Array.isArray(c) ? c.join(', ') : c }</div>);
                    }) }
                </div>);
            })}
            <div className="big-table-row flex-container">
                { this.props.columns.map(function(c) {
                    return (<div key={ c.title } className="blank-line flex-inline" style={ {flex: c.width} }>&nbsp;</div>);
                }) }
            </div>
        </div>)
    }
});

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
        while (levels.length < 5) {
            levels.push(this.inactiveLevel);
        }
        return (<div className="health-level flex-container">
            <div className="health-level-penalty flex-1">{ this.props.penalty }</div>
            <div className="health-level-levels">{ levels }</div>
        </div>)
    }
});

var LabeledField = React.createClass({
    propTypes: {
        label: React.PropTypes.string.isRequired,
        value: React.PropTypes.node
    },

    render: function () {
        return (<div className="flex-container">
            <div className="labeled-field-label flex-1">{ this.props.label }</div>
            { this.props.value ?
                (<div className="labeled-field-value flex-2">{ this.props.value }</div>)
                : (<div className="labeled-field-value blank-line flex-2">&nbsp;</div>) }
        </div>)
    }
});

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
        health: React.PropTypes.shape({
            bashing: React.PropTypes.number,
            lethal: React.PropTypes.number,
            aggravated: React.PropTypes.number
        })
    },

    baseLevels: [
        { penalty: -0, levels: 1 },
        { penalty: -1, levels: 2 },
        { penalty: -2, levels: 2 },
        { penalty: -4, levels: 1 },
        { penalty: 'I', levels: 1 }
    ],

    render: function () {
        var self = this;
        var healthLevels = this.baseLevels.map(function(l, i) {
            var levelsBefore = self.baseLevels.slice(0,i).reduce(function(acc,e) { return acc + e.levels; }, 0);
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

var MeritsPanel = React.createClass({
    propTypes: {
        merits: React.PropTypes.objectOf(React.PropTypes.number).isRequired
    },

    sortIntoColumns: function(merits) {
        var height = Math.ceil(merits.length / 3) + 1;
        var columns = [ [], [], [] ];
        for (var i=0; i < merits.length; i++) {
            columns[i%3].push(merits[i]);
        }
        for (var j=0; j < 3; j++) {
            while (columns[j].length < height) {
                columns[j].push(null);
            }
        }
        return columns;
    },

    renderColumn: function(column, idx) {
        return (<div key={ idx } className="flex-1">
            { column.map(function(merit, jdx) {
                if (!merit) merit = [null, 0];
                return (<DottedStat key={ merit[0] + jdx } stat={ merit[0] } rating={ merit[1] } />);
            }) }
        </div>);
    },

    render: function () {
        var self = this;
        var flatMerits = Object.keys(this.props.merits).sort().map(function(m) {
            return [m, self.props.merits[m]]
        });
        var columns = this.sortIntoColumns(flatMerits)
        return (<BigPanel title="Merits" id="merits">
          <div className="flex-container">
            { columns.map(function(column, idx) { return self.renderColumn(column, idx) }) }
          </div>
        </BigPanel>);
    }
});

var ArtifactsPanel = React.createClass({
    propTypes: {
        artifacts: React.PropTypes.objectOf(React.PropTypes.shape({
            rating: React.PropTypes.number,
            description: React.PropTypes.string,
            evocations: React.PropTypes.arrayOf(React.PropTypes.string),
            attune: React.PropTypes.shape({
                motes: React.PropTypes.number,
                type: React.PropTypes.oneOf(['Personal', 'Peripheral'])
            })
        })).isRequired
    },

    convertToRow: function(name, props) {
        var rating = <Dots fill={ props.rating } max={ 5 } />;
        var description = props.description;
        var evocations = (<ul className="evocations">
            { props.evocations.map(function(e) { return <li key={ e }>{ e }</li>; }) }
        </ul>);
        var attune = [props.attune.motes, props.attune.type === 'Personal' ? 'Pers' : 'Periph'].join(' ');
        return [name, rating, description, evocations, attune];
    },

    render: function () {
        var self = this;
        return (<BigPanel title="Artifacts" id="artifacts">
            <BigTable columns={ [ {title: "Name", width: 8}, {title: "Rating", width: 3}, {title: "Description", width: 10},
                                {title: "Evocations", width: 10}, {title: "Attune", width: 3} ] }
                    values={ Object.keys(this.props.artifacts).sort().map(function(a) { return self.convertToRow(a, self.props.artifacts[a]); }) } />
        </BigPanel>);
    }
})

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
            attacks: React.PropTypes.any.isRequired
        })
    },

    render: function() {
        return (<div className="flex-container">
            <section id="stats-left-column">
                <CharacterPanel name        = { character.name }
                                player      = { character.player }
                                type        = { character.type }
                                caste       = { character.caste }
                                concept     = { character.concept }
                                totem       = { character.totem }
                                abilities   = { character.abilities } />
                <EssencePanel   essence     = { character.essence }
                                experience  = { character.experience }
                                artifacts   = { character.artifacts } />
                <WillpowerPanel willpower   = { character.willpower } />
                <LimitBreakPanel    limit   = { character.limit } />
                <ExperiencePanel    experience  = { character.experience } />
                <HealthLevelsPanel  health  = { character.health } />
            </section>
            <section id="stats-right-column">
                <AttributesPanel attributes={ this.props.character.attributes }/>
                <AbilitiesPanel abilities={ this.props.character.abilities }/>
                <SpecialtiesPanel specialties={ this.props.character.specialties }/>
                <MeritsPanel merits={ this.props.character.merits }/>
                <ArtifactsPanel artifacts={ this.props.character.artifacts }/>
                <AttacksPanel attacks={ this.props.character.attacks }/>
            </section>
        </div>);
    }
})