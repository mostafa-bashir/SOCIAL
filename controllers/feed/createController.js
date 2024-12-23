const {Post, Image, sequelize} = require('../../models');

const getCreateController = async (req,res) => {
    res.render('feed/create', {
        user: req.session.user
    });
}

const postCreateController = async (req,res) =>{
    const content = req.body.content;
    
    const fileNames = req.files.map(file => file.path.replace('public/', '/'));

    const transaction = await sequelize.transaction();

    const post = await Post.create({
        content,
        authorId: req.session.user.id
    },{
        transaction
    });

    const images = fileNames.map(filename => ({
        postId: post.id,
        imagePath: filename
    }));

    await Image.bulkCreate(images, { transaction });

    await transaction.commit();

    res.redirect('/feed')
}

module.exports = {getCreateController, postCreateController};