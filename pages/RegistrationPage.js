export class RegistrationPage {
  constructor(page) {
    this.page = page;

    this.signUpButton = page.getByRole("button", {
      name: "Sign up",
    });

    this.registrationTitle = page.getByText(
      "Registration",
      {
        exact: true,
      }
    );

    this.nameInput = page.locator("#signupName");

    this.lastNameInput = page.locator(
      "#signupLastName"
    );

    this.emailInput = page.locator(
      "#signupEmail"
    );

    this.passwordInput = page.locator(
      "#signupPassword"
    );

    this.repeatPasswordInput = page.locator(
      "#signupRepeatPassword"
    );

    this.registerButton = page.getByRole(
      "button",
      {
        name: "Register",
      }
    );
  }

  async open() {
    await this.page.goto("/");
    await this.signUpButton.click();
  }

  async fillName(name) {
    await this.nameInput.fill(name);
  }

  async fillLastName(lastName) {
    await this.lastNameInput.fill(lastName);
  }

  async fillEmail(email) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password) {
    await this.passwordInput.fill(password);
  }

  async fillRepeatPassword(password) {
    await this.repeatPasswordInput.fill(password);
  }

  async fillRegistrationForm({
    name,
    lastName,
    email,
    password,
    repeatPassword,
  }) {
    await this.fillName(name);
    await this.fillLastName(lastName);
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.fillRepeatPassword(
      repeatPassword
    );
  }

  async submit() {
    await this.registerButton.click();
  }

  getError(message) {
    return this.page.getByText(message, {
      exact: true,
    });
  }
}