const myUrl = "https://www.google.com.ua.bz/users/Vova/addres?city=kiev,dnipro&street=zhilyanska";
const url = require('url');

console.log(url.parse(myUrl));