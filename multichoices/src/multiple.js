/**
 * @jsx React.DOM
 */

var MultipleBBCat = React.createClass({
    /* Multipe BBCat, processed by this component
     * Let's work hard.
     */

    render: function() {
        /* Render multiple BBCat acording the data that we get from the
         * state.
         */
        var mapper = function(cat, i) {
            return (
                <BBCat
                    code={cat.code}
                    title={cat.title}
                    key={i}
                    ref={"cat" + i}
                    onBBCatChange={this.handleBBCatChange} />
            );
        }.bind(this);
        return (
            <div className="multiplebbcat">
                <div className="multiin">
                    {this.props.cats.map(mapper)}
                </div>
                <div className="multiout">
                    <h3>Output</h3>
                    <TextAreaOutput text={this.state.output} />
                </div>
            </div>
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
