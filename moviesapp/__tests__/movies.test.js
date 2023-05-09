const { Builder, Browser, By, until, Key } = require("selenium-webdriver");

let driver;

beforeEach(async () => {
  driver = await new Builder().forBrowser(Browser.CHROME).build();
});

afterEach(async () => {
  await driver.quit();
});

describe("testing the movies app", () => {
  test("can add a movie", async() => {
    //navigate to the web app
    await driver.get('http://localhost:3000')
    //Find the input and type in the movie
    await driver.findElement(By.css('input[name="movieTitle"]')).sendKeys('Encanto')
    //find the add button and click it
    await driver.findElement(By.css('button[type="submit"]')).click()
    //wait until the movie appears on the list
    const addedMovie = await driver.wait(until.elementLocated(By.css("#movies-list li label")),1000)
    //check if the movie is in the list
    expect(await addedMovie.getText()).toBe('Encanto')
  });
});
