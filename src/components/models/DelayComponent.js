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

  receiveMessage: function(message) {
    var self = this;
    setTimeout(function(){
      self.sendMessage({output: message});
    }, this.get("period"));
  }

});
