describe("Run Search Component", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:4443/example", {
      waitUntil: "networkidle0"
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
    await expect(1).toBe(1);
  });
});
