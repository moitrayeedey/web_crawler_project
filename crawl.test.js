const {normalizeURL} = require('./crawl.js');
const {test, expect} = require('@jest/globals');

test('normalizeURL strip protocol', () => {
    const input = 'https://blog.boot.dev/path';
    const actualOutput = normalizeURL(input);
    const expectedOutput = 'blog.boot.dev/path';
    expect(actualOutput).toEqual(expectedOutput);
})
test('normalizeURL trailing slash elimination', () => {
    const input = 'https://blog.boot.dev/path/';
    const actualOutput = normalizeURL(input);
    const expectedOutput = 'blog.boot.dev/path';
    expect(actualOutput).toEqual(expectedOutput);
})
test('normalizeURL capitalization ignore', () => {
    const input = 'https://BLOG.boot.dev/path/';
    const actualOutput = normalizeURL(input);
    const expectedOutput = 'blog.boot.dev/path';
    expect(actualOutput).toEqual(expectedOutput);
})
test('normalizeURL protocol strip', () => {
    const input = 'http://blog.boot.dev/path/';
    const actualOutput = normalizeURL(input);
    const expectedOutput = 'blog.boot.dev/path';
    expect(actualOutput).toEqual(expectedOutput);
})