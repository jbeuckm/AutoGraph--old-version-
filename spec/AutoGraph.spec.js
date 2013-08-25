define(["AutoGraph"], function (AutoGraph) {

  initBackbone();

  describe("AutoGraph", function () {
    it("instantiates an object", function () {

      var a = AutoGraph();
      expect(a).not.toEqual(null);

    });
  });

});
