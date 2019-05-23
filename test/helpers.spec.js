/**
 * @jest-environment jsdom
 */

var tagQueryMap = require("../src/tagQueryMap");
var library = require("../src/helpers");

var helpers = library.helpers;
helpers.tagQueryMap = tagQueryMap.tagQueryMap;

var template = `
<div data-awe-loader="popular" class="loader">
</div>
 <div class="container" data-awe-list="popular" data-limit="16">
  <div class="item">
    <a href="/example/details/?videoId=@id">
      <img src="@previewImages.1">
      <a href="/example/details/?videoId=@id">@title</a>
      <span>
        <b>Duration</b> @duration min</span>
  </div>
</div>
  
<div class="pagination" data-awe-paginate="popular" data-pager-length="10">
    <button data-pager-previous>
      Prev
    </button>
    <button data-pager-numbers></button>
    <button data-pager-next>
      Next
    </button>
  </div>`;

test("queryToParams", () => {
  var output = helpers.actions.queryToParams({ a: 1, b: 2, c: 3 });
  expect(output).toBe("?a=1&b=2&c=3");
});

test("styles.hideElement", () => {
  document.body.innerHTML = template;
  document.body.style.display = "block";
  helpers.styles.hideElement(document.body);
  expect(document.body.style.display).toBe("none");
});

test("styles.showElement", () => {
  document.body.innerHTML = "<span>Content</span>";
  document.body.style.display = "none";
  helpers.styles.showElement(document.body);
  expect(document.body.style.display).toBe("");
});

test("actions.replaceAll", () => {
  var replacementString = "replacement";
  var output = helpers.actions.replaceAll(
    "@testContent",
    "@testContent",
    replacementString
  );
  expect(output).toBe(replacementString);
});
document.body.innerHTML = "<span>Content</span>";

test("actions.getRandomArr", () => {
  var output = helpers.actions.getRandomArr([1, 2, 3, 4], 3);
  var length = output.length;
  var type = typeof output;
  expect(length).toBe(3);
  expect(type).toBe("object");
});

test("actions.generatePager", () => {
  var case1 = helpers.actions.generatePager(3, 4);
  var case2 = helpers.actions.generatePager(4, 4);
  var case3 = function() {
    helpers.actions.generatePager(13, 0);
  };
  expect(case1).toStrictEqual({ startFrom: 1, endAt: 4 });
  expect(case2).toStrictEqual({ startFrom: 2, endAt: 5 });
  expect(case3).toThrow("currentCount cannot be greater than wantedLength");
});

test("actions.savePaginatorTemplate", () => {
  document.body.innerHTML = template;
  var templateList = { list: {}, paginators: {} };
  helpers.actions.savePaginatorTemplate("popular", templateList);
  expect(typeof templateList.paginators.popular).toBe("object");
});

test("actions.getElement", () => {
  var output = helpers.actions.getElement("popular", "list");
  expect(typeof output).toBe("object");
});

test("actions.getLabel", () => {
  var element = helpers.actions.getElement("popular", "list");
  var label = helpers.actions.getLabel(element, "list");
  expect(label).toBe("popular");
});

test("actions.removeLoader", () => {
  helpers.actions.removeLoader("popular");
  var loader = document.getElementsByClassName("loader")[0];
  expect(loader.style.display).toBe("none");
});

test("actions.showLoader", () => {
  var loader = document.getElementsByClassName("loader")[0];
  helpers.actions.showLoader("popular");
  expect(loader.style.display).toBe("");
});

test("actions.removePaginator", () => {
  helpers.actions.hidePaginator("popular");
  var paginator = document.getElementsByClassName("pagination")[0];
  expect(paginator.style.display).toBe("none");
});

test("actions.showPaginator", () => {
  var paginator = document.getElementsByClassName("pagination")[0];
  helpers.actions.showPaginator("popular");
  expect(paginator.style.display).toBe("");
});
