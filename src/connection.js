import { tagQueryMap } from "tagQueryMap";

var connectionEl = document.querySelectorAll(
  `[${tagQueryMap["connection"].raw}]`
);
if (!connectionEl.length) {
  throw "Sorry but you need to set your connection details";
}
const connections = connectionEl[0].dataset;
const connectionObj = {
  psid: connections.awePsid,
  accessKey: connections.aweAccesskey,
  clientIp: connections.aweClientip
};

export { connectionObj as env };
