var ClockComponent = BaseComponent.extend({

  defaults: {
    label: "clock",

    period: 1000,
    ticking: true,

    inputs: {
      toggle: {
        label: "toggle",
        description: "Turn the clock off or on."
      },
      period: {
        label: "period",
        description: "Period of the clock in milliseconds."
      }
    },
    outputs: {
      output: {label: "output"}
    }
  },

  initialize: function() {
    BaseComponent.prototype.initialize.call(this);
    this.tick();
  },

  tick: function() {
    var self = this;
    var id = setTimeout(function(){
      self.sendOutputs({ output: true });
      self.tick();
    }, this.get("period"));
    this.set("timeoutId", id);
  }

});
