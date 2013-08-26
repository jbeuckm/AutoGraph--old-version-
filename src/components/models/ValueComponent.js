
var ValueComponent = BaseComponent.extend({

  label: "value",

  inputs: {
    input: {
      name: "input",
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

    this.listenTo(this.inputs.input.model, "change:value", function(){
      this.set("value", this.inputs.input.model.get("value"));
    });

    this.listenTo(this, "change:value", function(){
      this.outputs.output.model.set("value", this.get("value"));
    });

    this.outputs.output.model.set("value", this.get("value"));
  }


});
