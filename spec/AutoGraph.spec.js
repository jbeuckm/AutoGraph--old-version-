var jsdom = require("jsdom");
//window = jsdom.jsdom('<html><head></head><body></body></html>').createWindow();

describe("AutoGraph works", function () {

    var flag = false;

    beforeEach(function () {

/*
    jsdom.env('<html><body></body></html>',
      ["http://code.jquery.com/jquery.js"],
      function (errors, win) {

*/
          window = jsdom.jsdom().createWindow('<html><head></head><body></body></html>');

          console.log("got window "+window+" now loading module");

          require(["../src/main"], function(a) {
console.log("autograph = "+window.autograph);
              flag = true;
          });
/*
      }
    );
*/
    waitsFor(function() {
      return flag;
    }, "autograph module never loaded", 5000);

  });

  it("finds the module", function () {
console.log("window.autograph = "+window.autograph);
    expect(window.autograph).not.toEqual(null);

  });

});

