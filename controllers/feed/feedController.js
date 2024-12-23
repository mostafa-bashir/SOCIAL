// const {Post, Image, User} = require('../../models');

// const feedController = async (req,res) => {

//     const posts = await Post.findAll({
//         include: [
//             {
//                 model: User,
//                 as: 'author'
//             },{
//                 model: Image,
//                 as: 'images'
//             }
//         ],
//         order: [['createdAt', 'DESC']]
//     })

//     res.render('feed/feed', {
//         posts,
//         user: req.session.user
//     });
// }

// module.exports = feedController;

const { Post, Image, User } = require("../../models");

const feedController = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = 10; // Number of posts per page
    const offset = (page - 1) * limit;

    try {
        // Fetch posts with pagination
        const { rows: posts, count: totalPosts } = await Post.findAndCountAll({
            include: [
                {
                    model: User,
                    as: "author",
                },
                {
                    model: Image,
                    as: "images",
                },
            ],
            order: [["createdAt", "DESC"]],
            limit: limit,
            offset: offset,
        });

        const totalPages = Math.ceil(totalPosts / limit);

        res.render("feed/feed", {
            posts,
            user: req.session.user,
            currentPage: page,
            totalPages: totalPages,
        });
    } catch (error) {
        console.error("Error fetching feed:", error);
        res.status(500).send("Server error");
    }
};

module.exports = feedController;
