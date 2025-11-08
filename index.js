import app from './server.js'
import mongodb from 'mongodb'
import 'dotenv/config';

// import ReviewDAO from '/dao/reviewsDAO.js'

const MongoClient = mongodb.MongoClient
const mongo_username = process.env['MONGO_USERNAME']
const mongo_pass = process.env['MONGO_PASSWORD']
const uri = `mongodb+srv://guptaritik0398:Ritik%40123@cluster0.bjwohvj.mongodb.net/?appName=Cluster0`
const port = 8000

MongoClient.connect(
    uri,{
        maxPoolSize:50,
        wtimeoutMS: 2500,
    }
)
.catch(err =>{
    console.error("Database Connection Error, Error Details", err.stack)
    process.exit()
}).then(async client =>{
    app.listen(port, ()=>{
        console.log(`listening to port: ${port}`)
    })
})