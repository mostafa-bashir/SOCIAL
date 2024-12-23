const {Post, Image, User,  Comment} = require('../../models');

const getPostController = async (req,res) => {
    
    const post = await Post.findOne({
        where: { id: req.params.id },
        include: [
            {
                model: User,
                as: 'author'  // This gets the user who authored the post
            },
            {
                model: Image,
                as: 'images'  // This gets the images related to the post
            },
            {
                model: Comment,
                as: 'comments',  // This gets the comments related to the post
                include: [
                    {
                        model: User,
                        as: 'author',  // This gets the user who authored each comment
                    }
                ]
            }
        ],
        order: [['createdAt', 'DESC']]  // Orders the posts by createdAt in descending order
    });

    res.render('post/post', {
        post,
        user: req.session.user
    })
}

const postPostController = async (req,res) => {

    const comment = req.body.comment;
    const postId = req.params.id;

    await Comment.create({
        content: comment,
        authorId: req.session.user.id,
        postId
    });

    const post = await Post.findOne({
        where: { id: req.params.id },
        include: [
            {
                model: User,
                as: 'author'
            },{
                model: Image,
                as: 'images'
            },
            {
                model: Comment,
                as: 'comments',
                include: [
                    {
                        model: User,
                        as: 'author',  // This gets the user who authored each comment
                    }
                ]
            }
        ],
        order: [['createdAt', 'DESC']]
    });

    res.render('post/post', {
        post,
        user: req.session.user
    });
}

const deletePostController = async (req,res) => {
    
    const post = await Post.findByPk(req.params.id);

    await Image.destroy({
        where: { postId: post.id }
    });
    
    await post.destroy();

    
    res.redirect('/feed');

}

const deleteCommentController = async (req,res) => {
   
    const comment = await Comment.findByPk(req.params.id);
    await comment.destroy();
    await comment.save();
    
    const post = await Post.findByPk(comment.postId, {
        include: [
          {
            model: User,
            as: "author",
          },
          {
            model: Image,
            as: "images",
          },
          {
            model: Comment,
            as: 'comments',
            include: [
                {
                    model: User,
                    as: 'author',  // This gets the user who authored each comment
                }
            ]
          }
        ],
        order: [["createdAt", "DESC"]],
      });
    res.render('post/post', {
        post,
        user: req.session.user
    });
}

module.exports = {getPostController, postPostController, deletePostController, deleteCommentController};