import { test, expect } from "@playwright/test";

test.describe("HW 24.1 - Registration form", () => {
  const openRegistration = async (page) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Sign up" }).click();

    await expect(
      page.getByText("Registration", { exact: true })
    ).toBeVisible();
  };

  const checkInvalidField = async (
    page,
    selector,
    message
  ) => {
    const field = page.locator(selector);

    await expect(field).toHaveClass(/is-invalid/);

    await expect(
      page.getByText(message, { exact: true })
    ).toBeVisible();
  };

  test.beforeEach(async ({ page }) => {
    await openRegistration(page);
  });

  test("should register a new user successfully", async ({
    page,
    browserName,
  }) => {
    const name = " Dmytro ".trim();
    const lastName = " Tester ".trim();

    const email =
      `aqa-${browserName}-${Date.now()}@test.com`;

    const password = "Test12345";

    await page.locator("#signupName").fill(name);

    await page
      .locator("#signupLastName")
      .fill(lastName);

    await page
      .locator("#signupEmail")
      .fill(email);

    await page
      .locator("#signupPassword")
      .fill(password);

    await page
      .locator("#signupRepeatPassword")
      .fill(password);

    const registerButton = page.getByRole(
      "button",
      { name: "Register" }
    );

    await expect(registerButton).toBeEnabled();

    await registerButton.click();

    await expect(page).toHaveURL(
      /\/panel\/garage/
    );
  });

  test("should show errors for required fields", async ({
    page,
  }) => {
    await page.locator("#signupName").focus();
    await page.locator("#signupName").blur();

    await checkInvalidField(
      page,
      "#signupName",
      "Name required"
    );

    await page.locator("#signupLastName").focus();
    await page.locator("#signupLastName").blur();

    await checkInvalidField(
      page,
      "#signupLastName",
      "Last name required"
    );

    await page.locator("#signupEmail").focus();
    await page.locator("#signupEmail").blur();

    await checkInvalidField(
      page,
      "#signupEmail",
      "Email required"
    );

    await page.locator("#signupPassword").focus();
    await page.locator("#signupPassword").blur();

    await checkInvalidField(
      page,
      "#signupPassword",
      "Password required"
    );

    await page
      .locator("#signupRepeatPassword")
      .focus();

    await page
      .locator("#signupRepeatPassword")
      .blur();

    await checkInvalidField(
      page,
      "#signupRepeatPassword",
      "Re-enter password required"
    );

    await expect(
      page.getByRole("button", {
        name: "Register",
      })
    ).toBeDisabled();
  });

  test("should validate Name field", async ({
    page,
  }) => {
    const name = page.locator("#signupName");

    await name.fill("Dmytro1");
    await name.blur();

    await checkInvalidField(
      page,
      "#signupName",
      "Name is invalid"
    );

    await name.fill("D");
    await name.blur();

    await checkInvalidField(
      page,
      "#signupName",
      "Name has to be from 2 to 20 characters long"
    );

    await expect(
      page.getByRole("button", {
        name: "Register",
      })
    ).toBeDisabled();
  });

  test("should validate Last name field", async ({
    page,
  }) => {
    const lastName =
      page.locator("#signupLastName");

    await lastName.fill("Tester1");
    await lastName.blur();

    await checkInvalidField(
      page,
      "#signupLastName",
      "Last name is invalid"
    );

    await lastName.fill("T");
    await lastName.blur();

    await checkInvalidField(
      page,
      "#signupLastName",
      "Last name has to be from 2 to 20 characters long"
    );

    await expect(
      page.getByRole("button", {
        name: "Register",
      })
    ).toBeDisabled();
  });

  test("should validate Email field", async ({
    page,
  }) => {
    const email = page.locator("#signupEmail");

    await email.fill("wrong-email");
    await email.blur();

    await checkInvalidField(
      page,
      "#signupEmail",
      "Email is incorrect"
    );

    await expect(
      page.getByRole("button", {
        name: "Register",
      })
    ).toBeDisabled();
  });

  test("should validate Password field", async ({
    page,
  }) => {
    const password =
      page.locator("#signupPassword");

    await password.fill("password");
    await password.blur();

    await checkInvalidField(
      page,
      "#signupPassword",
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );

    await expect(
      page.getByRole("button", {
        name: "Register",
      })
    ).toBeDisabled();
  });

  test("should show error when passwords do not match", async ({
    page,
  }) => {
    await page
      .locator("#signupPassword")
      .fill("Test12345");

    await page
      .locator("#signupRepeatPassword")
      .fill("Test12346");

    await page
      .locator("#signupRepeatPassword")
      .blur();

    await checkInvalidField(
      page,
      "#signupRepeatPassword",
      "Passwords do not match"
    );

    await expect(
      page.getByRole("button", {
        name: "Register",
      })
    ).toBeDisabled();
  });
});