var React = require('react');
var ReactDOM = require('react-dom');
var components = require('./components');
var Stats = components.Stats;
var IntimaciesPanel = require('./panels/intimacies');
var CharmsPanel = components.CharmsPanel;

var character = JSON.parse(document.getElementById('character-data').innerHTML);
ReactDOM.render(<Stats character={ character }/>, document.getElementById('stats'));
ReactDOM.render(<IntimaciesPanel intimacies={ character.intimacies }/>, document.getElementById('intimacies'));
ReactDOM.render(<CharmsPanel charms={ character.charms }/>, document.getElementById('charms'));
