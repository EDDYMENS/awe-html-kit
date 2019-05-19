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
              liveTemplate = this.helpers.actions.replaceAll(
                liveTemplate,
                "@" + key + "." + count,
                innerData[key2]
              );
              count++;
            }
            count = 0;
          } else {
            var value = data[key];
            value =
              key == "duration"
                ? Math.floor(parseFloat(value) / 60).toFixed(2)
                : value;
            liveTemplate = this.helpers.actions.replaceAll(
              liveTemplate,
              "@" + key,
              value
            );
          }
        }
      }
      element.innerHTML += liveTemplate;
    });
  }
}
export { RenderEngine };
