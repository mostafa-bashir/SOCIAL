const { Comment } = require("../../models");

const getEditCommentController = async (req, res) => {
  
    const id = req.params.id;
  
    const comment = await Comment.findByPk(id);

    if (comment.authorId != req.session.user.id) {
      res.render('errors/404');
    }

    res.render('post/editComment',{
        user: req.session.user.id,
        comment
    });
};

const postEditCommentController = async (req, res) => {

    try {
      const id = req.params.id;
  
      const comment = await Comment.findByPk(id);

      if (comment.authorId == req.session.user.id) {
        comment.content = req.body.content;
  
        await comment.save();
        console.log(comment)
  
        res.redirect("/post/" + comment.postId);
      } else {
        // unauthoriezd
      }
    } catch (error) {
      console.log(error, 'errorr' );
    }
  };


module.exports = {getEditCommentController, postEditCommentController};
