/**
 * @module ComponentLibrary
 */
define(['jquery', 'q', 'components/models/BaseComponent', 'components/views/BaseComponentView', 'components/views/WebviewComponentView'],
    function ($, Q, BaseComponent, BaseComponentView, WebviewComponentView) {

        /**
         * Manage available components.
         * @class ComponentLibrary
         */
        return function (container, components, componentPath, selectCallback) {

            var self = this;

            /**
             *
             * @type {*}
             */
            self.componentList = container.append("div").attr("class", "component-list");


            d3.json(componentPath + components, function (components) {
                for (var i = 0, l = components.length; i < l; i++) {

                    var componentDescription = components[i];

                    self.componentList.append("div")
                        .attr("class", "component-option")
                        .attr("id", componentDescription.name)
                        .datum(componentDescription)
                        .text(componentDescription.name);

                }
                d3.selectAll(".component-option").on("click", function () {
                    var componentDescription = d3.select(d3.event.target).datum();
                    selectCallback(componentDescription);
                });
            });


            var classRegistry = {};

            function getClass(className, path) {

                var def = Q.defer();

                if (classRegistry[className]) {
                    def.resolve(classRegistry[className]);
                }
                else {
                    $.get(path, function (str) {
                        eval(str);
                        classRegistry[className] = eval(className);
                        def.resolve(classRegistry[className]);
                    }, 'text')
                        .fail(function(err){
                            console.log('ERROR LOADING COMPONENT '+className);
                            def.reject(path);
                        });
                }

                return def.promise;
            }

            /**
             * @method
             * @param componentDescription
             * @param callback
             */
            self.loadComponentClasses = function (componentDescription) {

                var modelClass = componentDescription.model;
                var viewClass = componentDescription.view;
                var fullpath = componentDescription.path || "src/components/";

                var def = Q.defer();

                var loading = [];

                loading.push(getClass(modelClass, componentPath + fullpath + "models/" + modelClass + ".js?v=" + Math.random()));
                if (viewClass) {
                    loading.push(getClass(viewClass, componentPath + fullpath + "views/" + viewClass + ".js?v=" + Math.random()));
                }

                Q.all(loading).spread(function(){

                    result = {
                        modelClass: arguments[0],
                        viewClass: arguments[1]
                    };

                    def.resolve(result);

                });

                return def.promise;
            };

        };

    });
