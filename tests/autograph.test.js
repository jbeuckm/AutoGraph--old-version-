var expect = chai.expect;

describe('AutoGraph', function () {

    var a;
    var baseComponent = {
        "name": "base components",
        "model": "BaseComponent",
        "view": "BaseComponentView"
    }, loadedBaseComponent;

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

    var echoComponent = {
        "name": "echo",
        "model": "EchoComponent",
        "view": "EchoComponentView"
    }, loadedEcho, echo;

    before(function () {
        a = new autograph('container', 'components.json', '../');
    });

    it('should define the var autograph', function () {
        expect(autograph).to.not.equal(null);
    });
    it('should define necessary collections', function () {
        expect(a.Components).to.not.equal(null);
        expect(a.Terminals).to.not.equal(null);
        expect(a.Wires).to.not.equal(null);
    });


    it('should select a component list item', function () {
        a.clickComponentMenuOption(buttonComponent);
        expect(a.cursorMode.component).to.equal(buttonComponent);
        a.clearCursorMode();
        expect(a.cursorMode).to.equal(null);
    });

    describe('creates a base component', function () {

        var bc;

        before(function (ready) {
            a.componentLibrary.loadComponentClasses(baseComponent, function (b) {
                loadedBaseComponent = b;
                ready();
            });
        });

        it('should add the base component to the collection', function () {
            var componentCount = a.Components.length;
            bc = a.placeNewModel(loadedBaseComponent.modelClass, loadedBaseComponent.viewClass, {x: 370, y: 10});
            expect(a.Components.length).to.equal(componentCount + 1);
        });

        it('should transmit a tick from in to out', function (done) {
            var input = bc.inputs['input'].model;
            var output = bc.outputs['output'].model;

            output.on("tick", done);
            input.receiveTick();
        });

        it('can remove a component', function () {
            var componentCount = a.Components.length;
            a.removeComponent(bc);
            expect(a.Components.length).to.equal(componentCount - 1);
        });

    });

    describe('creates components and wires', function () {

        before(function (ready) {
            a.componentLibrary.loadComponentClasses(buttonComponent, function (b) {
                loadedButton = b;
                a.componentLibrary.loadComponentClasses(valueComponent, function (v) {
                    loadedValue = v;
                    a.componentLibrary.loadComponentClasses(echoComponent, function (e) {
                        loadedEcho = e;
                        ready();
                    });
                });
            });
        });

        it('should create a wire between components', function (done) {

            var wireCount = a.Wires.length;

            button = a.placeNewModel(loadedButton.modelClass, loadedButton.viewClass, {x: 470, y: 10});

            value = a.placeNewModel(loadedValue.modelClass, loadedValue.viewClass, {x: 590, y: 60});

            var origin = button.outputs['output'].model;
            var destination = value.inputs['input'].model;
            var valueOutput = value.outputs['output'].model;

            a.terminalMouseDown(origin);
            var newWire = a.placeNewWire(origin.cid, destination.cid);
            a.clearCursorMode();

            expect(newWire).to.not.equal(null);
            expect(a.Wires.length).to.equal(wireCount + 1);

            function valueTick() {
                valueOutput.off("tick", valueTick);
                done();
            }
            valueOutput.on("tick", valueTick);
            button.receiveTick();
        });


        it('should transmit a value from the value component', function (done) {

            echo = a.placeNewModel(loadedEcho.modelClass, loadedEcho.viewClass, {x: 450, y: 130});

            var origin = value.outputs['output'].model;
            var destination = echo.inputs['value'].model;
            var echoOutput = echo.outputs['output'].model;

            a.terminalMouseDown(origin);
            a.placeNewWire(origin.cid, destination.cid);
            a.clearCursorMode();

            var testString = (new Date()).getTime();
            value.set("value", testString);

            function echoTick(){
                expect(echo.get("value")).to.equal(testString);
                echoOutput.off("tick", echoTick);
                done();
            }

            echoOutput.on("tick", echoTick);
            button.receiveTick();
        });

    });


});



