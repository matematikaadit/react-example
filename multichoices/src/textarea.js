/**
 * @jsx React.DOM
 */

var TextAreaOutput = React.createClass({
    /* Text area output that outputed the text that given to it whenever the
     * parent give a change to it.
     */

    render: function() {
        /* Render the textarea and gives output class to it.
         * It's pretty simple actually.
         */
        return (
            <textarea className="output"
                placeholder="the output will be displayed here"
                value={this.props.text} />
        );
    },
});

