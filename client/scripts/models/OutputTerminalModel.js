var OutputTerminalModel = TerminalModel.extend({

  sendMessage: function(message) {

    var wires = Wires.where({originTerminalId:this.cid});
    for (var i= 0, l=wires.length; i<l; i++) {
      var wire = wires[i];
      wire.passMessage(message);
    }

  }

});
