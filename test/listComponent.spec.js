describe("Run List Component", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:4443/example/index.html", {
      waitUntil: "networkidle0"
    });
    await page.setViewport({ width: 1598, height: 758 });
  });

  it("should list videos", async () => {
    var content = await page.content();
    var length = (content.match(/item/g) || "").length;
    expect(length).toBe(16);
  });
});
