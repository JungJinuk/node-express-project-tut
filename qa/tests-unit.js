var fortune = require('../lib/fortune.js');
var expect = require('chai').expect;
suite('Fortune cookie tests', () => {
  test('getFortune() should return a fortune', () => {
    expect(typeof fortune.getFortune() === 'string');
  });
});