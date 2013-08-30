var expect = chai.expect;

describe('AutoGraph', function() {

  var a;

  before(function(){
    a = new autograph('container', 'components.json', '../');
  });

  it('should define the var autograph', function() {
    expect(autograph).to.not.equal(null);
  });
  it('should define a wires collection', function() {
      expect(a.Wires).to.not.equal(null);
  });


  it('should select a component list item', function() {
    var componentDescription = {
      "name": "button",
      "model": "ButtonComponent",
      "view": "ButtonComponentView"
    };
    a.clickComponentMenuOption(componentDescription);
    expect(a.cursorMode.component).to.equal(componentDescription);

    $('svg').trigger("mouseup", {clientX:100, clientY:100});
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



