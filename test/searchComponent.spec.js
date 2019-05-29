jest.setTimeout(30000000);
describe("Run Search Component", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:4443/example", {
      waitUntil: "networkidle0"
    });

    await page.setViewport({ width: 1598, height: 758 });
  });

  it("should search for asian content", async () => {
    await page.waitForSelector("body > .search > input");
    await page.click("body > .search > input");
    await page.type("body > .search > input", "asian");

    await page.waitForSelector("body > .search > #search-btn");
    await page.click("body > .search > #search-btn");
    await page.waitForFunction(
      '(document.getElementsByClassName("item")[0].innerText+document.getElementsByClassName("item")[1].innerText+document.getElementsByClassName("item")[2].innerText).toLowerCase().includes("asian")'
    );
    let html = await page.$eval("#content", el => el.innerText);
    await expect(html.toLowerCase().includes("asian")).toBe(true);
  });
});
