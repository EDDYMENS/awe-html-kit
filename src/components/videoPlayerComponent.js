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
    var videoId = urlParams.get("videoId")
      ? urlParams.get("videoId")
      : dataSets.videoid;

    if (!videoId) {
      return;
    }

    element.dataset.aweContainerId = playerId;
    element.classList.add("awe-player");
    middleware.preRenderActions({ element: element }, "player");
    var that = this;
    this.requestProcessor.processor("details/" + videoId, dataSets, function(
      response
    ) {
      if (!response.data.playerEmbedUrl) {
        console.error("contentHash could not be resolved");
      }
      that.renderEngine.render(element, [response.data]);
      middleware.postRenderActions({
        element: element,
        loaderLabel: element.dataset.awePlayer
      });
      console.log(that);

      var url = new URL(response.data.playerEmbedUrl);
      var contentHash = url.searchParams.get("contentHash");
      try {
        var container = (function() {
          var container = document.querySelector(
            `div[data-awe-container-id="${playerId}"]`
          );

          if (!container) {
            console.warn("Promotool container not found");

            return container;
          }

          container.removeAttribute("data-awe-container-id");
          return container;
        })();
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

export { VideoPlayerComponent };
