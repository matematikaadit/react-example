/** @jsx React.DOM */

var TrashApp = React.createClass({displayName: 'TrashApp',
    render: function() {
        return (
            React.DOM.div( {className:"trash"}, 
                Categories( {categories:this.props.categories} )
            )
        );
    },

    handleChange: function() {

    },
});

var Categories = React.createClass({displayName: 'Categories',
    render: function() {
        var categories = this.props.categories;
        var categoryNodes = _.map(categories, function(category, idx) {
            return (
                React.DOM.div( {className:"category"}, 
                    React.DOM.span( {className:"code"}, category.code),
                    React.DOM.span( {className:"title"}, category.title),
                    React.DOM.span( {className:"del"}, "[x]")
                )
            );
        });
        return (
            React.DOM.div( {className:"categories"}, 
                React.DOM.h2(null, "categories"),
                categoryNodes
            )
        );
    }
});