class Paginator {
  constructor(listComponent, deps) {
    this.tagQueryMap = deps.tagQueryMap;
    this.helpers = deps.helpers;
    this.templateList = deps.templateList;
    this.listVideos = listComponent.listVideos;
    this.listComponent = listComponent;
  }
  render(label, pageData, filterList) {
    if (!this.templateList.paginators[label]) {
      return;
    }
    var templateList = this.templateList;
    var element = templateList.paginators[label].element;
    var pagertemplate = templateList.paginators[label].template;
    var pagerLength = element.dataset.pagerLength;
    var paginatorSize = pagerLength ? pagerLength : 7;
    var paginatorSize =
      pageData.totalPages < paginatorSize ? pageData.totalPages : paginatorSize;

    var template = pagertemplate.querySelector(
      `[${this.tagQueryMap["pageNumbers"].raw}]`
    );
    var prevBtn = pagertemplate.querySelector(
      `[${this.tagQueryMap["pagePrevious"].raw}]`
    );
    var nextBtn = pagertemplate.querySelector(
      `[${this.tagQueryMap["pageNext"].raw}]`
    );
    element.innerHTML = "";
    var pager =
      pageData.currentPage < paginatorSize
        ? { startFrom: 1, endAt: paginatorSize }
        : this.helpers.actions.generatePager(
            pageData.currentPage,
            paginatorSize
          );
    var prevCount = parseInt(pageData.currentPage, 10) - 1;
    if (prevBtn && prevCount > 0) {
      element.appendChild(prevBtn.cloneNode(true)).onclick = this.flipPageFunc(
        label,
        filterList,
        prevCount
      );
    }
    for (var i = pager.startFrom; i <= parseInt(pager.endAt, 10); i++) {
      if (parseInt(pageData.totalPages, 10) == i) {
        break;
      }
      var liveTemplate = template.cloneNode(true);
      liveTemplate.innerHTML = i;
      pageData.currentPage == i
        ? liveTemplate.classList.add("active")
        : liveTemplate.classList.remove("active");

      liveTemplate.onclick = this.flipPageFunc(label, filterList, i);
      element.appendChild(liveTemplate);
    }
    var nextCount = pageData.currentPage + 1;
    if (nextBtn && nextCount < pageData.totalPages) {
      element.appendChild(nextBtn.cloneNode(true)).onclick = this.flipPageFunc(
        label,
        filterList,
        nextCount
      );
    }
  }
  flipPageFunc(label, options, count) {
    var that = this;
    return function() {
      options.pageIndex = count;
      var template = that.templateList.list[label].template.innerHTML;
      that.listVideos(label, options, template, that.listComponent);
    };
  }
}

export { Paginator };
