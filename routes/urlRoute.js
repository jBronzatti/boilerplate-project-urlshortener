const express = require("express");
const router = express.Router();
const urlController = require('../controllers/urlController')

router.post("/", async (req, res) => {
  urlController.createUrl(req, res);
})
router.get('/:short_url', async (req, res) => {
  urlController.getUrl(req, res);
});


module.exports = router;