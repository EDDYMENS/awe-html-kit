jest.setTimeout(30000000);
describe("Run paginator Component", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:4443/example", {
      waitUntil: "networkidle0"
    });

    await page.setViewport({ width: 1598, height: 758 });
  });

  it("should test pager", async () => {
    await page.waitForSelector("body > .pagination > .active");
    let content1 = await page.$eval("#content", el => el.innerText);
    let pagers = await page.$eval(".pagination", el => el.innerText);
    await page.click("[data-pager-numbers]:nth-child(4)");
    await page.waitForFunction(
      '(parseInt(document.querySelector(".pagination > .active").innerText)==4)'
    );
    let content2 = await page.$eval("#content", el => el.innerText);
    await expect(content1).not.toBe(content2);
    await expect(pagers.includes("12345678910")).toBe(true);
  });
});
