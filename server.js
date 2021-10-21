import express from 'express'
import mongoose from 'mongoose'
import Cards from './dbCards.js'
import Cors from 'cors';

// App COnfig
const app = express();
const port = process.env.PORT || 8001;
const connection_url = `mongodb+srv://admin:ka3IhLkMS8me95j5@cluster0.yjkfk.mongodb.net/tinderdb?retryWrites=true&w=majority`

//MIddleware
app.use(express.json());
app.use(Cors());

//DB config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true,
})

//API Endpoints
app.get('/', (req, res) => res.status(200).send('HELLO WORLD!!!!'));
app.post('/tinder/cards', (req, res) => {
    const dbCard = req.body;

    Cards.create(dbCard, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    });
});

app.get('/tinder/cards', (req, res) => {
    Cards.find( (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    });
});

//listner
app.listen(port, () => console.log(`listning on localhost: ${port}`))
