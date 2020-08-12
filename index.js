const express = require('express');
const path = require('path');
const ngrok = require('ngrok');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const user = require('./model');
const connectDB = require('./connection');


connectDB();

const PORT = 8080;
const app = express()

app.use('/',express.static(path.resolve(__dirname,'templets')));
app.use(bodyParser.json());


app.post('/login-with-facebook',async(req,res) =>{
    const { accessToken, userID } = req.body
    const response = await fetch(`https://graph.facebook.com/v8.0/me?access_token=${accessToken}&method=get&pretty=0&sdk=joey&suppress_http_code=1`)
    const json = await response.json()

    if(json.id === userID) {

        const resp = await user.findOne( {facebookID: userID})
        if(resp) {
            res.json({status:'ok',data:'You are logged in'})
        }else {
            const person = new user({
                name:'xyz',
                facebookID:userID,
                accessToken
            })
            await person.save()

            res.json({status: 'ok', data: 'You are registered and logged in'});
        }
    }
    else {
        res.json({status:'error', data:'Your activities are fishy'});
    }
})


app.listen(PORT , () => {
    console.log(`listening to port ${PORT}`);
    (async function() {
        const url = await ngrok.connect(PORT);
        console.log(url);
      })();
})