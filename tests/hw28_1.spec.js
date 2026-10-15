import {
  test,
  expect,
} from "../fixtures/userGaragePage.js";

test.describe("HW 28.1 - Fixtures and Storage State", () => {
  test("should open Garage page as authenticated user", async ({
    userGaragePage,
  }) => {
    await expect(
      userGaragePage.addCarButton
    ).toBeVisible();

    await expect(
      userGaragePage.page
    ).toHaveURL(/\/panel\/garage/);
  });
});