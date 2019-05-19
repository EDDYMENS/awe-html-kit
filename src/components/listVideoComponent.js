class ListComponent {
  constructor(requestProcessor, middleware, paginator, renderEngine, deps) {
    this.templateList = deps.templateList;
    this.helpers = deps.helpers;
    this.requestProcessor = requestProcessor;
    this.middleware = middleware;
    this.renderEngine = renderEngine;
    this.paginator = new paginator(this, deps);
  }
  listVideos(label, options, template) {
    var helpers = this.helpers;
    var templateList = this.templateList;
    var middleware = this.middleware;
    var paginator = this.paginator;
    var urlVideoTags = helpers.actions.getUrlParam("videoTags");
    options = options ? options : {};
    var element = templateList.list[label].element;
    if (!element) {
      throw `Sorry but no element was found with for the label ${label}`;
    }
    var action = "list";
    var pagination = options.pagination;
    delete options.pagination;
    var filterList = options.filterList ? options.filterList : element.dataset;

    if (urlVideoTags) {
      filterList.tags =
        filterList.tags && filterList.tags.length
          ? filterList.tags + "," + urlVideoTags
          : (filterList.tags = urlVideoTags);
    }
    var query = {};
    middleware.preRenderActions({ element: element }, action);
    var that = this;
    var renderVids = function(videoList, filterList, template) {
      that.renderEngine.render(element, videoList, template);
      middleware.postRenderActions({
        element: element,
        loaderLabel: filterList.aweList
      });
    };
    if (options.videoList) {
      paginator.render(label, options.pagination, filterList);
      return renderVids(videoList, filterList, template);
    }
    this.requestProcessor.processor(action, filterList, function(response) {
      var videoList = response.data.videos;
      paginator.render(label, response.data.pagination, filterList);
      renderVids(videoList, filterList, template);
    });
  }
}

export { ListComponent };
