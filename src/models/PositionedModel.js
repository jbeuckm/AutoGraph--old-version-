/**
 * @module PositionedModel
 */
define(['backbone'], function(Backbone){

  /**
   * @class PositionedModel
   */
  return Backbone.Model.extend({

    defaults: {
      x: 0,
      y: 0
    }

  });
});
