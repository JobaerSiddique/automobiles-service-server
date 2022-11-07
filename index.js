const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
var cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000;
app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gtisv5q.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


console.log(uri)


async function run (){
  try{
    await client.connect()
    console.log('database conneted')
    const serviceCollection = client.db('automobile_provider').collection('service')
    const expertCollection = client.db('automobile_provider').collection('experts')
   

    app.get('/service', async(req,res)=>{
      const query={}
      const curser = serviceCollection.find(query)
      const services= await curser.toArray()
      res.send(services)
    })
    app.get ('/service/:id',async(req,res)=>{
      const id = req.params.id;
      const query = {_id: ObjectId(id)}
      const service = await serviceCollection.findOne(query)
      res.send(service)
    })

    // experts
    app.get('/experts', async(req,res)=>{
      const query={}
      const curser = expertCollection.find(query)
      const services= await curser.toArray()
      res.send(services)
    })

  }finally{
    // await client.close()
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Automobiles Server Connected ,yes yes ')
})

app.listen(port, () => {
  console.log(`Server is running ${port}`)
})