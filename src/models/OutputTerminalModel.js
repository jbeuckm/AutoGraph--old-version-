define(['models/TerminalModel'], function (TerminalModel) {

  return TerminalModel.extend({

    className:"OutputTerminalModel",

    initialize:function () {
      TerminalModel.prototype.initialize.call(this);

      var c = this.get("component");

      this.listenTo(c, "message", this.sendMessage);
    },

    sendMessage:function (message) {
      var x = message[this.get("name")];
      if (x !== undefined) {
        this.trigger("message", x);
      }
    }

  });
});
