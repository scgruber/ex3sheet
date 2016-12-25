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

var Dots = React.createClass({
    propTypes: {
        fill: React.PropTypes.number.isRequired,
        max: React.PropTypes.number.isRequired,
    },

    render: function(){
        var openDot = "\u26AA";
        var fillDot = "\u26AB";
        var output = "";
        for (var i=0; i<this.props.max; i++) {
            if (i < this.props.fill) {
                output += fillDot;
            } else {
                output += openDot;
            }
        }
        return (<span className="dots">{ output }</span>);
    }
});

var DottedStat = React.createClass({
    propTypes: {
        stat: React.PropTypes.string,
        rating: React.PropTypes.number
    },

    render: function() {
        return (<div className="flex-container">
            { this.props.stat ?
                (<div className="stat ellipsis-overflow flex-1">{ this.props.stat }</div>)
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
                            return <DottedStat key={ ability } stat={ ability } rating={ self.props.abilities[ability].rating }/>;
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
            attributes: React.PropTypes.any.isRequired,
            abilities: React.PropTypes.any.isRequired,
            specialties: React.PropTypes.any.isRequired,
            merits: React.PropTypes.any.isRequired,
            attacks: React.PropTypes.any.isRequired
        })
    },

    render: function() {
        return (<div>
            <AttributesPanel attributes={ this.props.character.attributes }/>
            <AbilitiesPanel abilities={ this.props.character.abilities }/>
            <SpecialtiesPanel specialties={ this.props.character.specialties }/>
            <MeritsPanel merits={ this.props.character.merits }/>
            <AttacksPanel attacks={ this.props.character.attacks }/>
        </div>);
    }
})