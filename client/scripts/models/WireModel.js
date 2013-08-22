var WireModel = Backbone.Model.extend({

  defaults: {
    origin: null,
    destination: null
  },

  passMessage: function(message) {
    this.get("destination").passMessage(message);
  }

});
