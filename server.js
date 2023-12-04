const express = require("express")
const app = express()
const bodyparser = require("body-parser")
const { MongoClient } = require('mongodb')
const {isemptypayload, isinvalidemail} = require("./validator")

const {DB_USER, DB_PASS, DEV} = process.env //variables declaration. the process obj contains the env var

// if (DEV) {
//     const url = 'mongodb://127.0.0.1:27017'
// }else{
//     const url = `mongodb://${DB_USER}:${DB_PASS}@127.0.0.1:27017?authSource=company_db`
// } same thing as followed
const dbaddress = '127.0.0.1:27017'
const url = DEV ?  `mongodb://${dbaddress}` : `mongodb://${DB_USER}:${DB_PASS}@${dbaddress}?authSource=company_db`


const client = new MongoClient(url)
const dbname = "company_db"
const collname = "employees"

app.use(bodyparser.json())
app.use("/" , express.static(__dirname + "/dist"))

app.get("/get-profile", async function(req, res){
    //connect to db
    await client.connect()
    console.log("Connected successfully to server")

    // initiate or get the db
    const db = client.db(dbname)
    const collection = db.collection(collname)

    //get data from db
    const result = await collection.findOne({id:1})
    console.log(result)
    client.close()

    response = {}
    if (result!==null){
        response = {
            name: result.name,
            email: result.email,
            interests: result.interests
        }
    }
   
    res.send(response)
    
})

app.post("/upgrade-profile", async function(req, res){
    const payload = req.body
    console.log(payload)
    if (isemptypayload(payload) || isinvalidemail(payload)) {
        res.send({error: "invalid payload: coudn't update user profile data"})
    }else{
        //connect to db
        await client.connect()
        console.log("Connected successfully to server")

        // initiate or get the db
        const db = client.db(dbname)
        const collection = db.collection(collname)

        //save data in the db
        payload["id"]= 1
        //post the most update user profile in the db for the same id
        //upsert is for create a new doc if it does not already exist in the db
        const updatedvalues= {$set:payload}
        await collection.updateOne({id:1}, updatedvalues, {upsert:true})
        //close the connection
        client.close()

        res.send({info: "succesful update user profile data"})
    }
   
})

const server = app.listen(3000, function(){
    console.log("app listenning on port 3000")
})


module.exports = {
    app,
    server
}