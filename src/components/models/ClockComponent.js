var ClockComponent = BaseComponent.extend({

  period: 1000,
  running: true,

  defaults: {
    name: "clock",

    inputs: {
      toggle: {
        name: "toggle",
        description: "Turn the clock off or on."
      },
      period: {
        name: "period",
        description: "Period of the clock in milliseconds."
      }
    },
    outputs: {
      output: {name: "output"}
    }
  },

  initialize: function() {
    BaseComponent.prototype.initialize.call(this);

    this.get("inputs").period.model.on("value", alert);

    this.tick();
  },

  tick: function() {
    var self = this;
    this.timeoutId = setTimeout(function(){
      self.sendMessage({ output: true });
      if (self.running) {
        self.tick();
      }
    }, this.period);
  }

});
