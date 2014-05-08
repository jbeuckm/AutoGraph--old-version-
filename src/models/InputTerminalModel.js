define(['models/TerminalModel'], function(TerminalModel){

  /**
   * @module models/TerminalModel
   *
   */
  return TerminalModel.extend({

    className:"InputTerminalModel",

    /**
     * @method
     */
    receiveBang: function() {
      this.trigger("bang");
    },

    /**
     * @method
     * @param origin
     */
    receiveValue: function(origin) {
      console.log("InputTerminalModel received value update");
      console.log(origin.get("value"));
      this.set("value", origin.get("value"));
    }

  });

});
