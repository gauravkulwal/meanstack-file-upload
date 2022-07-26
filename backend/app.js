const express  = require('express'),
      mongoose = require('mongoose'),
      cors     = require('cors'),
      multer   = require('multer')

const userRouter = require('./routes/userformApi');
//mongodb connection
const db = 'mongodb://localhost:27017/meandatabase';
mongoose.connect(db).then((con) => {
    console.log(`connected to database name: ${con.connections[0].name}`)
}).catch((err) => {
    console.log('error while connecting to database' , err.reason);
});


//express js 
const app = express();
app.use(express.json());
app.use(cors());
app.use('/images' , express.static('images'));

app.use('/api' , userRouter)



app.listen(3000 ,() => {
    console.log('successfully connected to 3000')
})