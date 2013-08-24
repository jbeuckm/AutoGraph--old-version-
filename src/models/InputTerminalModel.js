define(['models/TerminalModel'], function(TerminalModel){

  return TerminalModel.extend({

    receiveMessage: function(message) {
      this.trigger("message", message);
    }

  });
});
