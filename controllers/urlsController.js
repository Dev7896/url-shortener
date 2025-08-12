const shortid = require("shortid");
const Url = require("../models/urlsModel");
const shortId = require("shortid");

async function createShortUrl(req, res, next) {
  try {
    const { originalUrl } = req.body;

    const short = shortId.generate();

    const newUrl = new Url({ originalUrl, short });
    await newUrl.save();

    return res.redirect("/");
  } catch (error) {
    return next(error);
  }
}

async function getUrlData(req, res, next) {
  try {
    const urls = await Url.find();
    if (!urls) {
      return res.status(err.statusCode || 500).json({
        success: false,
        message: "failed to fetch results",
      });
    }
    return res.render("index", {
      urls: urls || [],
    });
  } catch (error) {
    return next(error);
  }
}

async function redirect(req, res, next) {
  try {
    const { shortid } = req.params;

    const url = await Url.findOne({ short: shortid });

    if (!url) {
      return res.status(500).json({
        success: false,
        message: "failed to fetch results",
      });
    }
    url.clicks = (url.clicks || 0) + 1;
    await url.save();

    const redirectionUrl = url.originalUrl;

    return res.redirect(redirectionUrl);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createShortUrl,
  getUrlData,
  redirect,
};
