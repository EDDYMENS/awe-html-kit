window.onload = function() {
  (function() {
    var connectionEl = document.querySelectorAll("[data-awe-connection]");
    if (!connectionEl.length) {
      console.error("Sorry but you need to set your connectiond details");
      return;
    }
    const connections = connectionEl[0].dataset;
    const connectionObj = {
      psid: connections.awePsid,
      accessKey: connections.aweAccesskey,
      clientIp: connections.aweClientip
    };

    //Handle all requests to the AWEMPIRE API
    function requestProcessor(action, filters, callback) {
      params = queryToParams(Object.assign(filters, connectionObj));
      const url =
        "https://pt.ptawe.com/api/video-promotion/v1/" + action + params;
      console.log(url);
      const requestConfig = {
        method: "GET",
        credentials: "same-origin",
        headers: { "X-Requested-With": "XMLHttpRequest" }
      };
      fetch(url, requestConfig)
        .then(response => response.json())
        .then(result => callback(result))
        .catch(
          error =>
            function(error) {
              console.error(error);
            }
        );
    }

    function queryToParams(query) {
      var str = [];
      for (var p in query)
        if (query.hasOwnProperty(p)) {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(query[p]));
        }
      return "?" + str.join("&");
    }

    /**
     * Helpers start here
     */
    helpers = {};

    //style changes
    helpers.style = {
      hideElement: function(element) {
        element.style.display = "none";
      },
      showElement: function(element) {
        element.style.display = "block";
      }
    };

    //actions
    helpers.actions = {
      showOrHideComponent: function(componentTag, action, dataSet) {
        var componentList = document.querySelectorAll("[" + componentTag + "]");
        componentList.forEach(component => {
          if (
            component.dataset[dataSet.tag].toLowerCase() ==
            component.dataset.aweLoader.toLowerCase()
          ) {
            action == "hide"
              ? helpers.style.hideElement(component)
              : helpers.style.showElement(component);
          }
        });
      },
      removeLoader: function(label) {
        helpers.actions.showOrHideComponent("data-awe-loader", "hide", {
          tag: "aweLoader"
        });
      },
      hidePagination: function(label) {
        console.log(label);
      },
      showPagination: function(label) {
        console.log(label);
      },
      getLabel: function(element, componentType) {
        var labelKey = tagQueryMap[componentType].refined;
        return element.dataset[labelKey];
      }
    };

    /**
     * End (helpers)
     */
    var tagQueryMap = {
      list: { raw: "data-awe-list", refined: "aweList" },
      player: { raw: "data-awe-player", refined: "awePlayer" },
      searchBtn: { raw: "data-awe-search-btn", refined: "searchBtn" }
    };
    var listElements = document.querySelectorAll(
      `[${tagQueryMap["list"].raw}]`
    );
    var players = document.querySelectorAll(`[${tagQueryMap["player"].raw}]`);
    var searchBtnList = document.querySelectorAll(
      `[${tagQueryMap["searchBtn"].raw}]`
    );
    var templateList = { list: {} };
    if (!listElements.length && !players.length) {
      return;
    }

    listElements.forEach(element => {
      preRenderActions({ element: element });
      var label = helpers.actions.getLabel(element, "list");
      listVideos(label);
    });

    players.forEach(element => {
      playVideo(element);
    });
    searchBtnList.forEach(searchBtnElement => {
      prepareSearchEvent(searchBtnElement);
    });
    function playVideo(element) {
      const playerId = Math.random();
      var dataSets = element.dataset;
      var urlParams = new URLSearchParams(location.search);

      var videoId = !dataSets.videoid
        ? urlParams.get("aweVideoId")
        : dataSets.videoid;
      if (!videoId) {
        return;
      }
      element.innerHTML = ` <div class="awe-player" data-awe-container-id="${playerId}" ></div>`;
      requestProcessor("details/" + videoId, connectionObj, function(response) {
        if (!response.data.playerEmbedUrl) {
          console.error("contentHash could not be resolved");
        }
        var url = new URL(response.data.playerEmbedUrl);
        var contentHash = url.searchParams.get("contentHash");
        try {
          (function(w, d) {
            var getContainer = function() {
              var container = d.querySelector(
                `div[data-awe-container-id="${playerId}"]`
              );

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

              iframeElement.src = `//pt.protoawe.com/tube-player/?psid=${psid}&accessKey=${accessKey}&contentHash=${contentHash}&psprogram=REVS&primaryColor=&labelColor=&c=p`;
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
    function listVideos(label, options) {
      options = options ? options : {};
      var element = templateList.list[label].element;
      if (!element) {
        throw `Sorry but no element was found with for the label ${label}`;
      }
      var action = "list";
      var filterList = element.dataset ? element.dataset : options.filterList;
      var query = {};
      var renderVids = function(videoList, filterList) {
        render(element, videoList);
        postRenderActions({
          element: element,
          loaderLabel: filterList.aweList
        });
      };
      if (options.videoList) {
        return renderVids(videoList, filterList);
      }
      requestProcessor(action, filterList, function(response) {
        var videoList = response.data.videos;
        renderVids(videoList, filterList);
      });
    }

    //actions to preform before rendering
    function preRenderActions(payload) {
      var label = payload.element.dataset.aweList;
      if (!label) {
        throw 'Sorry but you need to label you list template eg: `data-awe-list="popular"`';
      }
      templateList.list[label.toLowerCase()] = {
        element: payload.element,
        data: payload.data
      };
      helpers.style.hideElement(payload.element);
    }

    //actions to preform after rendering
    function postRenderActions(payload) {
      helpers.actions.removeLoader(payload.loaderLabel);
      helpers.style.showElement(payload.element);
    }

    function prepareSearchEvent(searchBtnElement) {
      searchBtnElement.onclick = function() {
        var listLabel = this.dataset.aweSearchBtn;
        listVideos(listLabel);
      };
    }
    //responsible for rendering list views
    function render(element, dataGrp, prepTemplate) {
      var template = prepTemplate ? prepTemplate : element.innerHTML;
      element.innerHTML = "";
      dataGrp.forEach(data => {
        var liveTemplate = template;
        for (var key in data) {
          if (typeof data[key] == "object") {
            count = 0;
            innerData = data[key];
            for (var key2 in innerData) {
              liveTemplate = liveTemplate.replace(
                "@" + key + "." + count,
                innerData[key2]
              );
              count++;
            }
            count = 0;
          } else {
            liveTemplate = liveTemplate.replace("@" + key, data[key]);
          }
        }
        element.innerHTML += liveTemplate;
      });
    }
  })();
};
