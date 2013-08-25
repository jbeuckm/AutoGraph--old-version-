var ClockComponent = BaseComponent.extend({

  defaults: {
    name: "clock",

    period: 1000,
    running: true,

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

    var self = this;

    this.bindInputToProperty("period", "period");

    this.on("change:period", function(){
      clearTimeout(this.timeoutId);
      this.tick();
    });

    this.tick();
  },

  tick: function() {

    if (!this.get("running")) return;

    var self = this;
    this.timeoutId = setTimeout(function(){
      self.sendMessage({ output: true });
      self.tick();
    }, this.get("period"));
  }

});
