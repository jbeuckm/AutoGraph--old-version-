var OutputTerminalModel = TerminalModel.extend({

  sendMessage: function(message) {
    var wires = this.get("connectedWires");
    for (var i= 0, l=wires.length; i<l; i++) {
      var w = wires[i];
      w.passMessage(message);
    }
  }

});
