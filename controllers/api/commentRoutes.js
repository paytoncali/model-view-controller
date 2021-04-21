const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
            post_id: req.body.post_id
        })
        res.status(200).json(newComment);

    } catch (err) {
        res.status(400).json(err);
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        res.status(200).json(commentData);

        if (!commentData) {
            res.status(404).json({ message: 'No Post here!' });
            return;
        }

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;