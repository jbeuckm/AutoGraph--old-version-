window = require('jsdom').jsdom('<html><head></head><body></body></html>').createWindow();

describe("AutoGraph", function () {

  beforeEach(function () {

    var flag = false, self = this;
    console.log('hi');

    require(["../build/autograph-min"], function(AutoGraph) {
      self.autograph = AutoGraph;
      flag = true;
      return 1;
    });
    console.log('hi');

    waitsFor(function () {
      return flag;
    }, "autograph module never loaded", 5000);

  });

  it("instantiates an object", function () {

    expect(this.autograph).not.toEqual(null);

  });

});

