const {JSDOM} = require('jsdom');   //allows us to access DOM apis

async function crawlPage(baseURL, currentURL, pages) {
    // baseURL -> starting point, typically the home page
    // currentURL -> page we are now crawling
    // pages -> an object to keep a track of pages we've scrolled
    
    // to check if the currentURL is in the same domain as the baseURL 
    const baseURLObj = new URL(baseURL);
    const currentURLObj = new URL(currentURL);
    if(baseURLObj.hostname !== currentURLObj.hostname) {
        return pages;
    }

    // to check if the page is already crawled
    const normalizedCurrentURL = normalizeURL(currentURL);
    if(pages[normalizedCurrentURL] > 0) {
        pages[normalizedCurrentURL]++;
        return pages;
    }
    pages[normalizedCurrentURL] = 1;
    console.log(`Actively crawling ${currentURL}.....`);
    try {
        const response = await fetch(currentURL);
        if(response.status > 399) {
            console.log(`Error: ${response.status}`);
            return pages;
        } 
        const contentType = response.headers.get("content-type");
        if(!contentType.includes("text/html")) {
            console.log(`Error: No html response`);
            return pages;
        }
        const htmlBody = await response.text();
        const nextURLs = getURLsFromHTML(htmlBody, baseURL);

        for(const nextURL of nextURLs) {
            pages = await crawlPage(baseURL, nextURL, pages);
        }
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
    return pages;
}

function getURLsFromHTML(htmlBody, baseURL) {
    // htmlBody -> the html of the page
    // baseURl -> url of the website we are crawling
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll('a');
    for(const linkElement of linkElements) {
        if(linkElement.href.slice(0,1) === '/') {
            //relative url
            try {
                const urlObj = new URL(`${baseURL}${linkElement.href}`);
                urls.push(urlObj.href);
            } catch (error) {
                console.log(`Oops! Error: ${error.message}`);
            }
        } else {
            //absolute url
            try {
                const urlObj = new URL(linkElement.href);
                urls.push(urlObj.href);
            } catch (error) {
                console.log(`Oops! Error: ${error}`);
            }
        }
    }
    return urls;
}

function normalizeURL(urlString) {
    const urlObj = new URL(urlString);
    const hostPath =  `${urlObj.hostname}${urlObj.pathname}`;
    if(hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1);
    }
    return hostPath; 
}

module.exports = {
    normalizeURL, getURLsFromHTML, crawlPage
}