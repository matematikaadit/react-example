/** @jsx React.DOM */

var SortableApp = React.createClass({
    getInitialState: function() {
        return {series: this.props.series};
    },

    render: function() {
        var series = this.state.series;
        var seriesNodes = series.map(function(s, i) {
            return (
                <Series
                    title={s.title}
                    type={s.type}
                    key={s.id}
                    idx={i}
                    onReorder={this.handleReorder}
                />
            );
        }.bind(this));
        return (
            <div className="SortableApp">
                {seriesNodes}
            </div>
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

var Series = React.createClass({
    render: function() {
        return (
            <div className="Series">
                <span className="title">{this.props.title}</span>
                <span className="type">{"(" + this.props.type + ")"}</span>
                <span className="down"
                    onClick={this.down}>↓</span>
                <span className="up"
                    onClick={this.up}>↑</span>
            </div>
        );
    },

    up: function() {
        this.props.onReorder(-1,this.props.idx);
    },

    down: function() {
        this.props.onReorder(+1,this.props.idx);
    },
});

