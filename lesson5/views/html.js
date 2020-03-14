const url = require('url');
const router = require('express').Router();

router.get('/*.html', (req, res) => {
    const page = url.parse(req.url).pathname.slice(1).split('.')[0];
    res.render(page);
});

module.exports = router;