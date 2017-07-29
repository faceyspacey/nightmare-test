
import Nightmare from 'nightmare'

describe('test duckduckgo search results', () => {
  it('should find the nightmare github link first', () => {
    const nightmare = Nightmare()

    console.log('START TEST')

    return nightmare
      .goto('https://duckduckgo.com')
      .type('#search_form_input_homepage', 'github nightmare')
      .click('#search_button_homepage')
      .wait('.result__a')
      .evaluate(() => document.querySelector('.result__a').href)
      .end()
      .then(link => {
        console.log('LINK:', link)
        expect(link).toEqual('https://github.com/segmentio/nightmare');
      })
      .catch(function (e) {
        throw (e instanceof Error ? e : new Error(e));
      })
  });
});