var React = require('react');

var BigPanel = require('../components/big_panel');
var BigTable = require('../components/big_table');
var Dots = require('../components/dots');

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
});

module.exports = ArtifactsPanel;
