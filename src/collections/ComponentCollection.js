/**
 * @module ComponentCollection
 */
define(['backbone', 'components/models/BaseComponent'], function (Backbone, BaseComponent) {

  /**
   * @constructor
   */
  return Backbone.Collection.extend({
    model: BaseComponent
  });

});
