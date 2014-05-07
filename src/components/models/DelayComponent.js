/**
 * Transmit a received signal after a given timelapse.
 *
 * @type {*}
 */
var DelayComponent = BaseComponent.extend({

  label: "delay",

  inputs: {
    trigger: {
      name: "input"
    },
    period: {
      name: "period",
      description: "Period of the delay in milliseconds."
    }
  },
  outputs: {
    output: {name: "output"}
  },

  defaults: {
    period: 500
  },

  initialize: function() {
    BaseComponent.prototype.initialize.call(this);
  },

  receiveBang: function() {
    var self = this;
    setTimeout(function(){
      self.sendBang();
    }, this.get("period"));
  }

});
