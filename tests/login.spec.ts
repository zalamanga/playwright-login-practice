import { test, expect } from '@playwright/test';

const url = 'https://saucedemo.com'
const standard_user = "standard_user"
const locked_out_user = "locked_out_user"
const valid_password = "secret_sauce"
const invalid_password = "123456"
const onethousand_password = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sollicitudin, felis non venenatis feugiat, metus nulla finibus risus, non porta urna libero et ligula. Suspendisse non nulla at ante aliquet semper. Sed vel risus in felis egestas egestas maximus vitae neque. Integer dignissim, dui id mollis suscipit, nulla ex dignissim mi, eu dictum erat nisi in massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus odio ipsum, viverra quis consectetur sed, sagittis ut nisl. Cras porttitor sit amet tellus non tincidunt. Sed pellentesque magna sem, non pellentesque ex finibus vitae. Curabitur eu tincidunt ipsum, eget malesuada nunc. Pellentesque sit amet odio a est tempus vestibulum at in risus. Integer tortor arcu, volutpat eu varius id, convallis at ligula. Etiam sit amet diam ac odio pellentesque imperdiet. Vestibulum mattis cursus dignissim. Sed quis justo vel orci porta commodo in ut ante. Aenean consectetur nibh a justo porta, vitae molestie augue luctus. Donec justo elit, dictum ut tortor nec, finibus fringilla odio."


const msg_wrong_password = "Epic sadface: Username and password do not match any user in this service"
const msg_locked_user = "Epic sadface: Sorry, this user has been locked out."
const msg_password_required = "Epic sadface: Password is required"

test('Login dengan username standard_user dan password yang valid', async ({ page }) => {
    await page.goto(url);

    await expect(page).toHaveTitle(/Swag Labs/);
    await expect(page.getByText("Swag Labs")).toBeVisible()
    await expect(page.getByText("Login")).toBeVisible()

    await page.locator('#user-name').fill(standard_user);
    await page.locator('#password').fill(valid_password);

    await page.locator('#login-button').click();

    await page.waitForURL('**/inventory.html');
    await page.waitForLoadState('domcontentloaded')

    await expect(page.getByText("Products")).toBeVisible()
});


test('Login dengan username standard_user dan password yang tidak valid', async ({ page }) => {
    await page.goto(url);

    await expect(page).toHaveTitle(/Swag Labs/);
    await expect(page.getByText("Swag Labs")).toBeVisible()
    await expect(page.getByText("Login")).toBeVisible()

    await page.locator('#user-name').fill(standard_user);
    await page.locator('#password').fill(invalid_password);

    await page.locator('#login-button').click();
    await page.waitForSelector('.error-message-container')

    await expect(page.getByText(msg_wrong_password)).toBeVisible()
});



test('Login dengan username locked_out_user dan password yang valid', async ({ page }) => {
    await page.goto(url);

    await expect(page).toHaveTitle(/Swag Labs/);
    await expect(page.getByText("Swag Labs")).toBeVisible()
    await expect(page.getByText("Login")).toBeVisible()

    await page.locator('#user-name').fill(locked_out_user);
    await page.locator('#password').fill(valid_password);

    await page.locator('#login-button').click();
    await page.waitForSelector('.error-message-container')

    await expect(page.getByText(msg_locked_user)).toBeVisible()
});



test('Login dengan username standard_user dan password 1000 karakter', async ({ page }) => {
    await page.goto(url);

    await expect(page).toHaveTitle(/Swag Labs/);
    await expect(page.getByText("Swag Labs")).toBeVisible()
    await expect(page.getByText("Login")).toBeVisible()

    await page.locator('#user-name').fill(standard_user);
    await page.locator('#password').fill(onethousand_password);

    await page.locator('#login-button').click();
    await page.waitForSelector('.error-message-container')

    await expect(page.getByText(msg_wrong_password)).toBeVisible()
});



test('Login dengan username standard_user dan password kosong (0 karakter)', async ({ page }) => {
    await page.goto(url);

    await expect(page).toHaveTitle(/Swag Labs/);
    await expect(page.getByText("Swag Labs")).toBeVisible()
    await expect(page.getByText("Login")).toBeVisible()

    await page.locator('#user-name').fill(standard_user);
    await page.locator('#password').fill("");

    await page.locator('#login-button').click();
    await page.waitForSelector('.error-message-container')

    await expect(page.getByText(msg_password_required)).toBeVisible()
});