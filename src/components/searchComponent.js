class SearchComponent {
  constructor(listComponent, deps) {
    this.templateList = deps.templateList;
    this.helpers = deps.helpers;
    this.listComponent = listComponent;
  }
  prepareSearchEvent(searchBtnElement) {
    var that = this;
    searchBtnElement.onclick = function() {
      var helpers = that.helpers;
      var templateList = that.templateList;
      var listComponent = that.listComponent;

      var listLabel = this.dataset.aweSearchBtn;
      var template = templateList.list[listLabel].template.innerHTML;
      templateList.list[listLabel].element.dataset.pageIndex = 1;
      var filterList = templateList.list[listLabel].element.dataset;
      var element = helpers.actions.getElement(listLabel, "searchInp");
      if (!element) {
        throw `Sorry but it looks like you don't have a search box in place for search ie: <input data-awe-search="popular" />`;
      }
      var searchWords = element.value;
      filterList.tags =
        searchWords.split(" ").length == 2
          ? searchWords
          : searchWords.replace(/ /g, ",");
      listComponent.listVideos(
        listLabel,
        {
          filterList: filterList
        },
        template
      );
    };
  }
}

export { SearchComponent };
