var OutputTerminalModel = TerminalModel.extend({

  initialize: function() {
    TerminalModel.prototype.initialize.call(this);

    var c = this.get("component");

    this.listenTo(c, "message", this.sendMessage);
  },

  sendMessage: function(message) {
    this.trigger("message", message);
  }

});
