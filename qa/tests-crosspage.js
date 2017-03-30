var Browser = require('zombie'),
    assert = require('chai').assert;

var browser;

suite('Cross-Page Tests', () => {

  setup(() => {
    browser = new Browser();
  });

  test('requesting a group rate from the hood river tour page should populate the referrer field', (done) => {
    var referrer = 'http://localhost:3000/tours/hood-river';
    browser.visit(referrer, () => {
      browser.clickLink('.requestGroupRate', () => {
        assert(browser.field('referrer').value === referrer);
        done();
      });
    });
  });

  test('requesting a group rate from the oregon coast tour page should populate the referrer field', (done) => {
    var referrer = 'http://localhost:3000/tours/oregon-coast';
    browser.visit(referrer, () => {
      browser.clickLink('.requestGroupRate', () => {
        assert(browser.field('referrer').value === referrer);
        done();
      });
    });
  });

  test('visiting the "request group rate" page directly should result in an empty referrer field', (done) => {
    browser.visit('http://localhost:3000/tours/request-group-rate', () => {
      assert(browser.field('referrer').value === '');
      done();
    });
  });
});