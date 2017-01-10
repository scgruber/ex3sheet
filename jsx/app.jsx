var React = require('react');
var ReactDOM = require('react-dom');

var Sheet = require('./sheet');

var character = JSON.parse(document.getElementById('character-data').innerHTML);
ReactDOM.render(<Sheet character={ character }/>, document.getElementById('sheet'));
