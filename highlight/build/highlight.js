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
    getInitialState: function() {
        return {selectedIdx: null};
    },

    render: function() {
        var series = this.props.list;
        var serialNodes = _.map(series, function(serial, idx) {
            var selected = false;
            if (idx === this.state.selectedIdx) {
                selected = true;
            }

            return (
                Serial(
                    {key:serial.id,
                    serial:serial,
                    idx:idx,
                    selected:selected,
                    serialOnClick:this.handleSerialClick}
                )
            );
        }.bind(this));

        return (
            React.DOM.div( {className:"serieslist"}, 
                React.DOM.h3(null, "Series"),
                serialNodes
            )
        );
    },

    handleSerialClick: function(idx) {
        if (idx !== this.state.selectedIdx) {
            this.setState({selectedIdx: idx});
        } else {
            this.setState({selectedIdx: null});
        }
    },
});

var CategoryList = React.createClass({displayName: 'CategoryList',
    render: function() {
        var categories = this.props.list;
        var categoryNodes = _.map(categories, function(category, idx) {
            return (
                Category(
                    {key:category.code,
                    category:category,
                    idx:idx}
                )
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
        var cx = React.addons.classSet;
        var classes = cx({
            'category': true,
            'highlighted': this.props.highlighted,
            'selected': this.props.selected,
        });
        return (
            React.DOM.div( {className:classes, onClick:this.handleClick}, 
                React.DOM.span( {className:"code"}, category.code),
                React.DOM.span( {className:"name"}, category.name)
            )
        );
    },

    handleClick: function() {
        var catOnClick = this.props.catOnClick;
        var idx = this.props.idx || 0;
        if (catOnClick) {
            catOnClick(idx);
        }
    },
});

var Serial = React.createClass({displayName: 'Serial',
    render: function() {
        var serial = this.props.serial;
        var cx = React.addons.classSet;
        var classes = cx({
            'serial': true,
            'highlighted': this.props.highlighted,
            'selected': this.props.selected,
        });
        return (
            React.DOM.div( {className:classes, onClick:this.handleClick}, 
                React.DOM.span( {className:"title"}, serial.title),
                React.DOM.span( {className:"type"}, "("+serial.type+")")
            )
        );
    },

    handleClick: function() {
        var serialOnClick = this.props.serialOnClick;
        var idx = this.props.idx || 0;
        if (serialOnClick) {
            serialOnClick(idx);
        }
    },
});

