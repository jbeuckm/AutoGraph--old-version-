var expect = chai.expect;

describe('HTTPClient', function () {

    var a;
    var HTTPClientComponent = {
        "name": "base components",
        "model": "HTTPClientComponent",
        "view": "HTTPClientComponentView"
    };
    var loadedComponent;


    before(function () {
        a = new autograph('container', 'components.json', '../');
    });

    describe('creates an http component', function () {

        before(function (ready) {
            a.componentLibrary.loadComponentClasses(HTTPClientComponent, function (c) {
                loadedComponent = c;
                ready();
            });
        });

        xit('makes an http request', function (done) {

            var value = a.placeNewModel(loadedValue.modelClass, loadedValue.viewClass, {x: 590, y: 60});

            var http = a.placeNewModel(loadedComponent.modelClass, loadedComponent.viewClass, {x: 380, y: 230});

            var origin = value.outputs['output'].model;
            var destination = http.inputs['host'].model;
            var statusOutput = http.outputs['status'].model;

            a.terminalMouseDown(origin);
            var newWire = a.placeNewWire(origin.cid, destination.cid);
            a.clearCursorMode();

            statusOutput.on("bang", done);
            http.receiveBang();
        });

    });


});



