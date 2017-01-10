var React = require('react');

var LabeledField = React.createClass({
    propTypes: {
        label: React.PropTypes.string.isRequired,
        value: React.PropTypes.node,
        smallValue: React.PropTypes.bool
    },

    render: function () {
        var labelClasses = this.props.smallValue ? "flex-2" : "flex-1";
        var valueClasses = this.props.smallValue ? "flex-1" : "flex-2";
        return (<div className="flex-container">
            <div className={ ["labeled-field-label", labelClasses].join(' ') }>{ this.props.label }</div>
            { this.props.value != null ?
                (<div className={ ["labeled-field-value", valueClasses].join(' ') }>{ this.props.value }</div>)
            : (<div className={ ["labeled-field-value", "blank-line", valueClasses].join(' ') }>&nbsp;</div>) }
        </div>)
    }
});

module.exports = LabeledField;
