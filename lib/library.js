(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("library", [], factory);
	else if(typeof exports === 'object')
		exports["library"] = factory();
	else
		root["library"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/listVideoComponent.js":
/*!**********************************************!*\
  !*** ./src/components/listVideoComponent.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
class ListComponent {
  constructor(requestProcessor, middleware, paginator, renderEngine, deps) {
    this.templateList = deps.templateList;
    this.helpers = deps.helpers;
    this.requestProcessor = requestProcessor;
    this.middleware = middleware;
    this.renderEngine = renderEngine;
    this.paginator = new paginator(this, deps);
  }
  listVideos(label, options, template, selfInst) {
    try {
      var inst = selfInst ? selfInst : this;
      var helpers = inst.helpers;
      var templateList = inst.templateList;
      var middleware = inst.middleware;
      var paginator = inst.paginator;
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
        filterList.tags = filterList.tags && filterList.tags.length ? filterList.tags + "," + urlVideoTags : filterList.tags = urlVideoTags;
      }
      var query = {};
      middleware.preRenderActions({ element: element }, action);
      var that = this;
      var renderVids = function (videoList, filterList, template) {
        that = that.renderEngine ? that : that.listComponent;
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
      inst.requestProcessor.processor(action, filterList, function (response) {
        var videoList = response.data.videos;
        paginator.render(label, response.data.pagination, filterList);
        renderVids(videoList, filterList, template);
      });
    } catch (exception) {
      console.log("err:", exception);
    }
  }
}

exports.ListComponent = ListComponent;

/***/ }),

/***/ "./src/components/paginator.js":
/*!*************************************!*\
  !*** ./src/components/paginator.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
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
    var paginatorSize = pageData.totalPages < paginatorSize ? pageData.totalPages : paginatorSize;

    var template = pagertemplate.querySelector(`[${this.tagQueryMap["pageNumbers"].raw}]`);
    var prevBtn = pagertemplate.querySelector(`[${this.tagQueryMap["pagePrevious"].raw}]`);
    var nextBtn = pagertemplate.querySelector(`[${this.tagQueryMap["pageNext"].raw}]`);
    element.innerHTML = "";
    var pager = pageData.currentPage < paginatorSize ? { startFrom: 1, endAt: paginatorSize } : this.helpers.actions.generatePager(pageData.currentPage, paginatorSize);
    var prevCount = parseInt(pageData.currentPage, 10) - 1;
    if (prevBtn && prevCount > 0) {
      element.appendChild(prevBtn.cloneNode(true)).onclick = this.flipPageFunc(label, filterList, prevCount);
    }
    for (var i = pager.startFrom; i <= parseInt(pager.endAt, 10); i++) {
      if (parseInt(pageData.totalPages, 10) == i) {
        break;
      }
      var liveTemplate = template.cloneNode(true);
      liveTemplate.innerHTML = i;
      pageData.currentPage == i ? liveTemplate.classList.add("active") : liveTemplate.classList.remove("active");

      liveTemplate.onclick = this.flipPageFunc(label, filterList, i);
      element.appendChild(liveTemplate);
    }
    var nextCount = pageData.currentPage + 1;
    if (nextBtn && nextCount < pageData.totalPages) {
      element.appendChild(nextBtn.cloneNode(true)).onclick = this.flipPageFunc(label, filterList, nextCount);
    }
  }
  flipPageFunc(label, options, count) {
    var that = this;
    return function () {
      options.pageIndex = count;
      var template = that.templateList.list[label].template.innerHTML;
      that.listVideos(label, options, template, that.listComponent);
    };
  }
}

exports.Paginator = Paginator;

/***/ }),

/***/ "./src/components/searchComponent.js":
/*!*******************************************!*\
  !*** ./src/components/searchComponent.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
class SearchComponent {
  constructor(listComponent, deps) {
    this.templateList = deps.templateList;
    this.helpers = deps.helpers;
    this.listComponent = listComponent;
  }
  prepareSearchEvent(searchBtnElement) {
    var that = this;
    searchBtnElement.onclick = function () {
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
      filterList.tags = searchWords.split(" ").length === 2 ? searchWords : searchWords.replace(/ /g, ",");
      listComponent.listVideos(listLabel, {
        filterList: filterList
      }, template);
    };
  }
}

exports.SearchComponent = SearchComponent;

/***/ }),

