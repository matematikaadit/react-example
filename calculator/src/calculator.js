/**
 * @jsx React.DOM
 */
var Calculator = React.createClass({
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
      boxNode.push(<Box id={i} onBoxChange={this.handleBoxChange} />);
      if (i != data.length - 1) {
        boxNode.push(<span> + </span>);
      } else {
        boxNode.push(<span> = </span>);
      }
    }
    var msg = this.state.ans;
    if (isNaN(msg)) { msg = "" }
    return (
      <div className="calculator">
        {boxNode}
        <Answer ans={msg} />
      </div>
    );
  },
});

var Box = React.createClass({
  handleChange: function(event) {
    var val = parseInt(this.refs.box.getDOMNode().value);
    var id = this.props.id
    this.props.onBoxChange(val, id);
  },
  render: function() {
    return <input type="text" onChange={this.handleChange} ref="box" />;
  },
});

var Answer = React.createClass({
  render: function() {
    return <span>{this.props.ans}</span>;
  },
});

React.renderComponent(
  <Calculator />,
  document.getElementById('content')
);
