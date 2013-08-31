define(['jquery', 'components/models/BaseComponent', 'components/views/BaseComponentView', 'components/views/WebviewComponentView'],
  function($, BaseComponent, BaseComponentView, WebviewComponentView){

  return function(componentPath) {

    var self = this;

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


    self.loadComponentClasses = function(componentDescription, callback) {

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
