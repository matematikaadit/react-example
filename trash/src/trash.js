/** @jsx React.DOM */

var TrashApp = React.createClass({
    getInitialState: function() {
        return {categories: this.props.categories, trashbin: []};
    },

    render: function() {
        return (
            <div className="trash">
                <Categories categories={this.state.categories} onDeleteCat={this.handleDeleteCat}/>
                <TrashBin trashbin={this.state.trashbin} onRestoreCat={this.handleRestoreCat}/>
            </div>
        );
    },

    handleDeleteCat: function(idx) {
        var categories = this.state.categories;
        deletedCat = categories[idx];
        categories.splice(idx, 1); // remove element at idx from categories

        var trashbin = this.state.trashbin;
        trashbin.push(deletedCat); // push the deleted element to trashbin

        this.setState({categories: categories, trashbin: trashbin});
    },

    handleRestoreCat: function(idx) {
        var trashbin = this.state.trashbin;
        restoredCat = trashbin[idx];
        trashbin.splice(idx, 1); // remove element at idx from trashbin

        var categories = this.state.categories;
        categories.push(restoredCat); // push the deleted element to categories

        this.setState({categories: categories, trashbin: trashbin});
    }
});

var Categories = React.createClass({
    render: function() {
        var categories = this.props.categories;
        var categoryNodes = _.map(categories, function(category, idx) {
            return (
                <Category category={category} key={category.code} idx={idx} onModClick={this.handleDelete} mod="del" />
            );
        }.bind(this)); // dont forget to bind this
        return (
            <div className="categories">
                <h2>categories</h2>
                {categoryNodes}
            </div>
        );
    },

    handleDelete: function(idx) {
        this.props.onDeleteCat(idx);
    }
});

var Category = React.createClass({
    render: function() {
        var category = this.props.category;
        var modElement = null;
        if (this.props.mod === "del") {
            modElement = <span className="del" onClick={this.handleClick}>[x]</span>
        } else {
            modElement = <span className="res" onClick={this.handleClick}>[r]</span>
        }
        return (
            <div className="category">
                <span className="code">{category.code}</span>
                <span className="title">{category.title}</span>
                {modElement}
            </div>
        );
    },

    handleClick: function() {
        this.props.onModClick(this.props.idx);
    }
});

var TrashBin = React.createClass({
    render: function() {
        var categories = this.props.trashbin;
        var categoryNodes = _.map(categories, function(category, idx) {
            return (
                <Category category={category} key={category.code} idx={idx} onModClick={this.handleRestore} mod="res" />
            );
        }.bind(this)); // dont forget to bind this

        return (
            <div className="trashbin">
                <h2>trash bin</h2>
                {categoryNodes}
            </div>
        );
    },

    handleRestore: function(idx) {
        this.props.onRestoreCat(idx);
    }
});
