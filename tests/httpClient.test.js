var expect = chai.expect;

describe('HTTPClient', function () {

    var HTTPClientComponent = {
        "name": "base components",
        "model": "HTTPClientComponent",
        "view": "HTTPClientComponentView"
    };
    var loadedHttp, http;

    var valueComponent = {
        "name": "value",
        "model": "ValueComponent",
        "view": "ValueComponentView"
    }, loadedValue, value;


    before(function () {

    });

    describe('creates an http component', function () {

        before(function (ready) {

            var loading = [
                a.componentLibrary.loadComponentClasses(HTTPClientComponent),
                a.componentLibrary.loadComponentClasses(valueComponent)
            ];

            Q.all(loading).spread(function (c, v) {
                loadedHttp = c;
                loadedValue = v;
                ready();
            });
        });

        xit('makes an http request', function (done) {

            var value = a.placeNewModel(loadedValue.modelClass, loadedValue.viewClass, {x: 590, y: 60});

            var http = a.placeNewModel(loadedHttp.modelClass, loadedHttp.viewClass, {x: 380, y: 230});

            var origin = value.outputs['output'].model;
            var destination = http.inputs['host'].model;
            var statusOutput = http.outputs['status'].model;

            a.terminalMouseDown(origin);
            a.placeNewWire(origin.cid, destination.cid);
            a.clearCursorMode();

            statusOutput.on("tick", done);
            http.receiveTick();
        });

    });


});



