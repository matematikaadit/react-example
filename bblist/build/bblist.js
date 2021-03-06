/**
 * @jsx React.DOM
 */

var BBList = React.createClass({displayName: 'BBList',
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
                React.DOM.input( {type:"text",
                    onChange:this.handleOnChange.bind(this, i),
                    key:i,
                    ref:"input" + i} )
            );
            nodes.push(React.DOM.br(null ));
        }
        return (
            React.DOM.div( {className:"bblist"}, 
                React.DOM.div( {className:"input"}, 
                    React.DOM.h3(null, "Input"),
                    nodes
                ),
                React.DOM.h3(null, "Output"),
                React.DOM.textarea( {className:"output",
                    placeholder:"the output will be displayed here",
                    value:this.state.output} )
            )
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
         output = ""
         for (var i = 0; i < list.length; i++) {
             if (list[i]) {
                 output += "[*]" + list[i] + "\n"
             }
         }
         if (output) {
             output = "[LIST]\n" + output + "[/LIST]\n"
         }
         return output;
    },

});

React.renderComponent(
    BBList(null ),
    document.getElementById('content')
);
