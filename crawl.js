const {JSDOM} = require('jsdom');   //allows us to access DOM apis

async function crawlPage(currentURL) {
    console.log(`Actively crawling ${currentURL}.....`);
    try {
        const response = await fetch(currentURL);
        if(response.status > 399) {
            console.log(`Error: ${response.status}`);
            return;
        } 
        const contentType = response.headers.get("content-type");
        if(!contentType.includes("text/html")) {
            console.log(`Error: No html response`);
            return;
        }
        console.log(await response.text());
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
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