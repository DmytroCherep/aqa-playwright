import { test, expect } from "@playwright/test";
import { RegistrationPage } from "../pages/RegistrationPage.js";

test.describe("HW 25.1 - Registration with POM", () => {
  let registrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);

    await registrationPage.open();

    await expect(
      registrationPage.registrationTitle
    ).toBeVisible();
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

    await registrationPage.fillRegistrationForm({
      name,
      lastName,
      email,
      password,
      repeatPassword: password,
    });

    await expect(
      registrationPage.registerButton
    ).toBeEnabled();

    await registrationPage.submit();

    await expect(page).toHaveURL(
      /\/panel\/garage/
    );
  });

  test("should show errors for required fields", async () => {
    await registrationPage.nameInput.focus();
    await registrationPage.nameInput.blur();

    await expect(
      registrationPage.nameInput
    ).toHaveClass(/is-invalid/);

    await expect(
      registrationPage.getError("Name required")
    ).toBeVisible();

    await registrationPage.lastNameInput.focus();
    await registrationPage.lastNameInput.blur();

    await expect(
      registrationPage.lastNameInput
    ).toHaveClass(/is-invalid/);

    await expect(
      registrationPage.getError(
        "Last name required"
      )
    ).toBeVisible();

    await registrationPage.emailInput.focus();
    await registrationPage.emailInput.blur();

    await expect(
      registrationPage.emailInput
    ).toHaveClass(/is-invalid/);

    await expect(
      registrationPage.getError("Email required")
    ).toBeVisible();

    await registrationPage.passwordInput.focus();
    await registrationPage.passwordInput.blur();

    await expect(
      registrationPage.passwordInput
    ).toHaveClass(/is-invalid/);

    await expect(
      registrationPage.getError(
        "Password required"
      )
    ).toBeVisible();

    await registrationPage.repeatPasswordInput.focus();
    await registrationPage.repeatPasswordInput.blur();

    await expect(
      registrationPage.repeatPasswordInput
    ).toHaveClass(/is-invalid/);

    await expect(
      registrationPage.getError(
        "Re-enter password required"
      )
    ).toBeVisible();

    await expect(
      registrationPage.registerButton
    ).toBeDisabled();
  });

  test("should validate Name field", async () => {
    await registrationPage.fillName("Dmytro1");
    await registrationPage.nameInput.blur();

    await expect(
      registrationPage.nameInput
    ).toHaveClass(/is-invalid/);

    await expect(
      registrationPage.getError(
        "Name is invalid"
      )
    ).toBeVisible();

    await registrationPage.fillName("D");
    await registrationPage.nameInput.blur();

    await expect(
      registrationPage.getError(
        "Name has to be from 2 to 20 characters long"
      )
    ).toBeVisible();

    await expect(
      registrationPage.registerButton
    ).toBeDisabled();
  });

  test("should validate Last name field", async () => {
    await registrationPage.fillLastName(
      "Tester1"
    );

    await registrationPage.lastNameInput.blur();

    await expect(
      registrationPage.lastNameInput
    ).toHaveClass(/is-invalid/);

    await expect(
      registrationPage.getError(
        "Last name is invalid"
      )
    ).toBeVisible();

    await registrationPage.fillLastName("T");

    await registrationPage.lastNameInput.blur();

    await expect(
      registrationPage.getError(
        "Last name has to be from 2 to 20 characters long"
      )
    ).toBeVisible();

    await expect(
      registrationPage.registerButton
    ).toBeDisabled();
  });

  test("should validate Email field", async () => {
    await registrationPage.fillEmail(
      "wrong-email"
    );

    await registrationPage.emailInput.blur();

    await expect(
      registrationPage.emailInput
    ).toHaveClass(/is-invalid/);

    await expect(
      registrationPage.getError(
        "Email is incorrect"
      )
    ).toBeVisible();

    await expect(
      registrationPage.registerButton
    ).toBeDisabled();
  });

  test("should validate Password field", async () => {
    await registrationPage.fillPassword(
      "password"
    );

    await registrationPage.passwordInput.blur();

    await expect(
      registrationPage.passwordInput
    ).toHaveClass(/is-invalid/);

    await expect(
      registrationPage.getError(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      )
    ).toBeVisible();

    await expect(
      registrationPage.registerButton
    ).toBeDisabled();
  });

  test("should show error when passwords do not match", async () => {
    await registrationPage.fillPassword(
      "Test12345"
    );

    await registrationPage.fillRepeatPassword(
      "Test12346"
    );

    await registrationPage.repeatPasswordInput.blur();

    await expect(
      registrationPage.repeatPasswordInput
    ).toHaveClass(/is-invalid/);

    await expect(
      registrationPage.getError(
        "Passwords do not match"
      )
    ).toBeVisible();

    await expect(
      registrationPage.registerButton
    ).toBeDisabled();
  });
});