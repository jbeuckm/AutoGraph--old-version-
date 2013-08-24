define(['models/TerminalModel'], function(TerminalModel){

  return Backbone.Collection.extend({
    model: TerminalModel
  });
});
