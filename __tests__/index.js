
import Nightmare from 'nightmare'

// Later when you present this to your team, you can talk with them about what actual accounts to use.
// For now, i created an account in the system that works every time on login.
const email = 'jamesgillmore@faceyspacey.com'
const password = 'faceyspacey123'
const baseUrl = 'https://develop.realdcf.io/'

describe('test realogic dashboard login', () => {
  it('should login to an existing user account from the homepage', () => {
    console.log('START TEST')

    const nightmare = Nightmare({
      openDevTools: {                         // Gina, these options will temporarily open the automated web-browser as the code operates on it!
        mode: 'detach'                        // when the test is complete, the browser will disappear                 
      },
      show: true,
      waitTimeout: 30 * 1000 // 30 seconds    // this might have been the only problem in our session: the dev server is slow, and took too long
    })

    const path = ''                           // in this case, there is no path since we are starting on the homepage

    return nightmare
      .goto(baseUrl + path)
      .wait('.login')                         // wait until the element with class .login is on the page (that means the page loaded)
      .click('.login a')                      // click it to display login form "modal"
      .wait('input[name=email]')              // wait until the email input is on the page, which means we are almost ready to fill it out
      .wait(1000)                             // wait an additional second for the form entrance animation to complete
      .type('input[name=email]', email)       // fill out email field
      .type('input[name=password]', password) // fill out password field
      .click('button.auth0-lock-submit')      // click submit button
      .wait('#nav-primary')                   // wait until the next page is finished loading, determined by when element with id #nav-primary is present
      .exists('#nav-primary')                 // then, for now, simply check its existence as an indicator that the login was a success!
      .end()
      .then(sideBarExists => {
        console.log('sideBarExists:', sideBarExists)
        expect(sideBarExists).toEqual(true);  // finally perform the actual test
      })
      .catch(function (err) {
        // for now re-throw the error correctly
        // as nightmare weirdly throws a string: 
        // https://github.com/wallabyjs/public/issues/1015#issuecomment-279672592
        throw (err instanceof Error ? err : new Error(err));
      })
  });
});

// SUMMARY OF TECHNIQUES:
// Gina, here are the functions you will be using in all your tests:

// - .goto(url)
// - .wait(idOrClassSelector)
// - .click(idOrClassSelector)
// - .type(idOrClassSelector, textYouWannaType)
// - .exists(idOrClassSelector) -- will detect if the idOrSelector exists, and pass a true/false value to .then() (skipping .end() in between)
// - .end() -- must be called before you start looking at stuff on the page 
// - .then() -- called immediately after .end(), and it will return the results of the function called directly before .end(), in this case, exists()

// - .evaluate(functionExecutedWithinBrowserPage) - this is the most powerful function you will use. You will want to study the docs on this one:
// https://github.com/segmentio/nightmare#evaluatefn-arg1-arg2
// We can work on it in a future session if you want. Basically you use it to get the values of things on the page, eg:
// return document.querySelector('#some-link).href
//
// and then you can write a test like this: expect(link).toEqual('https://develop.realdcf.io/dashboard)

// NOTE 1: "document.querySelector" is browser-based function that takes an idOrClassSelector
// just like you pass to the Nightmare functions. You use it to select elements on the page,
// and then in the final test you check that those elements have the values you want.

// NOTE 2: the idOrClassSelector can actually be more complex than just a single #id or #className. 
// To write browser tests using Nighmare or any solution, you will need to brush up on your CSS. I recommend 
// going through a tutorial like this one or any you find and like on the net:
// https://www.w3schools.com/css/



// ASSIGNMENT:
// 1. copy paste the above code within the `it` function
// 2. and replace the call to .exists and .then with the following code:

// .evaluate(() => document.querySelector('.navbar-brand').href)
// .end()
// .then(href => {
//   console.log('href:', href)
//   expect(href).toEqual('https://develop.realdcf.io/folder/explorer'); 
// })

// remove the .skip when you are ready for it to run as we did on Saturday:

describe.skip('test realogic dashboard login (ASSIGNMENT)', () => {
  it('logs in and verifies the top left dashboard link is correct', () => {
    //
  })
})

// NOTE: what this test does is check that the a.navbar-brand href in the top left
// equals https://develop.realdcf.io/folder/explorer