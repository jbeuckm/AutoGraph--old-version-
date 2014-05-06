/**
 * Implement the logic of an AutoGraph component
 */
define(['models/PositionedModel', 'models/OutputTerminalModel', 'models/InputTerminalModel'],
  function (PositionedModel, OutputTerminalModel, InputTerminalModel) {

    return PositionedModel.extend({

      label:"component",

      inputs:{
        input:{name:"input"}
      },
      outputs:{
        output:{name:"output"}
      },

      defaults:{
      },

      initialize:function () {
        this.buildInputs(this.inputs);
        this.buildOutputs(this.outputs);
      },

      receiveBang:function () {
        var inputTerminalValues = this.readInputValues();
        var self = this;

        this.process(inputTerminalValues, function (results) {

          console.log("process results for "+self.label);
          console.log(results);

          self.updateOutputTerminals(results);
          self.sendBang();
        });
      },

      readInputValues:function () {

        var ins = {};
        for (var key in this.inputs) {
          var input = this.inputs[key].model;
          if (input.get("value")) {
            ins[key] = input.get("value");
          }
        }
        return ins;
      },

      updateOutputTerminals:function (values) {

        for (var key in values) {
          var output = this.outputs[key];
          if (output) {
            output.model.set("value", values[key]);
          }
        }
      },

      process:function (args, callback) {
        callback(args);
      },

      sendBang:function () {
        this.trigger("bang");
      },


      buildInputs:function (inputs) {

        var cnt = 0;
        for (var i in inputs) {

          var input = inputs[i];

          var im = new InputTerminalModel({
            autograph:this.get("autograph"),
            component:this,
            x:cnt * 20,
            y:0,
            name:input.name
          });

          this.listenTo(im, "bang", this.receiveBang);
          this.listenTo(im, "change:value", function () {
            console.log("basecomp setting " + input.name + " to " + im.get("value"));
            this.set(input.name, im.get("value"))
          });

          input.model = im;

          this.get("autograph").Terminals.add(im);

          cnt++;
        }
      },

      buildOutputs:function (outputs) {

        var cnt = 0;
        for (var i in outputs) {

          var output = outputs[i];

          var om = new OutputTerminalModel({
            autograph:this.get("autograph"),
            component:this,
            x:cnt * 20,
            y:0,
            name:output.name
          });

          output.model = om;

          this.get("autograph").Terminals.add(om);

          cnt++;
        }
      }

    });

  });


