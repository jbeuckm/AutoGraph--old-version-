define(['models/TerminalModel'], function (TerminalModel) {

  return TerminalModel.extend({

    className:"OutputTerminalModel",

    initialize:function () {
      TerminalModel.prototype.initialize.call(this);

      var component = this.get("component");

      this.listenTo(component, "bang", this.sendBang);
    },

    sendBang:function () {
      this.trigger("bang");
    }

  });
});
