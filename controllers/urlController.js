const Url = require("../model/urlSchema");
const crudService = require("../services/crudService");
const dns = require('node:dns');
const urlObj = require('url').URL;

async function createUrl(req, res) {
  try {
    const inputUrl = req.body.url;
    const urlExists = await crudService.getter(res, {original_url:inputUrl}, Url);
    if (urlExists.length != 0) {
      const { original_url, short_url } = urlExists[0];
      res.json({'original_url':original_url, 'short_url': short_url});
    } else {
        const newUrl = new Url({original_url:inputUrl});
        newUrl.short_url = await Url.countDocuments({}) + 1;
        const urlObject = new urlObj(req.body.url);
        dns.lookup(urlObject.hostname, (err, address, family) => {
          if (err) {
            res.json({ error:'invalid url' });
        } else {
        crudService.creater(req, res, newUrl, Url);
  }})}} catch (error) {
    res.json({ error:'invalid url' });  
}}

async function getUrl(req, res) {
  try {
    const short_url = req.params.short_url;
    const urlSchema = await crudService.getter(res, {short_url}, Url);
    res.redirect(urlSchema[0].original_url);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Erro ao consultar Url"});
  }
}

module.exports = { createUrl, getUrl };

