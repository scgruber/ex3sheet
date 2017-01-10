var React = require('react');

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

module.exports = BigPanel;
