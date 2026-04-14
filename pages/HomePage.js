class HomePage {
    constructor(page) {
        this.page = page;
        this.productList = page.locator('.inventory_list');
        this.profileMenu = page.locator('#react-burger-menu-btn');
        this.logoutButton = page.locator('#logout_sidebar_link');
    }

    async goto() {
        await this.page.goto('https://www.saucedemo.com/inventory.html');
    }

    async waitForHomePage() {
        await this.productList.waitFor({ state: 'visible' });
    }

    async logout() {
        await this.profileMenu.click();
        await this.logoutButton.click();
    }
}

module.exports = { HomePage };