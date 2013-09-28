var expect = chai.expect;

describe('AutoGraph', function() {

  var a;
  var baseComponent = {
    "name": "base components",
    "model": "BaseComponent",
    "view": "BaseComponentView"
  };
  var loadedBaseComponent;

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

  describe('creates a base component', function() {

    var bc;

    before(function(ready){
      a.componentLibrary.loadComponentClasses(baseComponent, function(b){
        loadedBaseComponent = b;
        ready();
      });
    });

    it('should add the base component to the collection', function() {
      var componentCount = a.Components.length;
      bc = a.placeNewModel(loadedBaseComponent.modelClass, loadedBaseComponent.viewClass, {x:370, y:10});
      expect(a.Components.length).to.equal(componentCount + 1);
    });

    it('should transmit a bang from in to out', function(done) {
      var input = bc.inputs['input'].model;
      var output = bc.outputs['output'].model;

      output.on("bang", done);
      input.receiveBang();
    });

    it('can remove a component', function() {
      var componentCount = a.Components.length;
      a.removeComponent(bc);
      expect(a.Components.length).to.equal(componentCount - 1);
    });

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

    it('should create a wire between components', function(done) {

      var wireCount = a.Wires.length;

      var button = a.placeNewModel(loadedButton.modelClass, loadedButton.viewClass, {x:470, y:10});

      var value = a.placeNewModel(loadedValue.modelClass, loadedValue.viewClass, {x:590, y:60});

      var origin = button.outputs['output'].model;
      var destination = value.inputs['input'].model;
      var valueOutput = value.outputs['output'].model;

      a.terminalMouseDown(origin);
      var newWire = a.placeNewWire(origin.cid, destination.cid);
      a.clearCursorMode();

      expect(newWire).to.not.equal(null);
      expect(a.Wires.length).to.equal(wireCount + 1);

      valueOutput.on("bang", done);
      button.receiveBang();
    });

  });


});



