function printReport(pages) {
    console.log("-------------REPORT--------------");
    const sortPagesArr = sortPages(pages);
    for(const sortPage of sortPagesArr) {
        const url = sortPage[0];
        const hits = sortPage[1];
        console.log(`Found ${hits} links to ${url} page`);
    }
    console.log("-------------END OF REPORT--------------");
}

function sortPages(pages) {
    const pagesArr = Object.entries(pages);
    pagesArr.sort((a, b) => {
        aHits = a[1];
        bHits = b[1];
        return b[1]-a[1];
    })
    return pagesArr
}

module.exports = {
    sortPages, printReport
}