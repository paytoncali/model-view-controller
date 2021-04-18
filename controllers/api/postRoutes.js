const router = require('express').Router();
const { Blogs } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const postData = await Blogs.create({
            title: req.body.title,
            name: req.body.name,
            description: req.body.description,
            date_created: req.body.date_created,
            user_id: req.session.user_id,
        });
        req.session.save(() => {
            req.session.job_id = postData.id;

            res.status(200).json(postData);
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const postData = await Blogs.update(req.body, {
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