var React = require('react');

var BigPanel = require('../components/big_panel');

var IntimaciesPanel = React.createClass({
    propTypes: {
        intimacies: React.PropTypes.objectOf(React.PropTypes.oneOf(['Defining', 'Major', 'Minor']))
    },

    compareIntimacies: function(a, b) {
        var intensity = this.props.intimacies[a].localeCompare(this.props.intimacies[b]);
        if (intensity != 0) {
            return intensity;
        } else {
            return a.localeCompare(b);
        }
    },

    splitInTwo: function(list) {
        var left = [];
        var right = [];
        while (list.length > 0) {
            left.push(list.shift());
            if (list.length == 0) break;
            right.push(list.shift());
        }
        return [left, right];
    },

    render: function() {
        var self = this;
        return (<BigPanel title="Intimacies" id="intimacies">
            <div className="flex-container">
                { this.splitInTwo(Object.keys(this.props.intimacies).sort(self.compareIntimacies)).map(function(l, i) {
                    return (<div key={ i } className="flex-1">
                        { l.map(function(i) {
                            return (<div key={ i } className="flex-container">
                                <div className="flex-5 ellipsis-overflow">{ i }</div>
                                <div className="flex-1">{ self.props.intimacies[i] }</div>
                            </div>);
                        }) }
                        { Array(Math.ceil(Object.keys(self.props.intimacies).length/2) + 1 - l.length).fill(1).map(function(x,i) {
                            return (<div key={ i } className="flex-container">
                                <div className="flex-5 blank-line">&nbsp;</div>
                                <div className="flex-1 blank-line">&nbsp;</div>
                            </div>);
                        }) }
                    </div>);
                }) }
            </div>
        </BigPanel>)
    }
});

module.exports = IntimaciesPanel;
