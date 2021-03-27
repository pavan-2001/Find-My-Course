

var quotes = [];

fetch('https://type.fit/api/quotes').then((response) => {
  return response
}).then((data) => {
    quotes = data;
});
console.log(quotes[0].text);