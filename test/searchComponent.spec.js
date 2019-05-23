describe("Run Search Component", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:4041/example", {
      waitUntil: "networkidle0"
    });
    await page.on("request", interceptedRequest => {
      var content = page.content().then(output => {
        // console.log(interceptedRequest.url());
        // console.log(output);
      });
      //   console.log(content);
    });
    await page.setViewport({ width: 1598, height: 758 });
  });

  it('should be titled "Google"', async () => {
    await page.waitForSelector("body > .search > input");
    await page.click("body > .search > input");
    await page.type("body > .search > input", "asian");

    await page.waitForSelector("body > .search > #search-btn");
    await page.click("body > .search > #search-btn");
    await page.waitForSelector("body > #content");

    // console.log((content.match(/asian/g) || "").length);
    // console.log((content.match(/Asian/g) || "").length);
    await expect(page.title()).resolves.toMatch("HTML Kit");
  });
});
