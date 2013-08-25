var DelayComponent = BaseComponent.extend({

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
    name: "delay",
    period: 500
  },

  initialize: function() {
    BaseComponent.prototype.initialize.call(this);
  },

  receiveMessage: function(message) {
    var self = this;
    setTimeout(function(){
      self.sendMessage({output: message});
    }, this.get("period"));
  }

});
