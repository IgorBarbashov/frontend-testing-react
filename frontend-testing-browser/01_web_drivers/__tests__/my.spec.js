// TODO - see teacher solution
import puppeteer from 'puppeteer';
import getApp from '../server/index.js';

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

  it('main page opens', async () => {
    await page.goto(appUrl);
  });

  describe('articles page', () => {
    beforeEach(async () => {
      await page.goto(appArticlesUrl);
    });

    it('opens', async () => { });

    it('shows list of articles', async () => {
      const articlesListSelector = 'table#articles';
      await page.waitForSelector(articlesListSelector);
      const articlesList = await page.$(articlesListSelector);
      expect(articlesList).not.toBeNull();
    });

    it('show list of 4 items', async () => {
      const articlesSelector = 'tbody tr';
      await page.waitForSelector(articlesSelector);
      const articles = await page.$$(articlesSelector);
      expect(articles).toHaveLength(4);
    });
  });

  describe('new article button', () => {
    let newArticleButton = null;
    const newArticleUrlSegment = 'articles/new';

    beforeEach(async () => {
      await page.goto(appArticlesUrl);
      const newArticleButtonSelector = 'a[href="/articles/new"]';
      await page.waitForSelector(newArticleButtonSelector);
      newArticleButton = await page.$(newArticleButtonSelector);
    });

    it('exists', async () => {
      expect(newArticleButton).not.toBeNull();
    });

    it('opens new article form on click', async () => {
      await newArticleButton.click();

      const newArticleFormSelector = 'form[action="/articles"]';
      await page.waitForSelector(newArticleFormSelector);
      const newArticleForm = await page.$(newArticleFormSelector);
      expect(page.url()).toContain(newArticleUrlSegment);
      expect(newArticleForm).not.toBeNull();
    });
  });

  it('new article form can be filled and submitted', async () => {
    const nameSelector = '#name';
    const categorySelector = '#category';
    const contentSelector = '#content';
    const submitSelector = 'input[type="submit"]';

    await page.goto(`${appArticlesUrl}/new`);

    await page.waitForSelector(nameSelector);
    const nameField = await page.$(nameSelector);
    expect(nameField).not.toBeNull();
    await page.$eval(nameSelector, el => el.value = 'Igor');

    await page.waitForSelector(categorySelector);
    const categoryField = await page.$(categorySelector);
    expect(categoryField).not.toBeNull();
    await page.$eval(categorySelector, el => el.value = 'omnis quisquam quisquam');

    await page.waitForSelector(contentSelector);
    const contentField = await page.$(contentSelector);
    expect(contentField).not.toBeNull();
    await page.$eval(contentSelector, el => el.value = 'My new article');

    await page.waitForSelector(submitSelector);
    const submitButton = await page.$(submitSelector);
    await submitButton.click();
  });

  it('after new article creation page should be redirected to articles list and contains new article', async () => {
    let beforeAddCount = 0;
    let afterAddCount = 0;
    const articlesListSelector = 'table#articles';
    const articlesSelector = 'tbody tr';
    const newArticleFormSelector = 'form[action="/articles"]';
    const nameSelector = '#name';
    const submitSelector = 'input[type="submit"]';

    await page.goto(appArticlesUrl);
    await page.waitForSelector(articlesListSelector);
    beforeAddCount = (await page.$$(articlesSelector)).length;

    await page.goto(`${appArticlesUrl}/new`);
    await page.waitForSelector(newArticleFormSelector);
    await page.$eval(nameSelector, el => el.value = 'Igor');
    const submitButton = await page.$(submitSelector);
    await submitButton.click();

    await page.waitForSelector(articlesListSelector);
    const articles = await page.$$(articlesSelector);
    afterAddCount = articles.length;

    expect(page.url()).toBe(appArticlesUrl);
    expect(afterAddCount).toBe(beforeAddCount + 1);
  });

  afterAll(async () => {
    await browser.close();
    await app.close();
  });
});
