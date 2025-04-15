import dotenv from 'dotenv';
dotenv.config(); // Load .env variables
import express from 'express'
import router from './routes/router.js'
import cors from 'cors'


const app = express()



app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true }));


app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,             
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  }));

app.use ( '/api/v1',router)

app.get('/', (req, res) => {
    res.send('main file') 
  })

app.listen(3000)   