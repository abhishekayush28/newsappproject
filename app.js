const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require("mongoose")
const Users = require('./model/user')
const action = require('./model/action')
const comments = require('./model/comments')
const app = express()
const port = 5000

//connection to mongo
mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


// //connection to like and comment database
// mongoose.connect('mongodb://localhost:27017/action',{
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// });


const db = mongoose.connection;
app.set('views', './src/views')
app.set('view engine', 'ejs')

db.on('error', () =>
  console.log("Error in connection to database"));

db.once('open', () =>
  console.log("Connected to database"));

// Static Files
app.use(express.static('public'))

// Templating Engin
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  res.render('login/index');
});

app.get('/userRegister', (req, res) => {
  res.render('login/register');

});


app.get('/userLogin', (req, res) => {
  res.render('login/login');

});


app.post("/userLogin", async (req, res) => {
  try {
    const email = req.body.email;
    const userpassword = req.body.password;
    const useremail = await Users.findOne({ email: email });
    if (useremail.password === userpassword) {
      res.redirect('/landing');
    }
    else {
      res.send("password are wrong !!!!");
    }

  } catch (error) {
    res.status(400).send("Invalid Email")
  }



});

app.post("/userRegister", async (req, res) => {
  let { email, password, password2 } = req.body;
  //let errors = [];
  try {
    let response = await Users.create({
      email, password
    })
    console.log("sucesssss", response);
    res.render('login/login')
  } catch (error) {
    if (error.code === 11000) {
      return res, json({ status: "error", error: "Email Already in existing in database " })
    }
    throw error
  }

});

app.post("/articles/:id/comments", async (req, res) => {

  // res.send("Hi");
  let blogid = req.params.id;
  let commentValue=req.body.comments;
  console.log(commentValue);
  let comment=commentValue;
  let response = await comments.create({
    blogid,comment
  })
// }
  // console.log(blogid);
  // // //yaha tak chala tha
  // const adduserlike = await action.updateOne({ blogid: blogid },
  //   { $inc: { likes: 1 } })

  res.redirect('/landing');






});

app.post("/articles/:id/likes", async (req, res) => {

  // res.send("Hi");
  let blogid = req.params.id;
  let varr="12";
  // const userem=await action.findOne({blogid:id})
  // if(blogid !==userem.blogid){
    // used updateOne instead of create
    //so that the values don't repeat
  let response = await action.updateOne({
    blogid
  })
// }
  console.log(blogid);
  // //yaha tak chala tha
  const adduserlike = await action.updateOne({ blogid: blogid },
    { $inc: { likes: 1 } })

  // const userlike = await action.findOne({ _id: blogid });
  // console.log(userlike.likes);
  // const action = await action.find().sort({ createdAt: 'desc' })
  // // res.render('landpage', { articles: articles })
  res.redirect('/landing');


  // let blogid=req.params.id;
  // const ab=a;
  // const adduserlike = await action.updateOne( { blogid: ab },
  // { $inc: { likes: 1 } } )
  // const userlike = await action.findOne({blogid: ab});
  // res.render('/landing');




  // const userlike = await Article.findOne({_id:blogid});
  // let {like } = req.body;
  // //let errors = [];
  // try {
  //     let response = await Users.create({
  //       email, password
  //     })
  //     console.log("sucesssss", response);
  //     res.render('login/login')
  //   } catch (error) {
  //     if (error.code === 11000) {
  //       return res, json({ status: "error", error: "Email Already in existing in database " })
  //     }
  //     throw error
  //   }

});







// Routes
const newsRouter = require('./src/routes/news')

app.use('/', newsRouter)
app.use('/article', newsRouter)

// Listen on port 5000
app.listen(process.env.PORT || port, () => console.log(`Listening on port ${port}`))