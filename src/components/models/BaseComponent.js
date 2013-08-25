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

      receiveMessage:function (message) {

        var messageFromInputs = this.readInputValues(message);

        var self = this;

        this.process(messageFromInputs, function(results){
          self.sendMessage(results);
        });
      },

      readInputValues:function () {
        var ins = {};
        for (var key in this.inputs) {
          var input = this.inputs[key].model;
          ins[key] = input.get("value");
        }
        return ins;
      },

      process:function (args, callback) {
        callback( { input: args, output: args } );
      },

      sendMessage:function (message) {
        this.trigger("message", message);
      },

      sendValue:function (value) {
        this.trigger("value", value);
      },

      getInputTerminalModel: function(name) {
        return this.inputs[name].model;
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

          this.listenTo(im, "message", this.receiveMessage);
          this.listenTo(im, "value", function(){
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


