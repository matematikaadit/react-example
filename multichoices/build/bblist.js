/**
 * @jsx React.DOM
 */

var BBList = React.createClass({displayName: 'BBList',
    /* BBList gives a list of input and process it to be a BBList output
     */

    render: function() {
        /* Just render the input, also give a onChange callback to the input
         * when it's changed by user.
         */
        var nodes = [];
        for (var i = 0; i < 3; i++) {
            nodes.push(
                React.DOM.li(null, 
                    React.DOM.input( {type:"text",
                        onChange:this.handleChange.bind(this, i),
                        key:i,
                        ref:"input" + i} )
                )
            );
        }
        return (
            React.DOM.div( {className:"bblist"}, 
                React.DOM.ol(null, 
                    nodes
                )
            )
        );
    },

    getInitialState: function() {
        /* Initial state of the app. Output is empty. list is also empty.
        */
        return {output: '', list: []};
    },

    handleChange: function(i) {
        /* Handle input changing, then update the output state
        */
        var value = this.refs["input"+i].getDOMNode().value.trim();
        var list = this.state.list;
        list[i] = value;
        output = this.convertToBBList(list);
        this.setState({output: output, list: list});
        this.props.onBBListChange(output);
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

