const express = require('express')
const Article = require('./../../model/action')
const router = express.Router()

router.post('/:id/like', async (req, res) => {
    console.log(req);
    let blogid=req.params.id;
    console.log(blogid);

    const adduserlike = await Article.updateOne( { _id: blogid },
      { $inc: { likes: 1 } } )
    const userlike = await Article.findOne({_id:blogid});
    console.log(userlike.likes);
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.render('landing', { articles: articles })
  })
  