var expect = chai.expect;

describe('AutoGraph', function() {

  var a;

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
    var buttonComponent = {
      "name": "button",
      "model": "ButtonComponent",
      "view": "ButtonComponentView"
    };
    a.clickComponentMenuOption(buttonComponent);
    expect(a.cursorMode.component).to.equal(buttonComponent);
    a.placeNewModel(a.cursorMode, {x:360, y:30});
    a.clearCursorMode();

    var valueComponent = {
      "name": "value",
      "model": "ValueComponent",
      "view": "ValueComponentView"
    };
    a.clickComponentMenuOption(valueComponent);
    a.placeNewModel(a.cursorMode, {x:440, y:30});
    a.clearCursorMode();

  });

  /*
    it('can instantiate a BaseComponent', function(){
      autograph.getClass('BaseComponent', "../src/components/", function(bc){
        expect(bc).to.not.equal(null);
      });
  //    var bc = new BaseComponent();
    });
  */
});



