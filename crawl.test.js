const {normalizeURL} = require('./crawl.js');
const {test, expect} = require('@jest/globals');
const {getURLsFromHTML} = require('./crawl.js');

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
test('getURLsFromHTML absolute urls', () => {
    const inputHTMLBody = 
    `<html>
        <body>
            <a href="https://blog.boot.dev/">
            Boot.dev blog
            </a>
        </body>
    </html>`;
    const baseURL = "https://blog.boot.dev";
    const actualOutput = getURLsFromHTML(inputHTMLBody,baseURL);
    const expectedOutput = ["https://blog.boot.dev/"];
    expect(actualOutput).toEqual(expectedOutput);
})
test('getURLsFromHTML relative urls', () => {
    const inputHTMLBody = 
    `<html>
        <body>
            <a href="/path/">
            Boot.dev blog
            </a>
        </body>
    </html>`;
    const baseURL = "https://blog.boot.dev";
    const actualOutput = getURLsFromHTML(inputHTMLBody,baseURL);
    const expectedOutput = ["https://blog.boot.dev/path/"];
    expect(actualOutput).toEqual(expectedOutput);
})
test('getURLsFromHTML both urls', () => {
    const inputHTMLBody = 
    `<html>
        <body>
            <a href="https://blog.boot.dev/path1/">
            Boot.dev blog Path 1
            </a>
            <a href="/path2/">
            Boot.dev blog Path 2
            </a>
        </body>
    </html>`;
    const baseURL = "https://blog.boot.dev";
    const actualOutput = getURLsFromHTML(inputHTMLBody,baseURL);
    const expectedOutput = ["https://blog.boot.dev/path1/", "https://blog.boot.dev/path2/"];
    expect(actualOutput).toEqual(expectedOutput);
})
test('getURLsFromHTML invalid urls', () => {
    const inputHTMLBody = 
    `<html>
        <body>
            <a href="invalid">
            Invalid URL
            </a>
        </body>
    </html>`;
    const baseURL = "https://blog.boot.dev";
    const actualOutput = getURLsFromHTML(inputHTMLBody,baseURL);
    const expectedOutput = [];
    expect(actualOutput).toEqual(expectedOutput);
})