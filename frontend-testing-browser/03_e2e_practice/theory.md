## Mock Service Worker

- API mocking of the next generation
- Intercepts requests on the network level, not thew application level
- You can use axios, fetch, XHR, whatever

```javascript
// handlers.js
import { rest } from 'msw';

export const handlers = [
  rest.post('/login', (req, res, ctx) => {
    // Persist user's authentication in the session
    sessionStorage.setItem('is-authenticated', 'true');
    
    return res(
      //  Rspod with 200 status code
      ctx.status(200)
    );
  })
];
```

```javascript
// browser.js
import { setupWorker } from 'msw';
import { handlers } from './handlers';

// This configure a Servive Worker with the given requiest handler
export const worker = setupWorker(...handlers);
```

```jsx
// src/index.js
import React from 'react';
import ReactDOM from 'reatc-dom';
import App from './App/jsx';

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./browser');
  worker.start();
}

ReactDOM.render(<App />, document.getElementById('root'));
```
```javascript
import { rest } from 'msw';

export const handlers = [
  rest.get('/user', (req, res, ctx) => {
    // Check if the user is authenticated in this session
    const isAuthenticated = sessionStorage.getItem('is-authenticated');
    
    if (!isAuthenticated) {
      // If not authenticated, respond with a 403 error
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Not authorized',
        })
      );
    }

    // If authenticated, return a mocked user details
    return res(
      ctx.status(200),
      ctx.json({
        username: 'admin',
      })
    );
  })
];
```

**Benefits**
- You can use it for development, debugging
- Support of REST API and GraphQL
- Client-side execution
- Native TypeScript support
- Agnostic of the frameworks

## Page Object Pattern

**Problems**
- много тестов
- много кода в тестах
- сложно понимать структуру и флоу

**Reasons for using pattern**
- упрощение разработки
- упрощение поддержки
- high-level API
- create reusable code to avoid repetition `DRY`

**High-level implementation**
- A page object wraps an `HTML` page or fragment
- With in application-specific API
- Manipulate with page elements without digging into `HTML`
- `findElementWithClass('album')` -> `selectAlbumWithTitle()`
- `findElementWithClass('rating').setText(5)` -> `updateRating(5)`

**Abstract example**

Page object class:
```javascript
export class SearchPage {
  constructor(page) {
    this.page = page;
  }
  
  async navigate() {
    await this.page.goto('https://mail.ru');
  }
  
  async search(text) {
    await this.page.fill('[data-testid="searchg-input"]', text);
    await this.pge.press('[data-testid="search-button"]', 'Enter');
  }
}
```

In test:
```javascript
import SearchPage from './models/SearchPage';

test('search', async () => {
  const page = await browser.newPage();
  const searchPage = new SearchPage(page);
  
  await searchPage.navgate();
  await searchPage.search('search query');
});
```

**Benefits**
- If UI changes for the page
  - tests themselves don't need to change
  - code within the page object needs to change
- All changes to support that new UI are located in one place
- There is a single repository for the services or operations offered by the page rather than having these services throughout all tests
- The code easier to understand
- There is a clean separation between test code and page specific code such as locators and layouts

**Before/after example with Selenium**

Source:
```typescript
test('login', () => {
  // full login data on the sign-in page
  driver.findElement(By.name('username')).sendKeys('testUser');
  driver.findElement(By.name('password')).sendKeys('testPassword');
  driver.findElement(By.name('sign-in')).click();
  
  // verify h1 tag is 'Hello userName' after login
  driver.findElement(By.tagName('h1')).isDisplayed();
  expect(driver.findElement(By.tagName('h1')).getText()).toBe('Hello testUser');
});
```

With Page Object Pattern:
```typescript
class SignInPage {
  protected driver: WebDriver;
  
  // <input name='user_name' type='text' value=''>
  private usernameBy: By = By.name('username');
  // <input name='password' type='password' value=''>
  private passwordBy: By = By.name('password');
  // <input name='sign_in' type='submit' value='SignIn'>
  private signinBy: By = By.name('sign-in');
  
  constructor(driver) {
    this.driver = driver;
  }
  
  loginValidUser(userName: string, password: string): HomePage {
    diver.findElement(this.usernameBy).sendKeys(userName);
    diver.findElement(this.passwordBy).sendKeys(password);
    diver.findElement(this.signinBy).click();
    return new HomePge(driver);
  }
}
```

```typescript
class HomePage {
  protected driver: WebDriver;
  
  // <h1>Hello userName</h1>
  private messageBy: By = By.tagName('h1');
  
  constructor(driver: WebDriver) {
    this.driver = driver;
    if (!driver.getTitle().equals('Home page of logged in user')) {
      throw new Error('This is not Home page of logged in user');
    }
  }
  
  getMessageText(): string {
    return driver.findElement(messageBy).getText();
  }
}
```

```typescript
test('login', () => {
  const signInPage: SignInPage = new SignInPage(driver);
  const homePage: HomePage = signInPage.loginValidUser('userName', 'userPassword');
  expect(homePage.getMessageText()).toBe('Hello userName');
});
```

**Rules**
- Page object themselves should never make verifications or assertions
- The page object contains the representation of the page
- No code related to what is being tested should be within the page object
- Exception: verify that page is correct
- Don't create for entire page, only meaningful elements
  - header, footer, user list, login etc
- The public methods represent the services that the page offers
- Try not to expose the internals of the page

**Если поведение должно отличаться**

```typescript
class LoginPage {
  public loginAs(username: string, password: string): HomePage {
    // ...login here
  }

  public loginAsExpectingError(username: string, password: string): LoginPage {
    // ...  failed login here
  }
  
  public getErrorMessage(): string {
    // So we can verify that the correct error is shown
  }
}
```
