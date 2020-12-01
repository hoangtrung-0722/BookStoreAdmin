const { MongoClient } = require("mongodb");

const uri =
    "mongodb+srv://trung22:eSBtx6YdW9XcpCT7@cluster0.ak7dp.mongodb.net/test";
// Create a new MongoClient
const client = new MongoClient(uri, { useUnifiedTopology: true });

let database;

async function connectDb(){
    await client.connect();
    // Establish and verify connection
    database = await client.db("books");
}

connectDb();

const db = () => database;

module.exports.db = db;