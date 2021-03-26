
const tempQuotes = fetch('https://type.fit/api/quotes').then((response) => {
  return response.json();
}).map((v,i) => ({
    text : i.text, 
    author : i.author
}));

console.log(tempQuotes[0]);