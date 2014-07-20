var expect = chai.expect;

describe('Value Component', function () {

    var buttonComponent = {
        "name": "button",
        "model": "ButtonComponent",
        "view": "ButtonComponentView"
    }, loadedButton, button;

    var valueComponent = {
        "name": "value",
        "model": "ValueComponent",
        "view": "ValueComponentView"
    }, loadedValue, value;


    before(function () {

    });

    describe('creates a value component', function () {

        before(function (ready) {

            var loading = [
                a.componentLibrary.loadComponentClasses(valueComponent),
                a.componentLibrary.loadComponentClasses(buttonComponent)
            ];

            Q.all(loading).spread(function (v, b) {
                loadedValue = v;
                loadedButton = b;
                ready();
            });
        });

        it('sets text input from value', function () {

            var button = a.placeNewModel(loadedButton.modelClass, loadedButton.viewClass, {x: 370, y: 260});
            var value = a.placeNewModel(loadedValue.modelClass, loadedValue.viewClass, {x: 450, y: 280});

            var origin = button.model.outputs['output'].model;
            var destination = value.model.inputs['input'].model;

            a.terminalMouseDown(origin);
            var newWire = a.placeNewWire(origin.cid, destination.cid);
            a.clearCursorMode();


        });

    });


});



