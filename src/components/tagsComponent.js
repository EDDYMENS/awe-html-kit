function listTags(label, options, template) {
  options = options ? options : {};
  var element = templateList.list[label].element;
  if (!element) {
    throw `Sorry but no element was found with for the label ${label}`;
  }
  var action = "tags";
  var filterList = options.filterList ? options.filterList : element.dataset;
  var query = {};
  middleware.preRenderActions({ element: element }, action);
  var resizeTagList = function(tagList, size) {
    return helpers.actions.getRandomArr(tagList, size);
  };
  var renderVids = function(tagList, filterList, template) {
    var size = filterList.limit ? filterList.limit : tagList.length;
    tagList = resizeTagList(tagList, size);
    renderEngine.render(element, tagList, template);
    middleware.postRenderActions({
      element: element,
      loaderLabel: filterList.aweTags
    });
  };
  if (options.tagList) {
    return renderVids(options.tagList, filterList, template);
  }
  requestProcessor.processor(action, filterList, function(response) {
    var tagList = response.data.tags;
    renderVids(tagList, filterList, template);
  });
}

export { listTags };
