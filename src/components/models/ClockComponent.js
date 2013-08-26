var ClockComponent = BaseComponent.extend({

  label: "clock",

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

  receiveBang:function () {
    if (this.get("running")) {
      this.set("running", false);
    }
    else {
      this.set("running", true);
      this.tick();
    }
  },


  tick: function() {
    var self = this;
    this.timeoutId = setTimeout(function(){
      if (self.get("running")) {
        self.sendBang();
        self.tick();
      }
    }, this.get("period"));
  }

});
