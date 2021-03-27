import Promise from 'bluebird';

const quoteArray = [{
    text : '" Any fool can write code that a computer can understand. Good programmers write code that humans can understand. ”', 
    author : 'Martin Fowler'
}, {
    text : '“ First, solve the problem. Then, write the code. ”',
    author : 'John Johnson'
}, {
    text : '“ In order to be irreplaceable, one must always be different. ”',
    author : 'Coco Chanel'
}, {
    text : '“ Java is to JavaScript what car is to Carpet. ”',
    author : 'Chris Heilmann'
}, {
    text : '“ Knowledge is power. ”',
    author : 'Francis Bacon'
}, {
    text : '“ Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday’s code. ” ',
    author : 'Dan Salomon'
}, {
    text : '“ Perfection is achieved not when there is nothing more to add, but rather when there is nothing more to take away. ” ',
    author : 'Antoine de Saint-Exupery'
}, {
    text : '“ Ruby is rubbish! PHP is phpantastic! ” ', 
    author : 'Nikita Popov'
}, {
    text : '“ Code is like humor. When you have to explain it, it’s bad. ”', 
    author : 'Cory House'
}, {
    text : '“ Fix the cause, not the symptom. ”', 
    author : 'Steve Maguire'
}, {
    text : '“ Optimism is an occupational hazard of programming: feedback is the treatment. “', 
    author : 'Kent Beck'
}, {
    text : '“ When to use iterative development? You should use iterative development only on projects that you want to succeed. ” ', 
    author : 'Martin Fowler'
}, {
    text : '“ Simplicity is the soul of efficiency. ” ', 
    author : ' Austin Freeman'
}, {
    text : '“ Before software can be reusable it first has to be usable. ” ',
    author : 'Ralph Johnson'
}, {
    text : '“ Make it work, make it right, make it fast. ” ', 
    author : 'Kent Beck'
}];

export function fetchQuote(quoteNumber) {
    return new Promise((resolve) => {
            resolve(quoteArray[quoteNumber]);
    });
}



export function fetchBooks(bookName) {
    
    const books = fetch('https://www.googleapis.com/books/v1/volumes?q='+bookName).then((response) => response.json()).then((json) => {
    return json.items;
    });
    return new Promise((resolve) => {
        resolve(books);
    })
}

