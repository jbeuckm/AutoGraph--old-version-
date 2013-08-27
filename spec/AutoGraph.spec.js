describe("AutoGraph", function () {
/*
  beforeEach(function () {

    console.log('flag');
    var flag = false;

    require(["../build/autograph-min"], function (AutoGraph) {
      window.autograph = AutoGraph('container', 'components.js', "../");
      flag = true;
    });

    waitsFor(function () {
      return flag;
    });
  });
*/
  it("instantiates an object", function () {

    expect(window.autograph).not.toEqual(null);

  });

});

