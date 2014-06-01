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
    }, loadedEcho, echo, echo2;

    var testString;

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
            a.componentLibrary.loadComponentClasses(baseComponent).then(function (b) {
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
            a.componentLibrary.loadComponentClasses(buttonComponent).then(function (b) {
                loadedButton = b;
                a.componentLibrary.loadComponentClasses(valueComponent).then(function (v) {
                    loadedValue = v;
                    a.componentLibrary.loadComponentClasses(echoComponent).then(function (e) {
                        loadedEcho = e;
                        ready();
                    });
                });
            });
        });

        it('should create a wire between components', function (done) {

            var wireCount = a.Wires.length;

            button = a.placeNewModel(loadedButton.modelClass, loadedButton.viewClass, {x: 470, y: 10});

            value = a.placeNewModel(loadedValue.modelClass, loadedValue.viewClass, {x: 590, y: 65});

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

            echo = a.placeNewModel(loadedEcho.modelClass, loadedEcho.viewClass, {x: 480, y: 130});

            var origin = value.outputs['output'].model;
            var destination = echo.inputs['value'].model;
            var echoOutput = echo.outputs['output'].model;

            testString = (new Date()).getTime();
            value.set("value", testString);

            a.terminalMouseDown(origin);
            a.placeNewWire(origin.cid, destination.cid);
            a.clearCursorMode();

            function echoTick(){
                expect(echo.get("value")).to.equal(testString);
                echoOutput.off("tick", echoTick);
                done();
            }

            echoOutput.on("tick", echoTick);
            button.receiveTick();
        });


        it('should transmit a value to multiple recipients', function (done) {

            echo2 = a.placeNewModel(loadedEcho.modelClass, loadedEcho.viewClass, {x: 720, y: 130});

            var origin = value.outputs['output'].model;
            var destination = echo2.inputs['value'].model;
            var echo2Output = echo2.outputs['output'].model;

            a.terminalMouseDown(origin);
            a.placeNewWire(origin.cid, destination.cid);
            a.clearCursorMode();

            function echoTick(){
                echo2Output.off("tick", echoTick);

                expect(echo.get("value")).to.equal(testString);
                expect(echo2.get("value")).to.equal(testString);

                done();
            }

            echo2Output.on("tick", echoTick);
            button.receiveTick();
        });

    });


});



