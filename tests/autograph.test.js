
require(['autograph'], function (AutoGraph) {
  var a = autograph('container', 'components.json', '../');

  chai.expect('hello').to.be.a('string');
  chai.assert.notEqual(1, null, "autograph not defined");

});



