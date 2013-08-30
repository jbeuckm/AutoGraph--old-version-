var expect = chai.expect;

describe('AutoGraph', function() {

  it('should define the var autograph', function() {
    expect(autograph).to.not.equal(null);
  });

  it('can instantiate a BaseComponent', function(){
    var bc = new BaseComponent();
    expect(bc).to.not.equal(null);
  });

});



