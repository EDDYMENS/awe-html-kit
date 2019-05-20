//actions to preform before rendering
class Middleware {
  constructor(deps) {
    this.tagQueryMap = deps.tagQueryMap;
    this.templateList = deps.templateList;
    this.helpers = deps.helpers;
  }
  preRenderActions(payload, componentType) {
    var templateList = this.templateList;
    var helpers = this.helpers;
    var label =
      payload.element.dataset[this.tagQueryMap[componentType].refined];
    if (!label) {
      throw 'Sorry but you need to label your list template eg: `data-awe-list="popular"`';
    }
    label = label.toLowerCase();
    if (!templateList.list[label]) {
      templateList.list[label.toLowerCase()] = {
        element: payload.element,
        template: payload.element.cloneNode(true),
        data: payload.data
      };
    }
    helpers.actions.showLoader(label);
    helpers.actions.hidePaginator(label);
    helpers.styles.hideElement(payload.element);
  }

  //actions to preform after rendering
  postRenderActions(payload) {
    var helpers = this.helpers;
    helpers.actions.removeLoader(payload.loaderLabel);
    helpers.actions.showPaginator(payload.loaderLabel);
    helpers.styles.showElement(payload.element);
  }
}
export { Middleware };
