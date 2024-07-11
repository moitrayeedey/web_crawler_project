const { crawlPage } = require('./crawl.js')

async function main() {
    // process.argv holds an array of command-line values provided when the current process was initiated
    if(process.argv.length < 3) {
        console.log(`no website provided`);
        process.exit(1);
    }
    if(process.argv.length > 3) {
        console.log(`Too many args!`);
        process.exit(1);
    }
    const baseURL = process.argv[2];
    console.log(`Let's crawl ${baseURL}`);
    const pages = await crawlPage(baseURL, baseURL, {});
    for(const page of Object.entries(pages)) {
        console.log(page);
    }
}

main();
