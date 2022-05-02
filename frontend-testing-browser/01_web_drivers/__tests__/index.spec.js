import puppeteer from 'puppeteer';
import getApp from '../views/index.js';

const port = 5000;
const host = 'localhost';
const appUrl = `http://${host}:${port}`;
const appArticlesUrl = `http://${host}:${port}/articles`;

let browser;
let page;

const app = getApp();

describe('simple blog works', () => {
    beforeAll(async () => {
        await app.listen(port, host);
        browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-gpu'],
            headless: true,
            // slowMo: 250
        });
        page = await browser.newPage();
        await page.setViewport({
            width: 1280,
            height: 720,
        });
    });

    // BEGIN
    test('main page opens', async () => {
        await page.goto(appUrl);
        await page.waitForSelector('#title');

        const bodyHandle = await page.$('html');
        const bodyContent = await bodyHandle.$eval('body', (el) => el.innerHTML);

        expect(bodyContent).toContain('Welcome to a Simple blog!');
    });

    test('articles opens', async () => {
        await page.goto(appUrl);
        await page.waitForSelector('#title');
        await page.click('a[href="/articles');
        await page.waitForSelector('#articles');

        const bodyHandle = await page.$('html');
        const bodyContent = await bodyHandle.$eval('body', (el) => el.innerHTML);

        expect(bodyContent).toContain('Articles');
    });

    test('open create form', async () => {
        await page.goto(appArticlesUrl);
        await page.waitForSelector('#articles');
        await page.click('a[href="/articles/new"]');
        await page.waitForSelector('form');

        const bodyHandle = await page.$('html');
        const bodyContent = await bodyHandle.$eval('body', (el) => el.innerHTML);

        expect(bodyContent).toContain('Create article');
    });

    test('submit create form', async () => {
        await page.goto(appArticlesUrl);
        await page.waitForSelector('#articles');
        await page.click('a[href="/articles/new"]');
        await page.waitForSelector('form');
        await page.type('[name="article[name]"]', 'TestName');
        await page.select('#category', '1');
        await page.type('#content', 'TestContent');
        await page.click('input[type="submit"]');

        await page.waitForSelector('#articles');
        const bodyHandle = await page.$('html');
        const bodyContent = await bodyHandle.$eval('body', (el) => el.innerHTML);

        expect(bodyContent).toContain('TestName');
    });

    test('open edit article', async () => {
        await page.goto(appArticlesUrl);
        await page.waitForSelector('#articles');
        await page.click('tbody > :last-child a');

        await page.waitForSelector('#edit-form');
        await page.type('[name="article[name]"]', 'EditedTestName');
        await page.select('#category', '1');
        await page.type('#content', 'EditedTestContent');
        await page.click('input[type="submit"]');

        await page.waitForSelector('#articles');
        const bodyHandle = await page.$('html');
        const bodyContent = await bodyHandle.$eval('body', (el) => el.innerHTML);

        expect(bodyContent).toContain('TestName');
    });

    test('delete article', async () => {
        await page.goto(appArticlesUrl);
        await page.waitForSelector('#articles');
        await page.click('tbody > :last-child form [type="submit"]');
        await page.waitForSelector('#articles');

        const bodyHandle = await page.$('html');
        const bodyContent = await bodyHandle.$eval('body', (el) => el.innerHTML);

        expect(bodyContent).toContain('Articles');
    });
    // END

    afterAll(async () => {
        await browser.close();
        await app.close();
    });
});
