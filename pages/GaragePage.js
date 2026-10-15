export class GaragePage {
  constructor(page) {
    this.page = page;

    this.addCarButton = page.getByRole("button", {
      name: "Add car",
    });

    this.garageTitle = page.getByRole("heading", {
      name: "Garage",
    });
  }

  async open() {
    await this.page.goto("/panel/garage");
  }
}