/***/ "./src/components/videoPlayerComponent.js":
/*!************************************************!*\
  !*** ./src/components/videoPlayerComponent.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
class VideoPlayerComponent {
  constructor(requestProcessor, renderEngine, middleware, helpers, deps) {
    this.middleware = middleware;
    this.requestProcessor = requestProcessor;
    this.renderEngine = renderEngine;
    this.helpers = helpers;
    this.env = deps.env;
  }
  playVideo(element) {
    const playerId = Math.random();
    var dataSets = element.dataset;
    var urlParams = new URLSearchParams(location.search);
    var middleware = this.middleware;
    var helpers = this.helpers;
    var connectionObj = this.env;
    var videoId = urlParams.get("videoId") ? urlParams.get("videoId") : dataSets.videoid;

    if (!videoId) {
      return;
    }

    element.dataset.aweContainerId = playerId;
    element.classList.add("awe-player");
    middleware.preRenderActions({ element: element }, "player");
    var that = this;
    this.requestProcessor.processor("details/" + videoId, dataSets, function (response) {
      if (!response.data.playerEmbedUrl) {
        console.error("contentHash could not be resolved");
      }
      that.renderEngine.render(element, [response.data]);
      middleware.postRenderActions({
        element: element,
        loaderLabel: element.dataset.awePlayer
      });

      var url = new URL(response.data.playerEmbedUrl);
      var contentHash = url.searchParams.get("contentHash");
      try {
        var container = function () {
          var container = document.querySelector(`div[data-awe-container-id="${playerId}"]`);

          if (!container) {
            console.warn("Promotool container not found");

            return container;
          }

          container.removeAttribute("data-awe-container-id");
          return container;
        }();
        var params = that.helpers.actions.queryToParams(dataSets);
        var psid = connectionObj.psid;
        var accessKey = connectionObj.accessKey;
        var iframeElement = document.createElement("iframe");
        iframeElement.src = `//pt.protoawe.com/tube-player/${params}&psid=${psid}&accessKey=${accessKey}&contentHash=${contentHash}&psprogram=REVS&c=p`;
        iframeElement.style.width = "100%";
        iframeElement.style.height = "100%";
        iframeElement.frameBorder = 0;
        iframeElement.setAttribute("allowfullscreen", "true");

        container.prepend(iframeElement);
      } catch (exception) {
        console.error("Promotool error: " + exception.message);
      }
    });
  }
}

exports.VideoPlayerComponent = VideoPlayerComponent;

/***/ }),

/***/ "./src/connection.js":
/*!***************************!*\
  !*** ./src/connection.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.env = undefined;

var _tagQueryMap = __webpack_require__(/*! tagQueryMap */ "./src/tagQueryMap.js");

var connectionEl = document.querySelectorAll(`[${_tagQueryMap.tagQueryMap["connection"].raw}]`);
if (!connectionEl.length) {
  throw "Sorry but you need to set your connection details";
}
const connections = connectionEl[0].dataset;
const connectionObj = {
  psid: connections.awePsid,
  accessKey: connections.aweAccesskey,
  clientIp: connections.aweClientip
};

exports.env = connectionObj;

/***/ }),

