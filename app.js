const express = require('express'); //old
const path = require('path'); //old
const app = express(); //old 

// 3rd may 2023 :mongoose
// const bodyparser =require('body-parser')
// 3rd may 2023 :mongoose
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1/contactDance');
}

const port = 8080; //old

// 3rd may 2023 :define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    more: String
    
});

const Contact = mongoose.model('contact', contactSchema);



// EXPRESS RELATED STUFF 
app.use('/static',express.static('static')) // for serving static file  """OLD"""
app.use(express.urlencoded()) // data collection """OLD"""


// PUG RELATED STUFF
app.set('view engine','pug') // Set the template engine as pug  """OLD"""
app.set('views', path.join(__dirname, 'views')) // Set the views directory  """OLD"""


//dsfdsf

// ENDOINTs
app.get('/',(req,res)=>{
    // """OLD"""

    const params = { };

    res.status(200).render('home.pug',params);

})
 
app.get('/contact',(req,res)=>{
    // """OLD"""

    const params = { };

    res.status(200).render('contact.pug',params);

})

// 3rd may :edit setting post request for contact us page
app.post('/contact',(req,res)=>{

    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
     });

    // res.status(200).render('contact.pug');

})
// jkj

// START THE SERVER """OLD"""
app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`);
})