const { Post, Image, User } = require("../../models");
const path = require("path");
const fs = require("fs");

const getEditPostController = async (req, res) => {
  const post = await Post.findByPk(req.params.id, {
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
  });

  if(post.author.id != req.session.user.id){
    res.redirect('/feed')
  }else{
    res.render("post/editPost", {
      post,
      user: req.session.user,
    });
  }
};

const postEditPostController = async (req, res) => {
  try {
    const postId = req.params.id;

    // Fetch the post with associated images
    const post = await Post.findByPk(postId, {
      include: [{ model: Image, as: "images" }],
    });

    if (!post) {
      return res.status(404).send("Post not found");
    }

    // Update post content
    post.content = req.body.content;

    // Handle image removal
    if (req.body.removeImages) {
      const imagesToRemove = Array.isArray(req.body.removeImages)
        ? req.body.removeImages
        : [req.body.removeImages];

      // Filter out images to remove
      for (const image of post.images) {
        if (imagesToRemove.includes(image.id.toString())) {
          const filePath = path.join(__dirname, "../public", image.imagePath);

          // Check if the file exists before attempting to delete it
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath); // Delete the file
          } else {
            console.warn(`File not found: ${filePath}`);
          }

          // Remove the image from the database
          await image.destroy();
        }
      }
    }

    // Add new images
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((file) => ({
        imagePath: `${file.path.replace("public/", "/")}`,
        postId: post.id,
      }));

      // Create new images in the database
      await Image.bulkCreate(newImages);
    }

    await post.save();
    res.redirect(`/feed`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};


module.exports = {getEditPostController, postEditPostController};
