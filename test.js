import needle from 'needle';

needle.get('http://localhost:3000/', (err, res) => {
    console.log(res.body) // prints the body of the response message
})

needle.post('http://localhost:3000/submit-data', 
    { name: 'Ash'},
    (err, res) => {
    console.log(res.body) // prints the server's response 'Received a POST request.'
})

