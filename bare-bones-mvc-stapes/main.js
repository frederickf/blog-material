/**
 * Created with JetBrains PhpStorm.
 * User: frederick
 * Date: 2/15/13
 * Time: 9:40 PM
 * To change this template use File | Settings | File Templates.
 */

/*! Stapes.js v0.7 < http://hay.github.com/stapes > */
(function(){"use strict";var a="0.7.0",b=1;if(!Object.create)var c=function(){};var d=Array.prototype.slice,e={attributes:{},eventHandlers:{"-1":{}},guid:-1,addEvent:function(a){e.eventHandlers[a.guid][a.type]||(e.eventHandlers[a.guid][a.type]=[]),e.eventHandlers[a.guid][a.type].push({guid:a.guid,handler:a.handler,scope:a.scope,type:a.type})},addEventHandler:function(a,b,c){var d={},f;typeof a=="string"?(f=c||!1,d[a]=b):(f=b||!1,d=a);for(var g in d){var h=d[g],i=g.split(" ");for(var j=0,k=i.length;j<k;j++){var l=i[j];e.addEvent.call(this,{guid:this._guid||this._.guid,handler:h,scope:f,type:l})}}},addGuid:function(a,c){if(!a._guid||!!c)a._guid=b++,e.attributes[a._guid]={},e.eventHandlers[a._guid]={}},attr:function(a){return e.attributes[a]},clone:function(a){return e.extend({},a)},create:function(a){if(Object.create)return Object.create(a);c.prototype=a;return new c},createSubclass:function(a,b){function g(){if(this instanceof g)b&&e.addGuid(this,!0),d.apply(this,arguments);else throw new Error("Please use 'new' when initializing Stapes classes")}a=a||{},b=b||!1;var c=a.superclass.prototype,d=a.hasOwnProperty("constructor")?a.constructor:function(){};b&&e.extend(c,f),g.prototype=e.create(c),g.prototype.constructor=g,e.extend(g,{extend:function(){return e.extendThis.apply(this,arguments)},parent:c,proto:function(){return e.extendThis.apply(this.prototype,arguments)},subclass:function(a){a=a||{},a.superclass=this;return e.createSubclass(a)}});for(var h in a)h!=="constructor"&&h!=="superclass"&&(g.prototype[h]=a[h]);return g},emitEvents:function(a,b,c,d){c=c||!1,d=d||this._guid;var f=e.eventHandlers[d][a];for(var g=0,h=f.length;g<h;g++){var i=e.extend({},f[g]),j=i.scope?i.scope:this;c&&(i.type=c),i.scope=j,i.handler.call(i.scope,b,i)}},extend:function(){var a=d.call(arguments),b=a.shift();for(var c=0,e=a.length;c<e;c++){var f=a[c];for(var g in f)b[g]=f[g]}return b},extendThis:function(){var a=d.call(arguments);a.unshift(this);return e.extend.apply(this,a)},makeUuid:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(a){var b=Math.random()*16|0,c=a=="x"?b:b&3|8;return c.toString(16)})},removeAttribute:function(a,b){b=b||!1;var c=e.trim(a).split(" ");for(var d=0,f=c.length;d<f;d++){var g=e.trim(c[d]);g&&(delete e.attr(this._guid)[g],b||(this.emit("change",g),this.emit("change:"+g),this.emit("remove",g),this.emit("remove:"+g)))}},removeEventHandler:function(a,b){var c=e.eventHandlers[this._guid];if(a&&b){c=c[a];if(!c)return;for(var d=0,f=c.length,g;d<f;d++)g=c[d].handler,g&&g===b&&(c.splice(d--,1),f--)}else a?delete c[a]:e.eventHandlers[this._guid]={}},setAttribute:function(a,b,c){c=c||!1;var d=this.has(a),f=e.attr(this._guid)[a];if(b!==f){e.attr(this._guid)[a]=b;if(c)return;this.emit("change",a),this.emit("change:"+a,b);var g={key:a,newValue:b,oldValue:f||null};this.emit("mutate",g),this.emit("mutate:"+a,g);var h=d?"update":"create";this.emit(h,a),this.emit(h+":"+a,b)}},trim:function(a){return a.replace(/^\s\s*/,"").replace(/\s\s*$/,"")},typeOf:function(a){return a===null||typeof a=="undefined"?String(a):Object.prototype.toString.call(a).replace(/\[object |\]/g,"").toLowerCase()},updateAttribute:function(a,b,c){var d=this.get(a);e.typeOf(d)==="object"&&(d=e.clone(d));var f=b.call(this,d,a);e.setAttribute.call(this,a,f,c||!1)}},f={emit:function(a,b){b=typeof b=="undefined"?null:b;var c=a.split(" ");for(var d=0,f=c.length;d<f;d++){var g=c[d];e.eventHandlers[-1].all&&e.emitEvents.call(this,"all",b,g,-1),e.eventHandlers[-1][g]&&e.emitEvents.call(this,g,b,g,-1),typeof this._guid=="number"&&(e.eventHandlers[this._guid].all&&e.emitEvents.call(this,"all",b,g),e.eventHandlers[this._guid][g]&&e.emitEvents.call(this,g,b))}},off:function(){e.removeEventHandler.apply(this,arguments)},on:function(){e.addEventHandler.apply(this,arguments)}};e.Module=function(){},e.Module.prototype={create:function(){throw new Error("".concat("create() on Stapes modules no longer works from 0.8.0. ","Check the docs."))},each:function(a,b){var c=e.attr(this._guid);for(var d in c){var f=c[d];a.call(b||this,f,d)}},extend:function(){return e.extendThis.apply(this,arguments)},filter:function(a){var b=[],c=e.attr(this._guid);for(var d in c)a.call(this,c[d],d)&&b.push(c[d]);return b},get:function(a){if(typeof a=="string")return this.has(a)?e.attr(this._guid)[a]:null;if(typeof a=="function"){var b=this.filter(a);return b.length?b[0]:null}},getAll:function(){return e.clone(e.attr(this._guid))},getAllAsArray:function(){var a=[],b=e.attr(this._guid);for(var c in b){var d=b[c];e.typeOf(d)==="object"&&!d.id&&(d.id=c),a.push(d)}return a},has:function(a){return typeof e.attr(this._guid)[a]!="undefined"},map:function(a,b){var c=[];this.each(function(d,e){c.push(a.call(b||this,d,e))},b||this);return c},push:function(a,b){if(e.typeOf(a)==="array")for(var c=0,d=a.length;c<d;c++)e.setAttribute.call(this,e.makeUuid(),a[c]);else e.setAttribute.call(this,e.makeUuid(),a,b||!1);return this},remove:function(a,b){typeof a=="function"?this.each(function(c,d){a(c)&&e.removeAttribute.call(this,d,b)}):e.removeAttribute.call(this,a,b||!1);return this},set:function(a,b,c){if(typeof a=="object")for(var d in a)e.setAttribute.call(this,d,a[d]);else e.setAttribute.call(this,a,b,c||!1);return this},size:function(){var a=0,b=e.attr(this._guid);for(var c in b)a++;return a},update:function(a,b,c){typeof a=="string"?e.updateAttribute.call(this,a,b,c||!1):typeof a=="function"&&this.each(function(b,c){e.updateAttribute.call(this,c,a)});return this}};var g={_:e,create:function(){var a=e.create(e.Module.prototype);e.addGuid(a,!0),g.mixinEvents(a);return a},extend:function(){return e.extendThis.apply(e.Moduel,arguments)},mixinEvents:function(a){a=a||{},e.addGuid(a);return e.extend(a,f)},on:function(){e.addEventHandler.apply(this,arguments)},subclass:function(a,b){b=b||!1,a=a||{},a.superclass=b?function(){}:e.Module;return e.createSubclass(a,!b)},version:a};typeof exports!="undefined"?(typeof module!="undefined"&&module.exports&&(exports=module.exports=g),exports.Stapes=g):typeof define=="function"&&define.amd?define(function(){return g}):window.Stapes=g})()

