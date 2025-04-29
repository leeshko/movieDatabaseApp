import { test, expect } from "@playwright/test";

test("Homepage loads and displays latest movies", async ({ page }) => {
  await page.goto("/");

  const heading = page.locator("h1");
  await expect(heading).toHaveText("Latest Movies");

  const movieCards = page.locator("div.group");
  const movieCount = await movieCards.count();
  expect(movieCount).toBeGreaterThan(0);
});
