class RequestProcessor {
  constructor(deps) {
    this.config = deps.env;
    this.helpers = deps.helpers;
  }
  processor(action, filters, callback) {
    var params = this.helpers.actions.queryToParams(
      Object.assign(filters, this.config)
    );
    const url =
      "https://pt.ptawe.com/api/video-promotion/v1/" + action + params;
    console.info(url);
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
}
export { RequestProcessor };
