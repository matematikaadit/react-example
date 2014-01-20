/** @jsx React.DOM */

var HighlightApp = React.createClass({displayName: 'HighlightApp',
    render: function() {
        var data = this.props.data;
        return (
            React.DOM.div( {className:"highlightapp"}, 
                SeriesList( {list:data.series} ),
                CategoryList( {list:data.categories} )
            )
        );
    },
});

var SeriesList = React.createClass({displayName: 'SeriesList',
    render: function() {
        var series = this.props.list;
        var serialNodes = _.map(series, function(serial, idx) {
            return (
                Serial( {key:serial.id, serial:serial} )
            );
        });

        return (
            React.DOM.div( {className:"serieslist"}, 
                React.DOM.h3(null, "Series"),
                serialNodes
            )
        );
    },
});

var CategoryList = React.createClass({displayName: 'CategoryList',
    render: function() {
        var categories = this.props.list;
        var categoryNodes = _.map(categories, function(category, idx) {
            return (
                Category( {key:category.code, category:category} )
            );
        });

        return (
            React.DOM.div( {className:"categorylist"}, 
                React.DOM.h3(null, "Voting Category"),
                categoryNodes
            )
        );
    },
});

var Category = React.createClass({displayName: 'Category',
    render: function() {
        var category = this.props.category;
        return (
            React.DOM.div( {className:"category"}, 
                React.DOM.span( {className:"code"}, category.code),
                React.DOM.span( {className:"name"}, category.name)
            )
        );
    }
});

var Serial = React.createClass({displayName: 'Serial',
    render: function() {
        var serial = this.props.serial;
        return (
            React.DOM.div( {className:"serial"}, 
                React.DOM.span( {className:"title"}, serial.title),
                React.DOM.span( {className:"type"}, "("+serial.type+")")
            )
        );
    },
});
