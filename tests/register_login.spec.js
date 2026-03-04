const { test, expect } = require('@playwright/test');
const { RegisterPage } = require('../pages/RegisterPage');
const { LoginPage } = require('../pages/LoginPage');
const userData = require('../data/users.json');

test('Happy Path con Page Object Model', async ({ page }) => {
    const register = new RegisterPage(page);
    const login = new LoginPage(page);
    
    const uniqueId = Date.now();
    const loginName = `user_${uniqueId}`;
    const email = `test${uniqueId}@mail.com`;
    const pass = "Password123!";

    // 1 y 2. Navegar y continuar a registro
    await page.goto('/');
    await page.getByRole('link', { name: 'Login or register' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();

    // 3 al 6. Llenar formulario usando la Page Object
    await register.fillRegistrationForm(userData.personalData, loginName, email, pass);

    // 7. Éxito
    await page.getByRole('link', { name: 'Continue' }).click();

    // 8 y 9. Logout
    await login.logout();
    await page.getByRole('link', { name: 'Continue' }).click();

    // 10, 11 y 12. Login de nuevo
    await page.getByRole('link', { name: 'Login or register' }).click();
    await login.login(loginName, pass);

    // Verificación
    await expect(page).toHaveURL(/.*account\/account/);
});