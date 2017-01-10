var React = require('react');

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
                        if (c === null || c === undefined) {
                            return (<div key={ col.title } className="blank-line flex-inline" style={ {flex: col.width} }>&nbsp;</div>)
                        } else {
                            return (<div key={ col.title } className="flex-inline" style={ {flex: col.width} }>{ Array.isArray(c) ? c.join(', ') : c }</div>);
                        }
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

module.exports = BigTable;
