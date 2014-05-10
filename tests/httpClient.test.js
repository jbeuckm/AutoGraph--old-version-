var expect = chai.expect;

describe('HTTPClient', function() {

  var a;
  var HTTPClientComponent = {
    "name": "base components",
    "model": "HTTPClientComponent",
    "view": "HTTPClientComponentView"
  };
  var loadedComponent;


  before(function(){
    a = new autograph('container', 'components.json', '../');
  });

  describe('creates an http component', function(){

    before(function(ready){
      a.componentLibrary.loadComponentClasses(HTTPClientComponent, function(c){
        loadedComponent = c;
        ready();
      });
    });

    xit('makes an http request', function(done) {

      var http = a.placeNewModel(loadedComponent.modelClass, loadedComponent.viewClass, {x:380, y:230});

      var statusOutput = http.outputs['status'].model;

      statusOutput.on("bang", done);
      http.receiveBang();
    });

  });


});