/***/ "./src/helpers.js":
/*!************************!*\
  !*** ./src/helpers.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var helpers = {};

//style changes
helpers.styles = {
  hideElement: function (element) {
    element.style.display = "none";
  },
  showElement: function (element) {
    element.style.display = "";
  }
};

//actions
helpers.actions = {
  showOrHideComponent: function (componentTag, action, dataSet, label) {
    var componentList = document.querySelectorAll(`[${componentTag}=${label}]`);
    componentList.forEach(component => {
      action == "hide" ? helpers.styles.hideElement(component) : helpers.styles.showElement(component);
    });
  },
  removeLoader: function (label) {
    helpers.actions.showOrHideComponent(helpers.tagQueryMap["loader"].raw, "hide", {
      tag: "aweLoader"
    }, label);
  },
  showLoader: function (label) {
    helpers.actions.showOrHideComponent(helpers.tagQueryMap["loader"].raw, "show", {
      tag: "aweLoader"
    }, label);
  },
  hidePaginator: function (label) {
    helpers.actions.showOrHideComponent(helpers.tagQueryMap["pagination"].raw, "hide", {
      tag: "awePaginate"
    }, label);
  },
  showPaginator: function (label) {
    helpers.actions.showOrHideComponent(helpers.tagQueryMap["pagination"].raw, "show", {
      tag: "awePaginate"
    }, label);
  },
  getLabel: function (element, componentType) {
    var labelKey = helpers.tagQueryMap[componentType].refined;
    return element.dataset[labelKey];
  },
  getElement: function (label, componentType) {
    if (!label && !componentType) {
      throw "You need to provide a label and a componentType";
    }
    return document.querySelector(`[${helpers.tagQueryMap[componentType].raw}=${label}]`);
  },
  savePaginatorTemplate: function (label, templateList) {
    var element = document.querySelector(`[${helpers.tagQueryMap["pagination"].raw}=${label}]`);
    if (!element) {
      return false;
    }
    templateList.paginators[label] = {};
    templateList.paginators[label].element = element;
    templateList.paginators[label].template = element.cloneNode(true);
    return templateList;
  },
  generatePager: function (currentCount, wantedLength) {
    if (currentCount > wantedLength || !currentCount && !wantedLength) {
      throw "currentCount cannot be greater than wantedLength";
    }
    var pageSplit = wantedLength / 2;
    var leftCount = Math.floor(pageSplit);
    var rightCount = Math.round(pageSplit);
    var startFrom = currentCount > leftCount ? currentCount - leftCount : currentCount;
    var endAt = currentCount + rightCount - 1;
    endAt = endAt - startFrom != wantedLength ? parseInt(startFrom, 10) + parseInt(wantedLength, 10) - 1 : endAt;
    return { startFrom: startFrom, endAt: endAt };
  },
  getUrlParam: function (param) {
    var url_string = window.location.href;
    var url = new URL(url_string);
    return url.searchParams.get(param);
  },
  getRandomArr: function (arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len) throw new RangeError("getRandom: more elements taken than available");

    while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  },

  replaceAll: function (target, search, replacement) {
    return target.split(search).join(replacement);
  },
  queryToParams: function (query) {
    var str = [];
    for (var p in query) if (query.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(query[p]));
    }
    return "?" + str.join("&");
  }
};

exports.helpers = helpers;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _connection = __webpack_require__(/*! connection */ "./src/connection.js");

var _helpers = __webpack_require__(/*! helpers */ "./src/helpers.js");

var _middleware = __webpack_require__(/*! middleware */ "./src/middleware.js");

var _tagQueryMap = __webpack_require__(/*! tagQueryMap */ "./src/tagQueryMap.js");

var _renderEngine = __webpack_require__(/*! renderEngine */ "./src/renderEngine.js");

var _paginator = __webpack_require__(/*! components/paginator */ "./src/components/paginator.js");

var _requestProcessor = __webpack_require__(/*! requestProcessor */ "./src/requestProcessor.js");

var _listVideoComponent = __webpack_require__(/*! components/listVideoComponent */ "./src/components/listVideoComponent.js");

var _searchComponent = __webpack_require__(/*! components/searchComponent */ "./src/components/searchComponent.js");

var _videoPlayerComponent = __webpack_require__(/*! components/videoPlayerComponent */ "./src/components/videoPlayerComponent.js");

