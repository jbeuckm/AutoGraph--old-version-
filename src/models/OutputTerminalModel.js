define(['models/TerminalModel'], function (TerminalModel) {

  return TerminalModel.extend({

    className:"OutputTerminalModel",

    initialize:function () {
      TerminalModel.prototype.initialize.call(this);

      var c = this.get("component");

      this.listenTo(c, "message", this.sendMessage);
      this.listenTo(c, "value", this.sendValue);
    },

    sendMessage:function (message) {
      console.log("otm sendmessage "+message);
      console.log(message);
      console.log(this.get("name"));
      var x = message[this.get("name")];
      if (x !== undefined) {
        this.trigger("message", x);
      }
    },

    sendValue:function (value) {
      var x = value[this.get("name")];
      if (x !== undefined) {
        this.trigger("value", x);
      }
    }

  });
});
