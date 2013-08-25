define(['models/TerminalModel'], function(TerminalModel){

  return TerminalModel.extend({

    className:"InputTerminalModel",

    receiveMessage: function(message) {
      var labeledMessage = {};
      labeledMessage[this.get("name")] = message;

      this.trigger("message", labeledMessage);
    },

    receiveValue: function(origin) {
      console.log("itm received ");
      console.log(origin.get("value"));
      this.set("value", origin.get("value"));
    }

  });
});
