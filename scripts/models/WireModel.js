var WireModel = Backbone.Model.extend({

  defaults: {
    originTerminalId: null,
    destinationTerminalId: null
  },

  getOriginModel: function() {
    var o = this.get("originTerminalId");
    return(Terminals.get(o));
  },
  getDestinationModel: function() {
    var d = this.get("destinationTerminalId");
    if (d) {
      return(Terminals.get(d));
    }
    else {
      return(cursorModel);
    }
  }

});


var WireCollection = Backbone.Collection.extend({
  model: WireModel
});
