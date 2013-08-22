var InputTerminalModel = TerminalModel.extend({

  receiveMessage: function(message) {
    this.get("component").trigger({ input:this.get("id"), message:message });
  }

});
