/** @jsx React.DOM */

var SortableApp = React.createClass({displayName: 'SortableApp',
    getInitialState: function() {
        return {series: this.props.series};
    },

    render: function() {
        var series = this.state.series;
        var seriesNodes = series.map(function(s, i) {
            return (
                Series(
                    {title:s.title,
                    type:s.type,
                    key:s.id,
                    idx:i,
                    onReorder:this.handleReorder}
                )
            );
        }.bind(this));
        return (
            React.DOM.div( {className:"SortableApp"}, 
                seriesNodes
            )
        );
    },

    handleReorder: function(direction, idx) {
        var nextIdx = idx + direction;
        var series = this.state.series;
        if (nextIdx < 0 || nextIdx >= series.length) { return; }
        
        var tmp = series[idx];
        series[idx] = series[nextIdx];
        series[nextIdx] = tmp;

        this.setState({series: series});
    },
});

var Series = React.createClass({displayName: 'Series',
    render: function() {
        return (
            React.DOM.div( {className:"Series"}, 
                React.DOM.span( {className:"title"}, this.props.title),
                React.DOM.span( {className:"type"}, "(" + this.props.type + ")"),
                React.DOM.span( {className:"down",
                    onClick:this.down}, "↓"),
                React.DOM.span( {className:"up",
                    onClick:this.up}, "↑")
            )
        );
    },

    up: function() {
        this.props.onReorder(-1,this.props.idx);
    },

    down: function() {
        this.props.onReorder(+1,this.props.idx);
    },
});

