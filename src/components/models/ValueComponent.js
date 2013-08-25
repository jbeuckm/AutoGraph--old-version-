
var ValueComponent = BaseComponent.extend({

  label: "value",

  inputs: {
    value: {
      name: "value",
      description: "Set the value of the component."
    }
  },
  outputs: {
    output: {name: "output"}
  },

  defaults: {
    value: 100
  },

  initialize: function() {
    BaseComponent.prototype.initialize.call(this);

    this.listenTo(this, "change:value", function(){
      this.outputs.output.model.set("value", this.get("value"));
    });
  },

  process:function (args, callback) {
    callback( { input: args, output: this.get("value") } );
  }

});
