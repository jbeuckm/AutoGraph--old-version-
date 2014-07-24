/**
 * @module ComponentCollection
 */
define(['backbone', 'components/models/BaseComponent', 'localstorage'], function (Backbone, BaseComponent) {

    /**
     * @constructor
     */
    return Backbone.Collection.extend({
        model: BaseComponent,
        localStorage: new Backbone.LocalStorage("ComponentCollection")
    });

});
