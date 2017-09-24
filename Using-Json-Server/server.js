const express = require('express');
const graphQLHTTP = require('express-graphql');
const schema = require('./schema');

const app = express();
app.use(graphQLHTTP({
    schema,
    graphiql: true,
}));

app.listen(5000, (req, res)=> {
    console.log("server started at port 5000");
})