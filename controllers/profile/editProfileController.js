const { User } = require('../../models');
const bcrypt = require('bcrypt')

const getEditProfileController = async (req,res) => {

    res.render('profile/editProfile', {user: req.session.user});
}

const postEditProfileController = async (req,res) => {

    const {name, email, password} = req.body;




    const user = await User.findByPk(req.session.user.id);

    if (password){
        const hashedPassword = bcrypt.hash(password, 10);
        user.password = hashedPassword
    }

    user.name = name;
    user.email = email;
    user.ppUrl = req.file?.path.replace('public/', '/')?? 'https://static.vecteezy.com/system/resources/thumbnails/006/487/917/small_2x/man-avatar-icon-free-vector.jpg' ;

    await user.save();

    req.session.user = user;

    res.redirect('/profile/'+user.id);
}

module.exports = {getEditProfileController, postEditProfileController};