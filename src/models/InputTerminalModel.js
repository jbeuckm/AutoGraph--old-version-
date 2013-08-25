define(['models/TerminalModel'], function(TerminalModel){

  return TerminalModel.extend({

    className:"InputTerminalModel",

    receiveMessage: function(message) {
      var labeledMessage = {};
      labeledMessage[this.get("name")] = message;

      this.trigger("message", labeledMessage);
    },

    receiveValue: function(value) {
      this.set("value", value);
      this.trigger("value");
    }

  });
});
