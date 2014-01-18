/** @jsx React.DOM */

var HighlightApp = React.createClass({
    render: function() {
        var data = this.props.data;
        return (
            <div className="highlightapp">
                <AnimeList list={data.anime} />
                <CategoryList list={data.categories} />
            </div>
        );
    },
});

var AnimeList = React.createClass({
    render: function() {
        return (
            <div className="animelist">
            </div>
        );
    },
});

var CategoryList = React.createClass({
    render: function() {
        return (
            <div className="categorylist">
            </div>
        );
    },
});