define(['backbone'], function (Backbone) {
  return Backbone.Model.extend({

    defaults:{
      originTerminalId:null,
      destinationTerminalId:null
    },

    getOriginModel:function () {
      var o = this.get("originTerminalId");
      return(this.get("autograph").Terminals.get(o));
    },
    getDestinationModel:function () {
      var d = this.get("destinationTerminalId");
      if (d) {
        return(this.get("autograph").Terminals.get(d));
      }
      else {
        return(cursorModel);
      }
    }

  });
});


