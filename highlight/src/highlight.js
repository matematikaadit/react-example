/** @jsx React.DOM */

var HighlightApp = React.createClass({
    render: function() {
        var data = this.props.data;
        return (
            <div className="highlightapp">
                <SeriesList list={data.series} />
                <CategoryList list={data.categories} />
            </div>
        );
    },
});

var SeriesList = React.createClass({
    render: function() {
        var series = this.props.list;
        var serialNodes = _.map(series, function(serial, idx) {
            return (
                <Serial key={serial.id} serial={serial} />
            );
        });

        return (
            <div className="serieslist">
                <h3>Series</h3>
                {serialNodes}
            </div>
        );
    },
});

var CategoryList = React.createClass({
    render: function() {
        var categories = this.props.list;
        var categoryNodes = _.map(categories, function(category, idx) {
            return (
                <Category key={category.code} category={category} />
            );
        });

        return (
            <div className="categorylist">
                <h3>Voting Category</h3>
                {categoryNodes}
            </div>
        );
    },
});

var Category = React.createClass({
    render: function() {
        var category = this.props.category;
        return (
            <div className="category">
                <span className="code">{category.code}</span>
                <span className="name">{category.name}</span>
            </div>
        );
    }
});

var Serial = React.createClass({
    render: function() {
        var serial = this.props.serial;
        return (
            <div className="serial">
                <span className="title">{serial.title}</span>
                <span className="type">{"("+serial.type+")"}</span>
            </div>
        );
    },
});
