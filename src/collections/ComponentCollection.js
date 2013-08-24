
define(['backbone', 'models/components/BaseComponent'], function (Backbone, BaseComponent) {

  return Backbone.Collection.extend({
    model: BaseComponent
  });

});
