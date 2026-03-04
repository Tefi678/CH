class RegisterPage {
    constructor(page) {
        this.page = page;
        this.firstNameInput = page.locator('#AccountFrm_firstname');
        this.lastNameInput = page.locator('#AccountFrm_lastname');
        this.emailInput = page.locator('#AccountFrm_email');
        this.addressInput = page.locator('#AccountFrm_address_1');
        this.cityInput = page.locator('#AccountFrm_city');
        this.countrySelect = page.locator('#AccountFrm_country_id');
        this.zoneSelect = page.locator('#AccountFrm_zone_id');
        this.postcodeInput = page.locator('#AccountFrm_postcode');
        this.loginNameInput = page.locator('#AccountFrm_loginname');
        this.passwordInput = page.locator('#AccountFrm_password');
        this.confirmPasswordInput = page.locator('#AccountFrm_confirm');
        this.newsletterNoRadio = page.locator('#AccountFrm_newsletter0');
        this.privacyPolicyCheckbox = page.locator('#AccountFrm_agree');
        this.continueBtn = page.getByRole('button', { name: 'Continue' });
    }

    async fillRegistrationForm(user, loginName, email, password) {
        await this.firstNameInput.fill(user.firstname);
        await this.lastNameInput.fill(user.lastname);
        await this.emailInput.fill(email);
        await this.addressInput.fill(user.address_1);
        await this.cityInput.fill(user.city);
        await this.countrySelect.selectOption({ label: user.country_id });
        await this.zoneSelect.selectOption({ label: user.zone_id });
        await this.postcodeInput.fill(user.postcode);
        await this.loginNameInput.fill(loginName);
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(password);
        await this.newsletterNoRadio.check();
        await this.privacyPolicyCheckbox.check();
        await this.continueBtn.click();
    }
}
module.exports = { RegisterPage };