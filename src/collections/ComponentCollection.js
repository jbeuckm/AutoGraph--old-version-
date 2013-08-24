
define(['backbone', 'components/models/BaseComponent'], function (Backbone, BaseComponent) {

  return Backbone.Collection.extend({
    model: BaseComponent
  });

});
