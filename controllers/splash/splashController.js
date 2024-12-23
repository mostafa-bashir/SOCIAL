let splashController = async (req, res) => {

    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).send('Error logging out');
        }

        // Session destroyed successfully, redirect to login

        res.redirect('/login');
    });
};

module.exports = splashController;
