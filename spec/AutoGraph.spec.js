describe("AutoGraph", function () {

  beforeEach(function () {

    var flag = false, self = this;

    runs(function(){
      require(["../build/autograph-min"], function (AutoGraph) {
        self.autograph = AutoGraph('container', 'components.js', "../");
        flag = true;
      });
    });

    waitsFor(function () {
      return flag;
    });
  });

  it("instantiates an object", function () {

    expect(self.autograph).not.toEqual(null);

  });

});

