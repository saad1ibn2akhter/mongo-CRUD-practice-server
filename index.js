const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://saadealif2010:AIa0eiiGbZDnwEIJ@cluster0.ihxlzzl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// middleware
app.use(cors());
app.use(express.json());



const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        await client.connect();

        const database = client.db("usersData").collection("usersCollection");

        app.get('/users', async (req, res) => {
            const cursor = database.find();
            const result = await cursor.toArray(cursor);
            res.send(result);
        })
        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await database.findOne(query);

            res.send(result);
        })

        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log('new user added details :', user);
            const result = await database.insertOne(user);
            res.send(result);

            console.log(`new user added . details : ${result}`);
        })

        app.put('/users/:id',async(req,res)=>{
            const id = req.params.id;
            const user = req.body;
            const filter = {_id: new ObjectId(id)};
            const options ={upsert : true};
            const updateUser = {
                $set:{
                    name:user.name,
                    email:user.email
                }
            }

            const result = await database.updateOne(filter , updateUser , options);
            res.send(result);
        })

        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            console.log(`delete button presseed for ${id}`);
            const result = await database.deleteOne(query);
            res.send(result);
        })
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {

        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send("Crud Practice server is running succesfuly !!");
})

app.listen(port, (req, res) => {
    console.log(`CRUD server running on port : ${port}`);
})

