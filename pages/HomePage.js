class HomePage {
    constructor(page) {
        this.page = page;
        this.productList = page.locator('.inventory_list');
        this.cartIcon = page.locator('//button[@id="add-to-cart-sauce-labs-backpack"]');
        this.cartBadge = page.locator('//div[@id="shopping_cart_container"]//span[@class="shopping_cart_badge"]');
        this.checkoutButton = page.locator('//button[@id="checkout"]');
        // this.profileMenu = page.locator('#react-burger-menu-btn');
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
        await this.cartIcon.click();
        await this.cartBadge.click();
        await this.checkoutButton.click();
        await this.logoutButton.click();
    }
}

module.exports = { HomePage };