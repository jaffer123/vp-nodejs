const ReviewService = require('../services/reviewService');
const Joi = require("joi");
const path = require('path');

const ReviewCreateSchema = Joi.object({
  name:Joi.string().max(50).required(),
  rating:Joi.number().required(),
  reviews:Joi.number(),
  comments:Joi.string().required()
})
exports.create = async function(req,res){  
    try {
      const {error,value} = await ReviewCreateSchema.validate(req.body);
      if(error){
        return res.status(403).json({status: 403,flag: false, errorDetails:error.details});
      }
      let input = value;
      const saveReview = await ReviewService.create(input);
      return res.status(200).json({status: 200,flag: true, data: {saveReview}, message: "Successfully Create Review"});
    } catch (e) {
      return res.status(500).json({status: 500,flag: false, message: e.message});
    }
  }

exports.getDetails = async function(req,res){  
    try {
      let reviewDetails = await ReviewService.getDetails();
      return res.status(200).json({status: 200,flag: true, data: {reviewDetails}, message: "Successfully Get Review Details"});
    } catch (e) {
      return res.status(500).json({status: 500,flag: false, message: e.message});
    }
  }

  exports.createReview = async function(req,res){  
    try {

      res.render('reviewCreate', { title: 'Create Review'});
    } catch (e) {
      return res.status(500).json({status: 500,flag: false, message: e.message});
    }
  }

  exports.saveReview = async function(req,res){  
    try {
      const {error,value} = await ReviewCreateSchema.validate(req.body);
      if(error){
        return res.status(403).json({status: 403,flag: false, errorDetails:error.details});
      }
      let input = value;
      const saveReview = await ReviewService.create(input);
      res.redirect('/review/details')
    } catch (e) {
      return res.status(500).json({status: 500,flag: false, message: e.message});
    }
  }
  exports.detailPages = async function(req,res){  
    try {
      let reviewDetails = await ReviewService.getDetails();
      res.render('reviewDetails', { title: 'Review Details' ,data:reviewDetails});
    } catch (e) {
      return res.status(500).json({status: 500,flag: false, message: e.message});
    }
  }