import { test as base } from "@playwright/test";
import { GaragePage } from "../pages/GaragePage.js";

export const test = base.extend({
  storageState: "playwright/.auth/user.json",

  userGaragePage: async ({ page }, use) => {
    const garagePage = new GaragePage(page);

    await garagePage.open();

    await use(garagePage);
  },
});

export { expect } from "@playwright/test";