var InputTerminalModel = TerminalModel.extend({

  receiveMessage: function(message) {
    console.log(this.get("component").get("name")+":");
    console.log("InputTerminal receiveMessage");
    this.trigger("message", message);
  }

});
