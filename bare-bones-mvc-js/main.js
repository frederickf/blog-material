/**
 * Created with JetBrains PhpStorm.
 * User: frederick
 * Date: 2/15/13
 * Time: 9:39 PM
 * To change this template use File | Settings | File Templates.
 */
function Event() {
    this.listeners = [];
}

Event.prototype = {
    listen : function (listener) {
        this.listeners.push(listener);
    },
    notify : function (args) {
        var index;

        for (index = 0; index < this.listeners.length; index += 1) {
            this.listeners[index](args);
        }
    }
};

/**
 * The Model. Model stores items and notifies
 * observers about changes.
 */
function ListModel(items) {
    this.items = items;

    this.itemAdded = new Event();
    this.itemRemoved = new Event();
}

ListModel.prototype = {
    getItems : function () {
        return [].concat(this.items);
    },

    addItem : function (item) {
        this.items.push(item);
        this.itemAdded.notify({ item : item });
    },

    removeItemAt : function (index) {
        var item = this.items[index];
        this.items.splice(index, 1);
        this.itemRemoved.notify({ item : item });
    }
};


/**
 * The View. View presents the model and provides
 * the UI events. The controller is attached to these
 * events to handle the user interaction.
 */
function ListView(model, htmlElements) {
    this.model = model;
    this.htmlElements = htmlElements;

    this.addButtonClicked = new Event();
    this.delButtonClicked = new Event();

    var self = this;

    // attach model listeners
    this.model.itemAdded.listen(function () {
        self.rebuildList();
    });
    this.model.itemRemoved.listen(function () {
        self.rebuildList();
    });

    // attach listeners to HTML controls
    this.htmlElements.addButton.click(function () {
        self.addButtonClicked.notify();
    });
    this.htmlElements.delButton.click(function () {
        self.delButtonClicked.notify();
    });
}

ListView.prototype = {
    show : function () {
        this.rebuildList();
    },

    rebuildList : function () {
        var list, items, key;

        list = this.htmlElements.list;
        list.html('');

        items = this.model.getItems();
        for (key in items) {
            if (items.hasOwnProperty(key)) {
                list.append($('<option>' + items[key] + '</option>'));
            }
        }
    },

    getSelectedIndex : function () {
        return this.htmlElements.list.prop("selectedIndex");
    }
};

/**
 * The Controller. Controller responds to user actions and
 * invokes changes on the model.
 */
function ListController(model, view) {
    this.model = model;
    this.view = view;

    var self = this;

    // attach view listeners
    this.view.addButtonClicked.listen(function () {
        self.addItem();
    });

    this.view.delButtonClicked.listen(function () {
        self.delItem();
    });
}

ListController.prototype = {
    addItem : function () {
        var item = window.prompt('Add item:', '');
        if (item) {
            this.model.addItem(item);
        }
    },

    delItem : function () {
        var index = this.view.getSelectedIndex();
        if (index !== -1) {
            this.model.removeItemAt(index);
        }
    }
};

var model = new ListModel(['JavaScript', 'Model', 'View', 'Controller']),
    view = new ListView(model, {
        'list' : $('#list'),
        'addButton' : $('#plusBtn'),
        'delButton' : $('#minusBtn')
    });

new ListController(model, view);
view.show();
