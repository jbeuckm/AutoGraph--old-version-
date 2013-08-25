define(['models/TerminalModel'], function(TerminalModel){

  return TerminalModel.extend({

    className:"InputTerminalModel",

    receiveMessage: function(message) {
      this.trigger("message", message);
    },

    receiveValue: function(value) {
      console.log('received val '+value);
      this.set("value", value);
    }

  });
});