/**
 * The Model. Model stores items and notifies
 * observers about changes.
 */
var ListModel = Stapes.subclass({
    constructor: function (items) {
        this.push(items);
    },

    getItems : function () {
        return this.getAllAsArray();
    },

    addItem : function (item) {
        this.push(item);
    },

    removeItem : function (itemToRemove) {
        this.remove(function(item) {
            return item === itemToRemove;
        });
    }
});

/**
 * The View. View presents the model and provides
 * the UI events. The controller is attached to these
 * events to handle the user interaction.
 */
var ListView = Stapes.subclass({
    constructor: function (model, htmlElements) {
        this.model = model;
        this.htmlElements = htmlElements;

        // attach model listeners
        this.model.on({
            'create': function() {
                this.rebuildList();
            },
            'remove': function() {
                this.rebuildList();
            }
        }, this);

        // attach listeners to HTML controls
        this.htmlElements.$addButton.on('click', $.proxy(function () {
            this.emit('addButtonClicked');
        }, this));

        this.htmlElements.$delButton.on('click', $.proxy(function () {
            this.emit('deleteButtonClicked')
        }, this));
    },

    show : function () {
        this.rebuildList();
    },

    rebuildList : function () {
        var $list, items, key;

        $list = this.htmlElements.$list;
        $list.html('');

        items = this.model.getAllAsArray();
        for (key in items) {
            if (items.hasOwnProperty(key)) {
                $list.append($('<option>' + items[key] + '</option>'));
            }
        }
    },

    getSelectedItem : function () {
        return this.htmlElements.$list.find('option:selected').text();
    }
});

/**
 * The Controller. Controller responds to user actions and
 * invokes changes on the model.
 */
var ListController = Stapes.subclass({
    constructor: function(model, view) {
        this.model = model;
        this.view = view;

        // attach view listeners
        this.view.on('addButtonClicked', function () {
            this.addItem();
        }, this);

        this.view.on('deleteButtonClicked', function () {
            this.delItem();
        }, this);
    },

    addItem : function () {
        var item = window.prompt('Add item:', '');
        if (item) {
            this.model.addItem(item);
        }
    },

    delItem : function () {
        var item = this.view.getSelectedItem();
        if (item) {
            this.model.removeItem(item);
        }
    }

});


var model = new ListModel(['Stapes.js', 'Model', 'View', 'Controller']),
    view = new ListView(model, {
        '$list' : $('#list'),
        '$addButton' : $('#plusBtn'),
        '$delButton' : $('#minusBtn')
    });

new ListController(model, view);
view.show();