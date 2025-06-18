const url = require('url');
const querystring = require('querystring');

const URL = 'https://www.google.com&search=nodejs.'

const fixedUrl = URL.replace('&', '?');

const parsedUrl = new url.URL(fixedUrl);

console.log('Protocol:', parsedUrl.protocol);

console.log('Hostname:', parsedUrl.hostname);

console.log('Search Params:', parsedUrl.searchParams);

parsedUrl.host = 'www.laplateforme.io';

parsedUrl.searchParams.append('lang', 'fr');

console.log('Updated URL:', parsedUrl.href);


