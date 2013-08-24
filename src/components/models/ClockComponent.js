var ClockComponent = BaseComponent.extend({

  defaults: {
    name: "clock",

    period: 1000,
    ticking: true,

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
    this.tick();
  },

  tick: function() {
    var self = this;
    var id = setTimeout(function(){
      self.sendMessage({ output: true });
      self.tick();
    }, this.get("period"));
    this.set("timeoutId", id);
  }

});
