define(['models/PositionedModel'],
  function (PositionedModel) {
    return PositionedModel.extend({

      defaults:{
        name:"terminal",
        componentId:null,

        anchorX:0,
        anchorY:0,
        controlPointX:0,
        controlPointY:0
      },

      initialize:function () {
        this.set("componentId", this.get("component").cid);
      }

    });
});

