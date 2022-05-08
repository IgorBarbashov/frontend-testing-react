/* eslint-disable  no-undef */
import 'expect-puppeteer';

const port = 5000;
const host = 'localhost';
const appUrl = `http://${host}:${port}`;
const articlesPageUrl = `${appUrl}/articles`;

describe('Simple blog', () => {
  const articlesPageLinkSelector = '[data-testid="nav-articles-index-link"]';
  const createNewArticleLinkSelector = '[data-testid="article-create-link"]';
  const newArticleFormSelector = 'form[action="/articles"]';
  const newArticleCreateFormLinkSelector = '[data-testid="article-create-button"]';
  const lasArticleEditLinkSelector = 'tbody > :last-child a';
  const articleUpdateFormLinkSelector = '[data-testid="article-update-button"]';
  const lasArticleDeleteLinkSelector = 'tbody > :last-child form [type="submit"]';

  describe('main page', () => {
    beforeEach(async () => {
      await page.goto(appUrl);
    });

    it('opens', async () => {
      await expect(page).toMatch('Welcome to a Simple blog!');
    });

    it('opens article page', async () => {
      await Promise.all([
        page.click(articlesPageLinkSelector),
        page.waitForNavigation()
      ]);
      await expect(page).toMatch('Articles');
    });
  });

  describe('articles page', () => {
    beforeEach(async () => {
      await page.goto(articlesPageUrl);
    });

    it('opens create form', async () => {
      await Promise.all([
        page.click(createNewArticleLinkSelector),
        page.waitForNavigation()
      ]);
      await expect(page).toMatch('Create article');
    });

    it('submit create form', async () => {
      await Promise.all([
        page.click(createNewArticleLinkSelector),
        page.waitForNavigation()
      ]);
      await expect(page).toMatch('Create article');
      await expect(page).toMatch('Content');
      await expect(page).toFillForm(newArticleFormSelector, {
        'article[name]': 'Igor',
        'article[content]': 'My new article'
      });
      const valueOfTheFirstCategoryOptions = await page.$eval('option:nth-child(2)', el => el.value);
      await expect(page).toSelect('[name="article[categoryId]"]', valueOfTheFirstCategoryOptions);
      await Promise.all([
        page.click(newArticleCreateFormLinkSelector),
        page.waitForNavigation()
      ]);
      await expect(page).toMatch('Igor');
    });

    it('edit article', async () => {
      await Promise.all([
        page.click(lasArticleEditLinkSelector),
        page.waitForNavigation()
      ]);
      await expect(page).toMatch('Edit article');
      await expect(page).toFill('[name="article[name]"]', 'Igor - Edited name');
      await Promise.all([
        page.click(articleUpdateFormLinkSelector),
        page.waitForNavigation()
      ]);
      await expect(page).toMatch('Articles');
      await expect(page).toMatch('Igor - Edited name');
    });

    it('delete article', async () => {
      const articlesCountBefore = (await page.$$('tbody > tr')).length;
      await Promise.all([
        page.click(lasArticleDeleteLinkSelector),
        page.waitForNavigation()
      ]);
      await expect(page).toMatch('Articles');
      const articlesCountAfter = (await page.$$('tbody > tr')).length;
      expect(articlesCountAfter).toBe(articlesCountBefore - 1);
    });
  });
});
