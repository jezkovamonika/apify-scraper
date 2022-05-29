// settings for web scraper


async function pageFunction(context) {
    // jQuery is handy for finding DOM elements and extracting data from them.
    // To use it, make sure to enable the "Inject jQuery" option.
    const $ = context.jQuery;
    const pageTitle = $('div.article__title').first().text().trim();
    const pageDate = $('div.article__info-date').text().trim();
    const pageOpener = $('h1.article__second-title').first().text().trim();
    //const pageText = $('div.article__text').first().text().trim();
    const elements = document.querySelectorAll(".article__text");
    var fullText = '';
    for (let i=0; i < elements.length; i++) {
        fullText = fullText.concat(elements[i].innerText);
    }
    console.log(fullText);

    // Print some information to actor log
    context.log.info(`URL: ${context.request.url} TITLE: ${pageTitle} DATE: ${pageDate}`);

    

    // Return an object with the data extracted from the page.
    // It will be stored to the resulting dataset.
    if((fullText.toLowerCase()).includes('украин')) {
    return {
        url: context.request.url,
        pageTitle,
        pageDate,
        pageOpener,
        fullText
    };
}
}



// setting for cheerio scraper

async function pageFunction(context) {
    const { $, request, log } = context;
    // The "$" property contains the Cheerio object which is useful
    // for querying DOM elements and extracting data from them.
    const pageTitle = $('div.article__title').first().text();
    const pageDate = $('div.article__info-date').text().trim();
    const pageOpener = $('h1.article__second-title').first().text().trim();
    const fullText = $(".article__text").text();

  // The "request" property contains various information about the web page loaded. 
    const url = request.url;
    
    // Use "log" object to print information to actor log.
    log.info('Page scraped', { url, pageTitle, fullText });

    // Return an object with the data extracted from the page.
    // It will be stored to the resulting dataset.
if((fullText.toLowerCase()).includes('украин')) {
    return {
        url,
        pageTitle,
        pageDate,
        pageOpener,
        fullText
    };
}
}
