/**
 * @jsx React.DOM
 */

var BBList = React.createClass({
    /* BBList gives a list of input and process it to be a BBList output
     */
    MAX: 20,

    render: function() {
        /* Just render the input, also give a onChange callback to the input
         * when it's changed by user.
         */
        var nodes = [];
        for (var i = 0; i < this.MAX; i++) {
            nodes.push(
                <li>
                    <input type="text"
                        onChange={this.handleChange.bind(this, i)}
                        key={i}
                        ref={"input" + i} 
                        className={this.state.warnState[i] ? "warn" : ""} />
                </li>
            );
        }
        return (
            <div className="bblist">
                <ol>
                    {nodes}
                </ol>
            </div>
        );
    },

    getInitialState: function() {
        /* Initial state of the app. Output is empty. list is also empty.
        */
        var list = [];
        var warnState = [];
        for (var i = 0; i < this.MAX; i++) {
            list[i] = '';
            warnState[i] = false;
        }
        return {output: '', list: list, tally: {}, warnState: warnState};
    },

    handleChange: function(i) {
        /* Handle input changing, then update the output state
        */
        var value = this.refs["input"+i].getDOMNode().value.trim();
        var list = this.state.list;
        var old = list[i];
        list[i] = value;
        output = this.convertToBBList(list);
        this.setState({output: output, list: list});

        this.setUnset(i, old);
        // this.props.onBBListChange(output);
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

    setUnset: function(i, old) {
        // TODO: there are some bugs lurking here.
        var list = this.state.list;
        var tally = this.state.tally;
        var warnState = this.state.warnState;
        var value = list[i];
        if (old) {
            tally[old]--;
            if (tally[old] == 2) {
                this.changeWarn(old, false);
            }
        }
        if (value) {
            if (tally[value]) {
                tally[value]++;
            } else {
                tally[value] = 1;
            }
            if (tally[value] >= 3) {
                this.changeWarn(value, true)
            } else if (warnState[i]) {
                this.clearWarn(i);
            }
        } else {
            this.clearWarn(i);
        }
        this.setState({tally: tally});
    },

    changeWarn: function(value, ok) {
        var list = this.state.list;
        var warnState = this.state.warnState;
        for (var i = 0; i < list.length; i++) {
            if (list[i] == value) {
                warnState[i] = ok;
            }
        }
        this.setState({warnState: warnState});
    },

    clearWarn: function(i) {
        var warnState = this.state.warnState;
        warnState[i] = false;
        this.setState({warnState: warnState});
    }
});

