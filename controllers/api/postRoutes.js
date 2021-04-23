const router = require('express').Router();
const { Blogs } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Blogs.create({
            ...req.body,
            user_id: req.session.user_id,
        })
        res.status(200).json(newPost);

    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const postData = await Blogs.update({
            description: req.body.description,
            post_id: req.body.id,
            // user_id: req.session.user_id,
        }, {
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const postData = await Blogs.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        res.status(200).json(postData);

        if (!postData) {
            res.status(404).json({ message: 'No Post here!' });
            return;
        }

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;