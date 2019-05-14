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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

window.onload = function () {
  (function () {
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
    var connectionEl = document.querySelectorAll("[" + tagQueryMap["connection"].raw + "]");
    if (!connectionEl.length) {
      console.error("Sorry but you need to set your connectiond details");
      return;
    }
    var connections = connectionEl[0].dataset;
    var connectionObj = {
      psid: connections.awePsid,
      accessKey: connections.aweAccesskey,
      clientIp: connections.aweClientip
    };

    //Handle all requests to the AWEMPIRE API
    function requestProcessor(action, filters, callback) {
      var params = queryToParams(Object.assign(filters, connectionObj));
      var url = "https://pt.ptawe.com/api/video-promotion/v1/" + action + params;
      console.log(url);
      var requestConfig = {
        method: "GET",
        credentials: "same-origin",
        headers: { "X-Requested-With": "XMLHttpRequest" }
      };
      fetch(url, requestConfig).then(function (response) {
        return response.json();
      }).then(function (result) {
        return callback(result);
      }).catch(function (error) {
        return function (error) {
          console.error(error);
        };
      });
    }

    function queryToParams(query) {
      var str = [];
      for (var p in query) {
        if (query.hasOwnProperty(p)) {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(query[p]));
        }
      }return "?" + str.join("&");
    }

    /**
     * Helpers start here
     */
    var helpers = {};

    //style changes
    helpers.style = {
      hideElement: function hideElement(element) {
        element.style.display = "none";
      },
      showElement: function showElement(element) {
        element.style.display = "";
      }
    };

    //actions
    helpers.actions = {
      showOrHideComponent: function showOrHideComponent(componentTag, action, dataSet, label) {
        var componentList = document.querySelectorAll("[" + componentTag + "=" + label + "]");
        componentList.forEach(function (component) {
          action == "hide" ? helpers.style.hideElement(component) : helpers.style.showElement(component);
        });
      },
      removeLoader: function removeLoader(label) {
        helpers.actions.showOrHideComponent(tagQueryMap["loader"].raw, "hide", {
          tag: "aweLoader"
        }, label);
      },
      showLoader: function showLoader(label) {
        helpers.actions.showOrHideComponent(tagQueryMap["loader"].raw, "show", {
          tag: "aweLoader"
        }, label);
      },
      hidePaginator: function hidePaginator(label) {
        helpers.actions.showOrHideComponent(tagQueryMap["pagination"].raw, "hide", {
          tag: "awePaginate"
        }, label);
      },
      showPaginator: function showPaginator(label) {
        helpers.actions.showOrHideComponent(tagQueryMap["pagination"].raw, "show", {
          tag: "awePaginate"
        }, label);
      },
      getLabel: function getLabel(element, componentType) {
        var labelKey = tagQueryMap[componentType].refined;
        return element.dataset[labelKey];
      },
      getElement: function getElement(label, componentType) {
        return document.querySelector("[" + tagQueryMap[componentType].raw + "=" + label + "]");
      },
      savePaginatorTemplate: function savePaginatorTemplate(label) {
        var element = document.querySelector("[" + tagQueryMap["pagination"].raw + "=" + label + "]");
        if (!element) {
          return false;
        }
        templateList.paginators[label] = {};
        templateList.paginators[label].element = element;
        templateList.paginators[label].template = element.cloneNode(true);
      },
      generatePager: function generatePager(currentCount, wantedLength) {
        var pageSplit = wantedLength / 2;
        var leftCount = Math.floor(pageSplit);
        var rightCount = Math.round(pageSplit);
        var startFrom = currentCount > leftCount ? currentCount - leftCount : currentCount;
        var endAt = currentCount + rightCount - 1;
        endAt = endAt - startFrom != wantedLength ? parseInt(startFrom) + parseInt(wantedLength) - 1 : endAt;
        return { startFrom: startFrom, endAt: endAt };
      },
      getUrlParam: function getUrlParam(param) {
        var url_string = window.location.href;
        var url = new URL(url_string);
        return url.searchParams.get(param);
      },
      getRandomArr: function getRandomArr(arr, n) {
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
      }
    };

    /**
     * End (helpers)
     */

    var listElements = document.querySelectorAll("[" + tagQueryMap["list"].raw + "]");
    var players = document.querySelectorAll("[" + tagQueryMap["player"].raw + "]");
    var searchBtnList = document.querySelectorAll("[" + tagQueryMap["searchBtn"].raw + "]");
    var tagList = document.querySelectorAll("[" + tagQueryMap["tags"].raw + "]");

    var templateList = { list: {}, paginators: {} };
    if (!listElements.length && !players.length) {
      return;
    }

    listElements.forEach(function (element) {
      preRenderActions({ element: element }, "list");
      var label = helpers.actions.getLabel(element, "list");
      helpers.actions.savePaginatorTemplate(label);
      listVideos(label);
    });

    tagList.forEach(function (element) {
      preRenderActions({ element: element }, "tags");
      var label = helpers.actions.getLabel(element, "tags");
      listTags(label);
    });

    players.forEach(function (element) {
      playVideo(element);
    });
    searchBtnList.forEach(function (searchBtnElement) {
      prepareSearchEvent(searchBtnElement);
    });

    function renderPaginator(label, pageData, filterList) {
      if (!templateList.paginators[label]) {
        return;
      }
      var element = templateList.paginators[label].element;
      var pagertemplate = templateList.paginators[label].template;
      var pagerLength = element.dataset.pagerLength;
      var paginatorSize = pagerLength ? pagerLength : 7;
      var paginatorSize = pageData.totalPages < paginatorSize ? pageData.totalPages : paginatorSize;

      var template = pagertemplate.querySelector("[" + tagQueryMap["pageNumbers"].raw + "]");
      var prevBtn = pagertemplate.querySelector("[" + tagQueryMap["pagePrevious"].raw + "]");
      var nextBtn = pagertemplate.querySelector("[" + tagQueryMap["pageNext"].raw + "]");
      element.innerHTML = "";
      var flipPageFunc = function flipPageFunc(label, options, count) {
        return function () {
          options.pageIndex = count;
          var template = templateList.list[label].template.innerHTML;
          listVideos(label, options, template);
        };
      };
      var pager = pageData.currentPage < paginatorSize ? { startFrom: 1, endAt: paginatorSize } : helpers.actions.generatePager(pageData.currentPage, paginatorSize);
      var prevCount = parseInt(pageData.currentPage) - 1;
      if (prevBtn && prevCount > 0) {
        element.appendChild(prevBtn.cloneNode(true)).onclick = flipPageFunc(label, filterList, prevCount);
      }
      for (var i = pager.startFrom; i <= parseInt(pager.endAt); i++) {
        if (parseInt(pageData.totalPages) == i) {
          break;
        }
        var liveTemplate = template.cloneNode(true);
        liveTemplate.innerHTML = i;
        pageData.currentPage == i ? liveTemplate.classList.add("active") : liveTemplate.classList.remove("active");

        liveTemplate.onclick = flipPageFunc(label, filterList, i);
        element.appendChild(liveTemplate);
      }
      var nextCount = pageData.currentPage + 1;
      if (nextBtn && nextCount < pageData.totalPages) {
        element.appendChild(nextBtn.cloneNode(true)).onclick = flipPageFunc(label, filterList, nextCount);
      }
      // element.parentNode.replaceChild(mainTemplate, element);
      //if perPage == total don't paginate
      //if currentPage is within 1 to pageSize-1 just render 1-7
    }
    function playVideo(element) {
      var playerId = Math.random();
      var dataSets = element.dataset;
      var urlParams = new URLSearchParams(location.search);

      var videoId = !dataSets.videoId ? urlParams.get("aweVideoId") : dataSets.videoid;
      if (!videoId) {
        return;
      }
      element.innerHTML += " <div class=\"awe-player\" data-awe-container-id=\"" + playerId + "\" ></div>";
      preRenderActions({ element: element }, "player");
      requestProcessor("details/" + videoId, connectionObj, function (response) {
        if (!response.data.playerEmbedUrl) {
          console.error("contentHash could not be resolved");
        }
        render(element, [response.data]);
        postRenderActions({
          element: element,
          loaderLabel: element.dataset.awePlayer
        });
        var url = new URL(response.data.playerEmbedUrl);
        var contentHash = url.searchParams.get("contentHash");
        try {
          (function (w, d) {
            var getContainer = function getContainer() {
              var container = d.querySelector("div[data-awe-container-id=\"" + playerId + "\"]");

              if (!container) {
                console.warn("Promotool container not found");

                return container;
              }
              container.removeAttribute("data-awe-container-id");

              return container;
            };

            var container = getContainer();
            listVideos;
            if (container) {
              psid = connectionObj.psid;
              accessKey = connectionObj.accessKey;
              var iframeElement = d.createElement("iframe");

              iframeElement.src = "//pt.protoawe.com/tube-player/?psid=" + psid + "&accessKey=" + accessKey + "&contentHash=" + contentHash + "&psprogram=REVS&primaryColor=&labelColor=&c=p";
              iframeElement.style.width = "100%";
              iframeElement.style.height = "100%";
              iframeElement.frameBorder = 0;
              iframeElement.setAttribute("allowfullscreen", "true");

              container.appendChild(iframeElement);
            }
          })(window, document);
        } catch (exception) {
          console.warn("Promotool error: " + exception.message);
        }
      });
    }

    function listTags(label, options, template) {
      options = options ? options : {};
      var element = templateList.list[label].element;
      if (!element) {
        throw "Sorry but no element was found with for the label " + label;
      }
      var action = "tags";
      var filterList = options.filterList ? options.filterList : element.dataset;
      var query = {};
      preRenderActions({ element: element }, action);
      var resizeTagList = function resizeTagList(tagList, size) {
        return helpers.actions.getRandomArr(tagList, size);
      };
      var renderVids = function renderVids(tagList, filterList, template) {
        var size = filterList.limit ? filterList.limit : tagList.length;
        tagList = resizeTagList(tagList, size);
        render(element, tagList, template);
        postRenderActions({
          element: element,
          loaderLabel: filterList.aweTags
        });
      };
      if (options.tagList) {
        return renderVids(options.tagList, filterList, template);
      }
      requestProcessor(action, filterList, function (response) {
        var tagList = response.data.tags;
        renderVids(tagList, filterList, template);
      });
    }
    function listVideos(label, options, template) {
      var urlVideoTags = helpers.actions.getUrlParam("videoTags");
      options = options ? options : {};
      var element = templateList.list[label].element;
      if (!element) {
        throw "Sorry but no element was found with for the label " + label;
      }
      var action = "list";
      var pagination = options.pagination;
      delete options.pagination;
      var filterList = options.filterList ? options.filterList : element.dataset;

      if (urlVideoTags) {
        filterList.tags = filterList.tags && filterList.tags.length ? filterList.tags + "," + urlVideoTags : filterList.tags = urlVideoTags;
      }
      var query = {};
      preRenderActions({ element: element }, action);
      var renderVids = function renderVids(videoList, filterList, template) {
        render(element, videoList, template);
        postRenderActions({
          element: element,
          loaderLabel: filterList.aweList
        });
      };
      if (options.videoList) {
        renderPaginator(label, options.pagination, filterList);
        return renderVids(videoList, filterList, template);
      }
      requestProcessor(action, filterList, function (response) {
        var videoList = response.data.videos;
        renderPaginator(label, response.data.pagination, filterList);
        renderVids(videoList, filterList, template);
      });
    }
    function nextPage(label, options) {}
    //actions to preform before rendering
    function preRenderActions(payload, componentType) {
      var label = payload.element.dataset[tagQueryMap[componentType].refined];
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
      helpers.style.hideElement(payload.element);
    }

    //actions to preform after rendering
    function postRenderActions(payload) {
      helpers.actions.removeLoader(payload.loaderLabel);
      helpers.actions.showPaginator(payload.loaderLabel);
      helpers.style.showElement(payload.element);
    }

    function prepareSearchEvent(searchBtnElement) {
      searchBtnElement.onclick = function () {
        var listLabel = this.dataset.aweSearchBtn;
        var template = templateList.list[listLabel].template.innerHTML;
        templateList.list[listLabel].element.dataset.pageIndex = 1;
        var filterList = templateList.list[listLabel].element.dataset;
        var element = helpers.actions.getElement(listLabel, "searchInp");
        if (!element) {
          throw "Sorry but it looks like you don't have a search box in place for search ie: <input data-awe-search=\"popular\" />";
        }
        var searchWords = element.value;
        filterList.tags = searchWords.split(" ").length == 2 ? searchWords : searchWords.replace(/ /g, ",");
        listVideos(listLabel, {
          filterList: filterList
        }, template);
      };
    }
    //responsible for rendering list views
    function render(element, dataGrp, prepTemplate) {
      var template = prepTemplate ? prepTemplate : element.innerHTML;
      element.innerHTML = "";
      var completeTemplate = "";
      dataGrp.forEach(function (data) {
        var liveTemplate = template;
        if (typeof data == "string") {
          liveTemplate = liveTemplate.replaceAll("@tag", data);
        } else {
          for (var key in data) {
            if (_typeof(data[key]) == "object") {
              var count = 0;
              var innerData = data[key];
              for (var key2 in innerData) {
                liveTemplate = liveTemplate.replaceAll("@" + key + "." + count, innerData[key2]);
                count++;
              }
              count = 0;
            } else {
              var value = data[key];
              value = key == "duration" ? Math.floor(parseFloat(value) / 60).toFixed(2) : value;
              liveTemplate = liveTemplate.replaceAll("@" + key, value);
            }
          }
        }
        element.innerHTML += liveTemplate;
      });
    }
    String.prototype.replaceAll = function (search, replacement) {
      var target = this;
      return target.split(search).join(replacement);
    };
  })();
};

/***/ })

/******/ });
});
//# sourceMappingURL=library.js.map