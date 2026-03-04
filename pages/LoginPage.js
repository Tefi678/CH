class LoginPage {
    constructor(page) {
        this.page = page;
        this.loginNameInput = page.locator('#loginFrm_loginname');
        this.passwordInput = page.locator('#loginFrm_password');
        this.loginBtn = page.getByRole('button', { name: 'Login' });
        this.logoffBtn = page.locator('.side_column_right').getByRole('link', { name: 'Logoff' });
    }

    async login(username, password) {
        await this.loginNameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginBtn.click();
    }

    async logout() {
        await this.logoffBtn.click();
    }
}
module.exports = { LoginPage };