/**
 * @jsx React.DOM
 */
var Calculator = React.createClass({displayName: 'Calculator',
  getInitialState: function() {
    return {data: [NaN, NaN], ans: NaN};
  },
  handleBoxChange: function(val, id) {
    var data = this.state.data;
    data[id] = val;
    var sum = 0;
    for (var i = 0; i < data.length; i++) {
      sum += data[i];
    }
    this.setState({data: data, ans: sum});
  },
  render: function() {
    var boxNode = [];
    var data = this.state.data;
    for (var i = 0; i < data.length; i++) {
      boxNode.push(Box( {id:i, onBoxChange:this.handleBoxChange} ));
      if (i != data.length - 1) {
        boxNode.push(React.DOM.span(null,  " + " ));
      } else {
        boxNode.push(React.DOM.span(null,  " = " ));
      }
    }
    var msg = this.state.ans;
    if (isNaN(msg)) { msg = "" }
    return (
      React.DOM.div( {className:"calculator"}, 
        boxNode,
        Answer( {ans:msg} )
      )
    );
  },
});

var Box = React.createClass({displayName: 'Box',
  handleChange: function(event) {
    var val = parseInt(this.refs.box.getDOMNode().value);
    var id = this.props.id
    this.props.onBoxChange(val, id);
  },
  render: function() {
    return React.DOM.input( {type:"text", onChange:this.handleChange, ref:"box"} );
  },
});

var Answer = React.createClass({displayName: 'Answer',
  render: function() {
    return React.DOM.span(null, this.props.ans);
  },
});

React.renderComponent(
  Calculator(null ),
  document.getElementById('content')
);
