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

            var button = a.placeNewComponent(loadedButton.modelClass, loadedButton.viewClass, {x: 370, y: 260});
            var value = a.placeNewComponent(loadedValue.modelClass, loadedValue.viewClass, {x: 460, y: 280});
            console.log(a.Components.toJSON());
//            console.log(a.Terminals.toJSON());
//            console.log(a.Wires.toJSON());
            var value2 = a.placeNewComponent(loadedValue.modelClass, loadedValue.viewClass, {x: 610, y: 280});
            console.log(a.Components.toJSON());

            console.log(value.model.toJSON());
            console.log(value2.model.toJSON());

            var origin = button.model.outputs['output'].model;
            var destination = value.model.inputs['input'].model;

            a.terminalMouseDown(origin);
            a.placeNewWire(origin.cid, destination.cid);
            a.clearCursorMode();

            var testString = "123";
            value.model.set("value", testString);
            expect(value.view.textField.node().value).to.equal(testString);
        });

    });


});



