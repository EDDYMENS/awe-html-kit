var library = require("../src/helpers");
var helpers = library.helpers;

test("queryToParams", () => {
  var output = helpers.actions.queryToParams({ a: 1, b: 2, c: 3 });
  expect(output).toBe("?a=1&b=2&c=3");
});
