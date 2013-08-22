var WireModel = Backbone.Model.extend({

  defaults: {
    originTerminalId: null,
    destinationTerminalId: null
  },

  passMessage: function(message) {
    this.get("destinationTerminalId").receiveMessage(message);
  }

});


var WireCollection = Backbone.Collection.extend({
  model: WireModel
});
