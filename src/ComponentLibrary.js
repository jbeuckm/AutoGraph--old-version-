/**
 * @module ComponentLibrary
 */
define(['jquery', 'components/models/BaseComponent', 'components/views/BaseComponentView', 'components/views/WebviewComponentView'],
    function ($, BaseComponent, BaseComponentView, WebviewComponentView) {

        /**
         * Manage available components.
         * @class ComponentLibrary
         */
        return function (container, components, componentPath, selectCallback) {

            var self = this;

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
                    selectCallback(d3.select(d3.event.target).datum());
                });
            });


            var classRegistry = {};

            function getClass(className, path, callback) {
                if (classRegistry[className]) {
                    callback(classRegistry[className]);
                }
                else {
                    $.get(path, function (str) {
                        eval(str);
                        classRegistry[className] = eval(className);
                        callback(classRegistry[className]);
                    });
                }
            }

            /**
             * @method
             * @param componentDescription
             * @param callback
             */
            self.loadComponentClasses = function (componentDescription, callback) {

                var modelClass = componentDescription.model;
                var viewClass = componentDescription.view;
                var fullpath = componentDescription.path || "src/components/";

                var result = {};

                getClass(modelClass, componentPath + fullpath + "models/" + modelClass + ".js?v=" + Math.random(), function (mc) {

                    result.modelClass = mc;

                    if (viewClass) {

                        getClass(viewClass, componentPath + fullpath + "views/" + viewClass + ".js?v=" + Math.random(), function (vc) {
                            result.viewClass = vc;
                            callback(result);
                        });
                    }
                    else {
                        result.viewClass = BaseComponentView;
                        callback(result);
                    }

                });
            };

        };

    });
