define(['models/TerminalModel'], function(TerminalModel){

  return TerminalModel.extend({

    className:"InputTerminalModel",

    receiveBang: function() {
      this.trigger("bang");
    },

    receiveValue: function(origin) {
      console.log("itm received value update");
      console.log(origin.get("value"));
      this.set("value", origin.get("value"));
    }

  });
});
