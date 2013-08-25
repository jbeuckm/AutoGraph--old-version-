var ClockComponent = BaseComponent.extend({

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
  },

  defaults: {
    name: "clock",

    period: 1000,
    running: true
  },

  initialize: function() {
    BaseComponent.prototype.initialize.call(this);

    // reset clock when period changes
    this.on("change:period", function(){
      clearTimeout(this.timeoutId);
      this.tick();
    });

    this.tick();
  },

  tick: function() {
console.log("ticking with period "+this.get("period"));
    var self = this;
    this.timeoutId = setTimeout(function(){
      if (self.get("running")) {
        self.sendMessage({ output: true });
        self.tick();
      }
    }, this.get("period"));
  }

});