window.onload = function () {
  var listElements = document.querySelectorAll(`[${_tagQueryMap.tagQueryMap["list"].raw}]`);
  var players = document.querySelectorAll(`[${_tagQueryMap.tagQueryMap["player"].raw}]`);
  var searchBtnList = document.querySelectorAll(`[${_tagQueryMap.tagQueryMap["searchBtn"].raw}]`);
  var tagList = document.querySelectorAll(`[${_tagQueryMap.tagQueryMap["tags"].raw}]`);

  var templateList = { list: {}, paginators: {} };
  if (!listElements.length && !players.length) {
    return;
  }

  _helpers.helpers.tagQueryMap = _tagQueryMap.tagQueryMap;
  var deps = {
    tagQueryMap: _tagQueryMap.tagQueryMap,
    helpers: _helpers.helpers,
    templateList: templateList,
    env: _connection.env
  };
  var middleware = new _middleware.Middleware(deps);
  var requestProcessor = new _requestProcessor.RequestProcessor(deps);
  var renderEngine = new _renderEngine.RenderEngine(deps);
  var listComponent = new _listVideoComponent.ListComponent(requestProcessor, middleware, _paginator.Paginator, renderEngine, deps);
  var videoPlayerComponent = new _videoPlayerComponent.VideoPlayerComponent(requestProcessor, renderEngine, middleware, _helpers.helpers, deps);

  var searchComponent = new _searchComponent.SearchComponent(listComponent, deps);

  listElements.forEach(element => {
    middleware.preRenderActions({ element: element }, "list");
    var label = _helpers.helpers.actions.getLabel(element, "list");
    templateList = _helpers.helpers.actions.savePaginatorTemplate(label, templateList);
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

/***/ }),

/***/ "./src/middleware.js":
/*!***************************!*\
  !*** ./src/middleware.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
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
    var label = payload.element.dataset[this.tagQueryMap[componentType].refined];
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
exports.Middleware = Middleware;

/***/ }),

/***/ "./src/renderEngine.js":
/*!*****************************!*\
  !*** ./src/renderEngine.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
class RenderEngine {
  //responsible for rendering list views
  constructor(deps) {
    this.helpers = deps.helpers;
  }
  render(element, dataGrp, prepTemplate) {
    var template = prepTemplate ? prepTemplate : element.innerHTML;
    element.innerHTML = "";
    var completeTemplate = "";
    dataGrp.forEach(data => {
      var liveTemplate = template;
      if (typeof data == "string") {
        liveTemplate = liveTemplate.replaceAll("@tag", data);
      } else {
        for (var key in data) {
          if (typeof data[key] == "object") {
            var count = 0;
            var innerData = data[key];
            for (var key2 in innerData) {
              liveTemplate = this.helpers.actions.replaceAll(liveTemplate, "@" + key + "." + count, innerData[key2]);
              count++;
            }
            count = 0;
          } else {
            var value = data[key];
            value = key == "duration" ? Math.floor(parseFloat(value) / 60).toFixed(2) : value;
            liveTemplate = this.helpers.actions.replaceAll(liveTemplate, "@" + key, value);
          }
        }
      }
      element.innerHTML += liveTemplate;
    });
  }
}
exports.RenderEngine = RenderEngine;

/***/ }),

/***/ "./src/requestProcessor.js":
/*!*********************************!*\
  !*** ./src/requestProcessor.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
class RequestProcessor {
  constructor(deps) {
    this.config = deps.env;
    this.helpers = deps.helpers;
  }
  processor(action, filters, callback) {
    var params = this.helpers.actions.queryToParams(Object.assign(filters, this.config));
    const url = "https://pt.ptawe.com/api/video-promotion/v1/" + action + params;
    console.info(url);
    const requestConfig = {
      method: "GET",
      credentials: "same-origin",
      headers: { "X-Requested-With": "XMLHttpRequest" }
    };
    fetch(url, requestConfig).then(response => response.json()).then(result => callback(result)).catch(error => function (error) {
      console.error(error);
    });
  }
}
exports.RequestProcessor = RequestProcessor;

/***/ }),

/***/ "./src/tagQueryMap.js":
/*!****************************!*\
  !*** ./src/tagQueryMap.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var tagQueryMap = {
  list: { raw: "data-awe-list", refined: "aweList" },
  player: { raw: "data-awe-player", refined: "awePlayer" },
  searchBtn: { raw: "data-awe-search-btn", refined: "aweSearchBtn" },
  searchInp: { raw: "data-awe-search", refined: "aweSearch" },
  connection: { raw: "data-awe-connection", refined: "aweConnection" },
  loader: { raw: "data-awe-loader", refined: "aweLoader" },
  tags: { raw: "data-awe-tags", refined: "aweTags" },
  pagination: { raw: "data-awe-paginate", refined: "awePaginate" },
  pageNumbers: { raw: "data-pager-numbers", refined: "pagerNumbers" },
  pagePrevious: { raw: "data-pager-previous", refined: "pagerPrevious" },
  pageNext: { raw: "data-pager-next", refined: "pagerNext" }
};

exports.tagQueryMap = tagQueryMap;

/***/ })

/******/ });
});
//# sourceMappingURL=library.js.map