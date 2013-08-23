var OutputTerminalModel = TerminalModel.extend({

  initialize: function() {
    TerminalModel.prototype.initialize.call(this);

    var c = this.get("component");

    this.listenTo(c, "message", this.sendMessage);
  },

  sendMessage: function(message) {
    console.log(this.get("component").get("name")+":");
    console.log("output terminal sending output "+JSON.stringify(message));
    this.trigger("message", message);
  }

});
