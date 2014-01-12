/**
 * @jsx React.DOM
 */

var BBList = React.createClass({displayName: 'BBList',
    /* BBList gives a list of input and process it to be a BBList output
     */

    /* Maximum number of input */
    MAX: 20,

    render: function() {
        /* Just render the input, also give a onChange callback to the input
         * when it's changed by user.
         */
        var nodes = [];
        for (var i = 0; i < this.MAX; i++) {
            nodes.push(
                React.DOM.li(null, 
                    React.DOM.input( {type:"text",
                        onChange:this.handleChange.bind(this, i),
                        key:i,
                        ref:"input" + i,
                        className:this.state.redish[i] ? "warn" : ""} )
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
        var list = [];
        var redish = [];
        for (var i = 0; i < this.MAX; i++) {
            list[i] = '';
            redish[i] = false;
        }
        return {list: list, redish: redish};
    },

    handleChange: function(i) {
        var list = this.getUpdatedList(i);
        var tally = this.getTally(list);
        var redish = this.getUpdatedRedish(tally);
        this.setState({list: list, redish: redish});
    },

    getUpdatedList: function(i) {
        /* get old list and new value
        */
        var list = this.state.list;
        var value = this.refs["input"+i].getDOMNode().value.trim();

        /* update list */
        list[i] = value;
        return list;
    },

    getUpdatedRedish: function(tally) {
        var redish = this.state.redish;
        for (var key in tally) {
            var nextred = (tally[key].count > 2)  && (key !== '')
            for (var i = 0; i < tally[key].idx.length; i++) {
                redish[tally[key].idx[i]] = nextred;
            }
        }
        return redish;
    },

    getTally: function(list) {
        var tally = {};

        for (var i = 0; i < list.length; i++) {
            tally[list[i]] = tally[list[i]] || {count: 0, idx: []};
            tally[list[i]].count++;
            tally[list[i]].idx.push(i);
        }
        return tally;
    },

});

