var mongoose = require('mongoose'),
  moment = require('moment'),
  Validations = require('../utils/Validations'),
  hanien = mongoose.model('hanien');

module.exports.gethanien = function(req, res, next) {
  if (!Validations.isObjectId(req.params.hanienId)) {
    return res.status(422).json({
      err: null,
      msg: 'hanienId parameter must be a valid ObjectId.',
      data: null
    });
  }
  hanien.findById(req.params.hanienId).exec(function(err, hanien) {
    if (err) {
      return next(err);
    }
    if (!hanien) {
      return res
        .status(404)
        .json({ err: null, msg: 'hanien not found.', data: null });
    }
    res.status(200).json({
      err: null,
      msg: 'hanien retrieved successfully.',
      data: hanien
    });
  });
};

module.exports.gethaniens = function(req, res, next) {
  hanien.find({}).exec(function(err, haniens) {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      err: null,
      msg: 'haniens retrieved successfully.',
      data: haniens
    });
  });
};

module.exports.gethaniensBelowPrice = function(req, res, next) {
  if (!Validations.isNumber(req.params.price)) {
    return res.status(422).json({
      err: null,
      msg: 'price parameter must be a valid number.',
      data: null
    });
  }
  hanien.find({
    price: {
      $lt: req.params.price
    }
  }).exec(function(err, haniens) {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      err: null,
      msg:
        'haniens priced below ' +
        req.params.price +
        ' retrieved successfully.',
      data: haniens
    });
  });
};

module.exports.createhanien = function(req, res, next) {
  var valid =
    req.body.name &&
    Validations.isString(req.body.name) &&
    req.body.price &&
    Validations.isNumber(req.body.price)&&
    req.body.seller &&
    Validations.isString(req.body.seller)&&
    req.body.component &&
    Validations.isString(req.body.component);
  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'name(String) and price(Number) are required fields.',
      data: null
    });
  }
  // Security Check
  delete req.body.createdAt;
  delete req.body.updatedAt;

  hanien.create(req.body, function(err, hanien) {
    if (err) {
      return next(err);
    }
    res.status(201).json({
      err: null,
      msg: 'hanien was created successfully.',
      data: hanien
    });
  });
};

module.exports.updatehanien = function(req, res, next) {
  if (!Validations.isObjectId(req.params.hanienId)) {
    return res.status(422).json({
      err: null,
      msg: 'hanienId parameter must be a valid ObjectId.',
      data: null
    });
  }
  var valid =
    req.body.name &&
    Validations.isString(req.body.name) &&
    req.body.price &&
    Validations.isNumber(req.body.price);
  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'name(String) and price(Number) are required fields.',
      data: null
    });
  }
  // Security Check
  delete req.body.createdAt;
  req.body.updatedAt = moment().toDate();

  hanien.findByIdAndUpdate(
    req.params.hanienId,
    {
      $set: req.body
    },
    { new: true }
  ).exec(function(err, updatedhanien) {
    if (err) {
      return next(err);
    }
    if (!updatedhanien) {
      return res
        .status(404)
        .json({ err: null, msg: 'hanien not found.', data: null });
    }
    res.status(200).json({
      err: null,
      msg: 'hanien was updated successfully.',
      data: updatedhanien
    });
  });
};

module.exports.deletehanien = function(req, res, next) {
  if (!Validations.isObjectId(req.params.hanienId)) {
    return res.status(422).json({
      err: null,
      msg: 'hanienId parameter must be a valid ObjectId.',
      data: null
    });
  }
  hanien.findByIdAndRemove(req.params.hanienId).exec(function(
    err,
    deletedhanien
  ) {
    if (err) {
      return next(err);
    }
    if (!deletedhanien) {
      return res
        .status(404)
        .json({ err: null, msg: 'hanien not found.', data: null });
    }
    res.status(200).json({
      err: null,
      msg: 'hanien was deleted successfully.',
      data: deletedhanien
    });
  });
};
