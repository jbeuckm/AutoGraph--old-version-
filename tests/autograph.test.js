var expect = chai.expect;

describe('AutoGraph', function() {

  var a;
  var buttonComponent = {
    "name": "button",
    "model": "ButtonComponent",
    "view": "ButtonComponentView"
  };
  var loadedButton;
  var valueComponent = {
    "name": "value",
    "model": "ValueComponent",
    "view": "ValueComponentView"
  };
  var loadedValue;

  before(function(){
    a = new autograph('container', 'components.json', '../');
  });

  it('should define the var autograph', function() {
    expect(autograph).to.not.equal(null);
  });
  it('should define necessary collections', function() {
    expect(a.Components).to.not.equal(null);
    expect(a.Terminals).to.not.equal(null);
    expect(a.Wires).to.not.equal(null);
  });


  it('should select a component list item', function() {
    a.clickComponentMenuOption(buttonComponent);
    expect(a.cursorMode.component).to.equal(buttonComponent);
    a.clearCursorMode();
    expect(a.cursorMode).to.equal(null);
  });


  describe('creates components and wires', function(){

    before(function(ready){
      a.componentLibrary.loadComponentClasses(buttonComponent, function(b){
        loadedButton = b;
        a.componentLibrary.loadComponentClasses(valueComponent, function(v){
          loadedValue = v;
          ready();
        });

      });
    });

    it('should create a wire between components', function() {

      var wireCount = a.Wires.length;

      var button = a.placeNewModel(loadedButton.modelClass, loadedButton.viewClass, {x:370, y:30});

      var value = a.placeNewModel(loadedValue.modelClass, loadedValue.viewClass, {x:440, y:30});

      var origin = button.outputs['output'].model;
      var destination = value.inputs['input'].model;

      a.terminalMouseDown(origin);
      var newWire = a.placeNewWire(origin.cid, destination.cid);

      expect(newWire).to.not.equal(null);
      expect(a.Wires.length).to.equal(wireCount + 1);
    });

  });


});



