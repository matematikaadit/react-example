/** @jsx React.DOM */

var TrashApp = React.createClass({
    render: function() {
        return (
            <div className="trash">
                <Categories categories={this.props.categories} />
            </div>
        );
    },

    handleChange: function() {

    },
});

var Categories = React.createClass({
    render: function() {
        var categories = this.props.categories;
        var categoryNodes = _.map(categories, function(category, idx) {
            return (
                <div className="category">
                    <span className="code">{category.code}</span>
                    <span className="title">{category.title}</span>
                    <span className="del">[x]</span>
                </div>
            );
        });
        return (
            <div className="categories">
                <h2>categories</h2>
                {categoryNodes}
            </div>
        );
    }
});