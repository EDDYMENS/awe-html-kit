var helpers = {};

//style changes
helpers.styles = {
  hideElement: function(element) {
    element.style.display = "none";
  },
  showElement: function(element) {
    element.style.display = "";
  }
};

//actions
helpers.actions = {
  showOrHideComponent: function(componentTag, action, dataSet, label) {
    var componentList = document.querySelectorAll(`[${componentTag}=${label}]`);
    componentList.forEach(component => {
      action == "hide"
        ? helpers.styles.hideElement(component)
        : helpers.styles.showElement(component);
    });
  },
  removeLoader: function(label) {
    helpers.actions.showOrHideComponent(
      helpers.tagQueryMap["loader"].raw,
      "hide",
      {
        tag: "aweLoader"
      },
      label
    );
  },
  showLoader: function(label) {
    helpers.actions.showOrHideComponent(
      helpers.tagQueryMap["loader"].raw,
      "show",
      {
        tag: "aweLoader"
      },
      label
    );
  },
  hidePaginator: function(label) {
    helpers.actions.showOrHideComponent(
      helpers.tagQueryMap["pagination"].raw,
      "hide",
      {
        tag: "awePaginate"
      },
      label
    );
  },
  showPaginator: function(label) {
    helpers.actions.showOrHideComponent(
      helpers.tagQueryMap["pagination"].raw,
      "show",
      {
        tag: "awePaginate"
      },
      label
    );
  },
  getLabel: function(element, componentType) {
    var labelKey = helpers.tagQueryMap[componentType].refined;
    return element.dataset[labelKey];
  },
  getElement: function(label, componentType) {
    if (!label && !componentType) {
      throw "You need to provide a label and a componentType";
    }
    return document.querySelector(
      `[${helpers.tagQueryMap[componentType].raw}=${label}]`
    );
  },
  savePaginatorTemplate: function(label, templateList) {
    var element = document.querySelector(
      `[${helpers.tagQueryMap["pagination"].raw}=${label}]`
    );
    if (!element) {
      return false;
    }
    templateList.paginators[label] = {};
    templateList.paginators[label].element = element;
    templateList.paginators[label].template = element.cloneNode(true);
    return templateList;
  },
  generatePager: function(currentCount, wantedLength) {
    if (currentCount > wantedLength || (!currentCount && !wantedLength)) {
      throw "currentCount cannot be greater than wantedLength";
    }
    var pageSplit = wantedLength / 2;
    var leftCount = Math.floor(pageSplit);
    var rightCount = Math.round(pageSplit);
    var startFrom =
      currentCount > leftCount ? currentCount - leftCount : currentCount;
    var endAt = currentCount + rightCount - 1;
    endAt =
      endAt - startFrom != wantedLength
        ? parseInt(startFrom, 10) + parseInt(wantedLength, 10) - 1
        : endAt;
    return { startFrom: startFrom, endAt: endAt };
  },
  getUrlParam: function(param) {
    var url_string = window.location.href;
    var url = new URL(url_string);
    return url.searchParams.get(param);
  },
  getRandomArr: function(arr, n) {
    var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
    if (n > len)
      throw new RangeError("getRandom: more elements taken than available");

    while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  },

  replaceAll: function(target, search, replacement) {
    return target.split(search).join(replacement);
  },
  queryToParams: function(query) {
    var str = [];
    for (var p in query)
      if (query.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(query[p]));
      }
    return "?" + str.join("&");
  }
};

export { helpers };
