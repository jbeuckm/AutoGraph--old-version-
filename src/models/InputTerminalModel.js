define(['models/TerminalModel'], function(TerminalModel){

  return TerminalModel.extend({

    className:"InputTerminalModel",

    receiveMessage: function(message) {
      this.trigger("message", message);
    },

    receiveValue: function(message) {
      this.trigger("value", message);
    }

  });
});
