import { test, expect } from "@playwright/test";

test.describe("Movie Search Functionality", () => {
  test("User can search for an existing movie", async ({ page }) => {
    await page.goto("/");

    const searchInput = page.locator('input[placeholder="Search keywords..."]');
    await expect(searchInput).toBeVisible();

    await searchInput.fill("Dune");

    const movieTitles = page.locator("h2");
    await expect(movieTitles).toContainText(["Dune"], { timeout: 10000 });

    const movieCardsCount = await page.locator("div.group").count();
    expect(movieCardsCount).toBeGreaterThan(0);
  });

  test("User sees no movies for non-existent search", async ({ page }) => {
    await page.goto("/");

    const searchInput = page.locator('input[placeholder="Search keywords..."]');
    await expect(searchInput).toBeVisible();

    await searchInput.fill("ffgghhdjjsk");

    const noMoviesMessage = page.getByRole("heading", {
      name: "No Movies Found!",
    });
    await expect(noMoviesMessage).toBeVisible({ timeout: 10000 });

    const movieCardsCount = await page.locator("div.group").count();
    expect(movieCardsCount).toBe(0);
  });
});
