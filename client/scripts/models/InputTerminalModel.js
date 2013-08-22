var InputTerminalModel = TerminalModel.extend({

  receiveMessage: function(message) {
    console.log("InputTerminal receiveMessage");
    this.get("component").receiveMessage({ input:this.get("id"), message:message });
  }

});
