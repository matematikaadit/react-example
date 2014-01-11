/**
 * @jsx React.DOM
 */

var BBCat = React.createClass({
    /* BBCat, categories of BBList
     */

    render: function() {
        /* Render the BBList, gives category, then render the output
         */
        return (
            <div className="bbcat">
                <h3>{this.props.title}</h3>
                <BBList onBBListChange={this.handleBBListChange} />
            </div>
        );
    },

    getInitialState: function() {
        /* Set initial state of the BBCat
         * It's just the output returned by the onBBListChange event
         */
         var output = this.getHeader()
        return { output: output };
    },

    handleBBListChange: function(bblist) {
        /* Handle BBList Change, this method must be called by the BBList
         * components. Take the given value and process it.
         */
        var header = this.getHeader();
        var output = header + bblist;
        this.setState({ output: output });
        this.props.onBBCatChange(this.props.key, output);
    },

    getHeader: function(code, title) {
        /* convert a code and title to a ready to use header
         * It's convenient to do so
         */
        var codepart = "-{" + this.props.code + "}-";
        var titlepart = "[" + this.props.title + "]";
        return codepart + " " + titlepart + "\n"
    },
});

