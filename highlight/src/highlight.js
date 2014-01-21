/** @jsx React.DOM */

var HighlightApp = React.createClass({
    getInitialState: function() {
        var data = this.props.data;
        var categories = data.categories;
        return {hilist: [], categories: categories};
    },

    render: function() {
        var data = this.props.data;
        var categories = this.state.categories;
        return (
            <div className="highlightapp">
                <SeriesList
                    list={data.series}
                    serialSelect={this.serialSelect}
                    ref="seriesList"
                />
                <CategoryList
                    list={categories}
                    hilist={this.state.hilist}
                    catOnClick={this.catSelect}
                />
            </div>
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

var CategoryList = React.createClass({
    render: function() {
        var categories = this.props.list;
        var hilist = this.props.hilist;
        var categoryNodes = _.map(categories, function(category, idx) {
            var highlighted = false;
            if (_.contains(hilist, idx)) { highlighted = true; }
            return (
                <CategoryBox
                    key={category.code}
                    category={category}
                    highlighted={highlighted}
                    catOnClick={this.props.catOnClick}
                    idx={idx}
                />
            );
        }.bind(this));

        return (
            <div className="categorylist">
                <h3>Voting Category</h3>
                {categoryNodes}
            </div>
        );
    },
});

var CategoryBox = React.createClass({
    /* Category + Votes */
    render: function() {
        var serials = this.props.category.serials;
        var serialNodes = null;
        if (serials) {
            serialNodes = _.map(serials, function(serial, idx) {
                return (
                    <Serial
                        key={serial.id}
                        serial={serial}
                        idx={idx}
                    />
                );
            });
        }
        return (
            <div className="categorybox">
                {Category(this.props)}
                {serialNodes}
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
        if (catOnClick && this.props.highlighted) {
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

