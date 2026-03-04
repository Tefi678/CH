import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LoginPage';
// Importación corregida para JSON en TS
import userData from '../data/users.json';

// CORRECCIÓN: Se cerró la comilla después de 'Happy Path Automation'
test('Happy Path Automation', async ({ page }) => {
    const register = new RegisterPage(page);
    const login = new LoginPage(page);
    
    const uniqueId = Date.now();
    const loginName = `user${uniqueId}`;
    const email = `test${uniqueId}@example.com`;
    const password = "Password123!";

    await page.goto('/');
    await page.getByRole('link', { name: 'Login or register' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();

    // Paso 3 al 6: Registro completo
    await register.fillRegistrationForm(userData.personalData, loginName, email, password);

    // Paso 7: Confirmación
    await page.getByRole('link', { name: 'Continue' }).click();

    // Paso 8 y 9: Logout
    await login.logout();
    await page.getByRole('link', { name: 'Continue' }).click();

    // Paso 10, 11 y 12: Re-Login
    await page.getByRole('link', { name: 'Login or register' }).click();
    await login.login(loginName, password);

    // Verificación final
    await expect(page).toHaveURL(/.*account\/account/);
});