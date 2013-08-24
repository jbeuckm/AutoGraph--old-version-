define(['models/TerminalModel'], function(TerminalModel){

  return TerminalModel.extend({

    className:"InputTerminalModel",

    receiveMessage: function(message) {
      this.trigger("message", message);
    }

  });
});
