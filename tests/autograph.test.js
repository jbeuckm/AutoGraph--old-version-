

describe('AutoGraph', function() {

    it('should run a trivial test', function() {

      require(['autograph'], function (AutoGraph) {
        var a = autograph('container', 'components.json', '../');

        chai.expect('hello').to.be.a('string');
      });

    });

});



