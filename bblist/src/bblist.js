/**
 * @jsx React.DOM
 */

var BBList = React.createClass({
    /* Main Component, our BBList app that will be mounted as the root of
     * the main application. Host the input and output.
     */

    render: function() {
        /* Just render the input and output, also give a handle change in
         * input and reflect it in the output.
         */
        var nodes = [];
        for (var i = 0; i < 3; i++) {
            nodes.push(
                <input type="text"
                    onChange={this.handleOnChange.bind(this, i)}
                    key={i}
                    ref={"input" + i} />
            );
            nodes.push(<br />);
        }
        return (
            <div className="bblist">
                <div className="input">
                    <h3>Input</h3>
                    {nodes}
                </div>
                <h3>Output</h3>
                <textarea className="output"
                    placeholder="output akan keluar di sini"
                    value={this.state.output} />
            </div>
        );
    },

    getInitialState: function() {
        /* Initial state of the app. Output is empty. list is also empty.
        */
        return {output: '', list: []};
    },

    handleOnChange: function(i) {
        /* Handle input changing, then update the output state
        */
        var value = this.refs["input"+i].getDOMNode().value.trim();
        var list = this.state.list;
        list[i] = value;
        output = this.convertToBBList(list);
        this.setState({output: output, list: list});
    },

    convertToBBList: function(list) {
        /* A Converter from js Array to a BBList code
         */
         output = "[LIST]\n"
         for (var i = 0; i < list.length; i++) {
             var item = "";
             if (list[i]) { item = list[i] }
             output += "[*]" + item + "\n"
         }
         output += "[/LIST]\n"
         return output;
    },

});

React.renderComponent(
    <BBList />,
    document.getElementById('content')
);
