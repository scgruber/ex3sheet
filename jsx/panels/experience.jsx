var React = require('react');

var BigPanel = require('../components/big_panel');
var LittleTable = require('../components/little_table');

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

module.exports = ExperiencePanel;
