/** @jsx React.DOM */

var HighlightApp = React.createClass({displayName: 'HighlightApp',
    getInitialState: function() {
        var data = this.props.data;
        var categories = data.categories;
        return {hilist: [], categories: categories};
    },

    render: function() {
        var data = this.props.data;
        var categories = this.state.categories;
        return (
            React.DOM.div( {className:"highlightapp"}, 
                SeriesList(
                    {list:data.series,
                    serialSelect:this.serialSelect,
                    ref:"seriesList"}
                ),
                CategoryList(
                    {list:categories,
                    hilist:this.state.hilist,
                    catOnClick:this.catSelect}
                )
            )
        );
    },

    serialSelect: function(idx) {
        var hilist = [];
        if (idx === -1) {
            this.setState({hilist: hilist});
            return;
        }

        var series = this.props.data.series;
        var selectedSerial = series[idx];
        var categories = this.props.data.categories;
        for (var i = 0; i < categories.length; i++) {
            var category = categories[i];
            var serials = (category.serials || [])
            var isTypeMatch = _.contains(category.allowedTypes, selectedSerial.type);
            var isNotContain = !(_.contains(serials, selectedSerial));
            var isLimitSerials = (serials.length < 3)
            if (isTypeMatch && isNotContain && isLimitSerials) {
                hilist.push(i);
            }
        }
        this.setState({hilist: hilist});
    },

    catSelect: function(idx) {
        var hilist = this.state.hilist;
        var newHilist = _.filter(hilist, function(hidx) {
            return hidx !== idx;
        });

        var categories = this.state.categories;
        var updatedCategory = categories[idx];
        if (!updatedCategory.serials) {
            updatedCategory.serials = [];
        }

        var sidx = this.refs.seriesList.state.selectedIdx;
        var selectedSerial = this.props.data.series[sidx];
        updatedCategory.serials.push(selectedSerial);

        categories[idx] = updatedCategory;

        this.setState({categories: categories, hilist: newHilist});
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
        var serialSelect = this.props.serialSelect;
        if (idx !== this.state.selectedIdx) {
            this.setState({selectedIdx: idx});
            if (serialSelect) {
                serialSelect(idx);
            }
        } else {
            this.setState({selectedIdx: null});
            if (serialSelect) {
                serialSelect(-1);
            }
        }
    },
});

var CategoryList = React.createClass({displayName: 'CategoryList',
    render: function() {
        var categories = this.props.list;
        var hilist = this.props.hilist;
        var categoryNodes = _.map(categories, function(category, idx) {
            var highlighted = false;
            if (_.contains(hilist, idx)) { highlighted = true; }
            return (
                CategoryBox(
                    {key:category.code,
                    category:category,
                    highlighted:highlighted,
                    catOnClick:this.props.catOnClick,
                    idx:idx}
                )
            );
        }.bind(this));

        return (
            React.DOM.div( {className:"categorylist"}, 
                React.DOM.h3(null, "Voting Category"),
                categoryNodes
            )
        );
    },
});

var CategoryBox = React.createClass({displayName: 'CategoryBox',
    /* Category + Votes */
    render: function() {
        var serials = this.props.category.serials;
        var serialNodes = null;
        if (serials) {
            serialNodes = _.map(serials, function(serial, idx) {
                return (
                    Serial(
                        {key:serial.id,
                        serial:serial,
                        idx:idx}
                    )
                );
            });
        }
        return (
            React.DOM.div( {className:"categorybox"}, 
                Category(this.props),
                serialNodes
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
        if (catOnClick && this.props.highlighted) {
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

