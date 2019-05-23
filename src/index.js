import { env } from "connection";
import { helpers } from "helpers";
import { Middleware } from "middleware";
import { tagQueryMap } from "tagQueryMap";
import { RenderEngine } from "renderEngine";
import { Paginator } from "components/paginator";
import { RequestProcessor } from "requestProcessor";
import { ListComponent } from "components/listVideoComponent";
import { SearchComponent } from "components/searchComponent";
import { VideoPlayerComponent } from "components/videoPlayerComponent";
window.onload = function() {
  var listElements = document.querySelectorAll(`[${tagQueryMap["list"].raw}]`);
  var players = document.querySelectorAll(`[${tagQueryMap["player"].raw}]`);
  var searchBtnList = document.querySelectorAll(
    `[${tagQueryMap["searchBtn"].raw}]`
  );
  var tagList = document.querySelectorAll(`[${tagQueryMap["tags"].raw}]`);

  var templateList = { list: {}, paginators: {} };
  if (!listElements.length && !players.length) {
    return;
  }

  helpers.tagQueryMap = tagQueryMap;
  var deps = {
    tagQueryMap: tagQueryMap,
    helpers: helpers,
    templateList: templateList,
    env: env
  };
  var middleware = new Middleware(deps);
  var requestProcessor = new RequestProcessor(deps);
  var renderEngine = new RenderEngine(deps);
  var listComponent = new ListComponent(
    requestProcessor,
    middleware,
    Paginator,
    renderEngine,
    deps
  );
  var videoPlayerComponent = new VideoPlayerComponent(
    requestProcessor,
    renderEngine,
    middleware,
    helpers,
    deps
  );

  var searchComponent = new SearchComponent(listComponent, deps);

  listElements.forEach(element => {
    middleware.preRenderActions({ element: element }, "list");
    var label = helpers.actions.getLabel(element, "list");
    templateList = helpers.actions.savePaginatorTemplate(label, templateList);
    listComponent.listVideos(label);
  });

  players.forEach(element => {
    videoPlayerComponent.playVideo(element);
  });

  searchBtnList.forEach(searchBtnElement => {
    searchComponent.prepareSearchEvent(searchBtnElement);
  });

  //Tags to be added later
  // tagList.forEach(element => {
  //   middleware.preRenderActions({ element: element }, "tags");
  //   var label = helpers.actions.getLabel(element, "tags");
  //   listTags(label);
  // });
};
