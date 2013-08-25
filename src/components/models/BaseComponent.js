define(['models/PositionedModel', 'models/OutputTerminalModel', 'models/InputTerminalModel'],
  function (PositionedModel, OutputTerminalModel, InputTerminalModel) {

    return PositionedModel.extend({

      inputs:{
        input1:{name:"input1"},
        input2:{name:"input2"}
      },
      outputs:{
        output1:{name:"output1"},
        output2:{name:"output2"}
      },

      defaults:{
        name:"component",
      },

      initialize:function () {
        this.buildInputs(this.inputs);
        this.buildOutputs(this.outputs);
      },

      receiveMessage:function (message) {

//        var messageFromInput = this.readInputValues(message);

        var results = this.process(message);
        this.sendMessage(results);
      },

      readInputValues:function () {
        return [true];
      },

      process:function (args) {
        return [true];
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


