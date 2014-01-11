/**
 * @jsx React.DOM
 */

var MultipleBBCat = React.createClass({displayName: 'MultipleBBCat',
    /* Multipe BBCat, processed by this component
     * Let's work hard.
     */

    render: function() {
        /* Render multiple BBCat acording the data that we get from the
         * state.
         */
        var mapper = function(cat, i) {
            return (
                BBCat(
                    {code:cat.code,
                    title:cat.title,
                    key:i,
                    ref:"cat" + i,
                    onBBCatChange:this.handleBBCatChange} )
            );
        }.bind(this);
        return (
            React.DOM.div( {className:"multiplebbcat"}, 
                React.DOM.div( {className:"multiin"}, 
                    this.props.cats.map(mapper)
                ),
                React.DOM.div( {className:"multiout"}, 
                    React.DOM.h3(null, "Output"),
                    TextAreaOutput( {text:this.state.output} )
                )
            )
        );
    },

    getInitialState: function() {
        return { output: '', bbcats: [] }
    },

    componentDidMount: function() {
        var bbcats = this.getBBCatsOut();
        var output = this.outputString(bbcats);
        this.setState({output: output, bbcats: bbcats});
    },

    getBBCatsOut: function() {
        var bblistOuts = [];
        for (var i = 0; i < this.props.cats.length; i++) {
            bblistOuts.push(this.refs["cat"+i].state.output);
        }
        return bblistOuts;
    },

    outputString: function(list) {
        return list.join("\n");
    },

    handleBBCatChange: function(key, val) {
        var bbcats = this.state.bbcats;
        bbcats[key] = val;
        var output = this.outputString(bbcats);
        this.setState({output: output, bbcats: bbcats});
    },
});
