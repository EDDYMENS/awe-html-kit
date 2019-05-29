jest.setTimeout(30000000);
describe("It Should render video player", () => {
  beforeAll(async () => {
    await page.goto(
      "http://localhost:4443/example/details/?videoId=98050af0738e6892d539a656a900547e",
      {
        waitUntil: "networkidle0"
      }
    );
    await page.setViewport({ width: 1598, height: 758 });
  });

  it("Render IFrame", async () => {
    var content = await page.content();
    var length = await (content.match(/<\/iframe>/g) || "").length;
    expect(length).toBe(1);
  });
});
