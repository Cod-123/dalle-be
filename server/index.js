import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';




//used for .env file storing the imp env variables in a seperate file and using them here 
dotenv.config();

const app = express();

//cross origin resource sharing used for allowing the client to access the server
app.use(cors());

//json data parsed in req.body (memory usage or payload size lim is 50mb)
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes); //for efficinet route handling the middleware is used to mount this specific route for this url
app.use('/api/v1/dalle', dalleRoutes);//anything which matches with this url will be redirected to dalleRoutes.js and postRoutes.js respectively

app.get('/', async (req, res) => {
    res.status(200).json({
      message: 'Hello from DALL.E!',
    });
  });

const startServer =  async () => {
    try{
        connectDB(process.env.MONGODB_URL);
        app.listen(8081,() => console.log(
            'Server is running.Visit http://localhost:8081'
        ))

    }
    catch(err){
        console.log(err);
    }

    // app.listen(8081,() =>{
    //     'Server is running.Visit http://localhost:8081!'
    // })
};

startServer();




