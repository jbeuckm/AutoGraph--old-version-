define([], function() {
    return function() {

        this.save = function(autograph) {
            var componentsString = JSON.stringify(autograph.Components.toJSON());
            localStorage['components'] = componentsString;
        };

        this.load = function(autograph) {
            var componentsString = localStorage['components'];
            var components = JSON.parse(componentsString);
            autograph.Components.set(components);
        }
    };
});
