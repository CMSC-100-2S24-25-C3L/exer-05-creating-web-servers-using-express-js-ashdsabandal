import express from 'express';
import { appendFileSync } from 'node:fs';
import { readFileSync } from 'node:fs';

// instantiate the server
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.get('/find-by-isbn-author', (req, res) => {
    const info = findByIsbnAuthor(req.query.isbn, req.query.author);
    res.send(info);
    
});

app.get('/find-by-author', (req, res) => {
    const info = findByAuthor(req.query.author);
    res.send(info);
    
});
app.post('/add-book', (req, res) => {
    res.send({success: addBook(req.body)});

});

// this tells our server to listen to the port 3000
// we can also pass an optional callback function to execute after the server starts
app.listen(3000, () => { console.log('Server started at port 3000'); })

function addBook(bookInfo) {

    if ((bookInfo.name == null || bookInfo.name == "")
    ||  (bookInfo.isbn == null || bookInfo.isbn == "")
    ||  (bookInfo.author == null || bookInfo.author == "")
    ||  (bookInfo.year == null || bookInfo.year == "")
    ) {
        console.log("Not all fields are present");
        return false;
    } 

    try {
        appendFileSync('books.txt', bookInfo.name + ',' + bookInfo.isbn + ',' + bookInfo.author + ',' + bookInfo.year + "\n");
        console.log('The "data to append" was appended to file!');
      } catch (err) {
        /* Handle the error */
      } 
    
    return true;
}

function findByIsbnAuthor(isbn, author) {

    try {
        const data = readFileSync('books.txt', 'utf-8').trim().split('\n'); 
        for (let i = 0; i < data.length; i++) {
            data[i] = data[i].split(',');
            
        }

        for (let i = 0; i < data.length; i++) {
            if (data[i][1] == isbn && data[i][2] == author){
                return `Book Name: ${data[i][0]}\nISBN: ${data[i][1]}\nAuthor: ${data[i][2]}\nYear: ${data[i][3]}\n\n`;
            }

        }

        return "No info available";
    } catch (err) {
        /* Handle the error */
    }

}

function findByAuthor(author) {

    try {
        const data = readFileSync('books.txt', 'utf-8').trim().split('\n'); 
        for (let i = 0; i < data.length; i++) {
            data[i] = data[i].split(',');
            
        }

        let info = "";

        for (let i = 0; i < data.length; i++) {
            if (data[i][2] == author){
                info += `Book Name: ${data[i][0]}\nISBN: ${data[i][1]}\nAuthor: ${data[i][2]}\nYear: ${data[i][3]}\n\n`;
            }

        }

        if (info != "") {
            return info;
        }
        return "No info available";
    } catch (err) {
        /* Handle the error */
    }

}