/** @jsx React.DOM */

var HighlightApp = React.createClass({
    getInitialState: function() {
        return {hilist: []};
    },

    render: function() {
        var data = this.props.data;
        return (
            <div className="highlightapp">
                <SeriesList list={data.series} serialSelect={this.serialSelect} />
                <CategoryList list={data.categories} hilist={this.state.hilist} />
            </div>
        );
    },

    serialSelect: function(idx) {
        var series = this.props.data.series;
        var selectedSerialType = series[idx].type;
        var categories = this.props.data.categories;
        var hilist = [];
        for (var i = 0; i < categories.length; i++) {
            var category = categories[i];
            if (_.contains(category.allowedTypes, selectedSerialType)) {
                hilist.push(i);
            }
        }
        this.setState({hilist: hilist});
    },
});

var SeriesList = React.createClass({
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
                <Serial
                    key={serial.id}
                    serial={serial}
                    idx={idx}
                    selected={selected}
                    serialOnClick={this.handleSerialClick}
                />
            );
        }.bind(this));

        return (
            <div className="serieslist">
                <h3>Series</h3>
                {serialNodes}
            </div>
        );
    },

    handleSerialClick: function(idx) {
        if (idx !== this.state.selectedIdx) {
            this.setState({selectedIdx: idx});
        } else {
            this.setState({selectedIdx: null});
        }

        var serialSelect = this.props.serialSelect;
        if (serialSelect) {
            serialSelect(idx);
        }
    },
});

var CategoryList = React.createClass({
    render: function() {
        var categories = this.props.list;
        var hilist = this.props.hilist;
        var categoryNodes = _.map(categories, function(category, idx) {
            var highlighted = false;
            if (_.contains(hilist, idx)) { highlighted = true; }
            return (
                <Category
                    key={category.code}
                    category={category}
                    highlighted={highlighted}
                    idx={idx}
                />
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
        var cx = React.addons.classSet;
        var classes = cx({
            'category': true,
            'highlighted': this.props.highlighted,
            'selected': this.props.selected,
        });
        return (
            <div className={classes} onClick={this.handleClick}>
                <span className="code">{category.code}</span>
                <span className="name">{category.name}</span>
            </div>
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

var Serial = React.createClass({
    render: function() {
        var serial = this.props.serial;
        var cx = React.addons.classSet;
        var classes = cx({
            'serial': true,
            'highlighted': this.props.highlighted,
            'selected': this.props.selected,
        });
        return (
            <div className={classes} onClick={this.handleClick}>
                <span className="title">{serial.title}</span>
                <span className="type">{"("+serial.type+")"}</span>
            </div>
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

