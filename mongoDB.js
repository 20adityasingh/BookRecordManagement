const mongo = require("mongoose");

function DbConnection(){
    const DB = process.env.MONGODB;
    mongo.connect(DB,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

const db = mongo.connection;

db.on("error",console.error.bind(console,"Connection Error"));
db.once("open",function(){
    console.log("DB CONNECTED!!");
});

module.exports = DbConnection;