var expect = chai.expect;

describe('AutoGraph', function() {

  it('should define the var autograph', function() {
    expect(autograph).to.not.equal(null);
    expect(autograph.getClass).to.not.equal(null);
  });

  it('can instantiate a BaseComponent', function(){
    autograph.getClass('BaseComponent', "../src/components/", function(bc){
      expect(bc).to.not.equal(null);
    });
//    var bc = new BaseComponent();
  });

});



