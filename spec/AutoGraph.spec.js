var r = require('requirejs');

r.define(["src/AutoGraph"], function (AutoGraph) {

  describe("AutoGraph", function () {


    it("instantiates an object", function () {

      var a = AutoGraph();

      expect(a).not.toEqual(null);

    });


  });

});
