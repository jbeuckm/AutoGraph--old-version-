
require(['autograph'], function (AutoGraph) {
  var a = autograph('container', 'components.json', '../');

  describe('AutoGraph', function() {

      it('should run a trivial test', function() {

        chai.expect('hello').to.be.a('string');
      });


//    chai.assert.notEqual(1, null, "autograph not defined");

  });
});



