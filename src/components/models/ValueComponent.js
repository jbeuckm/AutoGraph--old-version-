
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

    this.outputs.output.model.set("value", this.get("value"));

    this.listenTo(this, "change:value", function(){
      this.outputs.output.model.set("value", this.get("value"));
    });
  }


});
