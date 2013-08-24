var DelayComponent = BaseComponent.extend({

  defaults: {
    name: "delay",

    period: 500,

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
    }
  },

  receiveMessage: function(message) {
    var self = this;
    setTimeout(function(){
      self.sendOutputs(message);
    }, this.get("period"));
  }

});
