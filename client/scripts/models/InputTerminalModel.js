var InputTerminalModel = TerminalModel.extend({

  receiveMessage: function(message) {
    console.log("InputTerminal receiveMessage");
    var component = Components.get(this.get("componentId"));
    component.receiveMessage({ input:this.get("id"), message:message });
  }

});
