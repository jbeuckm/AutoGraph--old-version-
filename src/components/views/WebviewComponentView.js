/**
 * @module WebviewComponentView
 */
define(['components/views/BaseComponentView'],
  function (BaseComponentView) {

    /**
     * @class WebviewComponentView
     */
    return BaseComponentView.extend({

      /**
       * @method
       */
      addContent:function () {

        this.htmlHolder = this.content.append("foreignObject");

        this.htmlBody = this.htmlHolder.append("xhtml:body")
          .attr('xmlns', 'http://www.w3.org/1999/xhtml');

      }

    });
  }
);


