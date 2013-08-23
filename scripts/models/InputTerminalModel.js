var InputTerminalModel = TerminalModel.extend({

  receiveMessage: function(message) {
    this.trigger("message", message);
  }

});
