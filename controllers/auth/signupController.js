const bcrypt = require('bcrypt');
const {User} = require('../../models');

const getSignupController = (req,res) => {
    res.render('auth/signup', {
        error: null
    });
}

const postSignupController = async (req,res)=>{
    
    const {email, name, password} = req.body;

    const userExistance = await User.findOne({where: {email}});

    if (userExistance){
        res.render('auth/signup',{
            error: 'User already exists'
        });
    }else{
        
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({ name, email, password: hashedPassword, ppUrl: req.file?.path.replace('public/', '/') ?? 'https://static.vecteezy.com/system/resources/thumbnails/006/487/917/small_2x/man-avatar-icon-free-vector.jpg'});

        res.redirect('/login');
    } 

}

module.exports = {getSignupController, postSignupController};