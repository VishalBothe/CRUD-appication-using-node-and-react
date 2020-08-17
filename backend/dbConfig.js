const {Pool, Client} = require('pg');

// DB connection using client
client = new Client({
    connectionString: process.env.DB_CON_STRING
});

client.connect((err) => {
    if(err){
        console.log("ERROR IN CONNECTING TO DB!");
        console.log(err);
        return;
    } 
    console.log("DB CONNECTED SUCCESSFULLY!!");
})

module.exports = client;

// DB connecting using pool
// var pool = new Pool({
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     database: process.env.DB_USER,
//     ssl: false
// });
// pool.connect((err) =>{
//     if(err){
//         console.log("ERROR IN CONNECTING TO DB!");
//         console.log(err);
//         return;
//     }
//     console.log("DB CONNECTED SUCCESSFULLY!!");
// })
// module.exports = pool;