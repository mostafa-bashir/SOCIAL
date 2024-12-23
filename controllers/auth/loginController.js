const bcrypt = require('bcrypt');
const {User} = require('../../models');

const getLoginController = (req,res) => {
    res.render('auth/login', {
        error: ''
    });
}

const postLoginController = async (req,res) => {
    
    const {email, password} = req.body;

    const user = await User.findOne({where: {email}});

    if(user){

        const isMatch = await bcrypt.compare(password, user.password);

        if(isMatch){
            
            req.session.user = user;
            // hnro7 ll feed
            res.redirect('/feed');
            
        }else{
            res.render('auth/login', {
                error: 'Email or Password is incorrect'
            });  
        }

    }else{
        res.render('auth/login', {
            error: 'Email or Password is incorrect'
        })
    }
}

module.exports = {getLoginController, postLoginController};