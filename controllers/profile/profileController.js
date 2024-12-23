const { User } = require('../../models');

const profileController = async (req,res) => {

    res.render('profile/profile', {user: req.session.user})
}

module.exports = profileController;