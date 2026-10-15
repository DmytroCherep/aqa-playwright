import {
  test,
  expect,
} from "../fixtures/userGaragePage.js";

test.describe("HW 29.1 - Network and API Request", () => {
  test("should display mocked user profile data", async ({
    userGaragePage,
  }) => {
    const page = userGaragePage.page;

    await page.route(
      "**/api/users/profile",
      async (route) => {
        const response = await route.fetch();
        const body = await response.json();

        await route.fulfill({
          response,
          json: {
            ...body,
            data: {
              ...body.data,
              name: "AQA",
              lastName: "Tester",
            },
          },
        });
      }
    );

    await page.goto("/panel/profile");

    await expect(
      page.getByText("AQA Tester", {
        exact: true,
      })
    ).toBeVisible();
  });

  test("should create a car using APIRequestContext", async ({
    request,
  }) => {
    const mileage =
      100000 + (Date.now() % 800000);

    const response = await request.post(
      "/api/cars",
      {
        data: {
          carBrandId: 1,
          carModelId: 1,
          mileage,
        },
      }
    );

    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    expect(body.status).toBe("ok");
    expect(body.data.id).toBeDefined();
    expect(body.data.carBrandId).toBe(1);
    expect(body.data.carModelId).toBe(1);
    expect(body.data.mileage).toBe(mileage);
  });

  test("should not create a car with empty request body", async ({
    request,
  }) => {
    const response = await request.post(
      "/api/cars",
      {
        data: {},
      }
    );

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.status).toBe("error");
  });

  test("should not create a car with invalid data types", async ({
    request,
  }) => {
    const response = await request.post(
      "/api/cars",
      {
        data: {
          carBrandId: "Audi",
          carModelId: "TT",
          mileage: "invalid",
        },
      }
    );

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.status).toBe("error");
  });
});