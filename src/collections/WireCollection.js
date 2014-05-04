define(['models/WireModel'], function(WireModel){

  return Backbone.Collection.extend({
    model: WireModel
  });

});
