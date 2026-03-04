import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly loginNameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginBtn: Locator;
    readonly logoffBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginNameInput = page.locator('#loginFrm_loginname');
        this.passwordInput = page.locator('#loginFrm_password');
        this.loginBtn = page.getByRole('button', { name: 'Login' });
        this.logoffBtn = page.locator('a:has-text("Logoff")').last();
    }

    async login(username: string, pass: string) {
        await this.loginNameInput.fill(username);
        await this.passwordInput.fill(pass);
        await this.loginBtn.click();
    }

    async logout() {
        await this.logoffBtn.waitFor({ state: 'visible' });
        await this.logoffBtn.click();
    }
}