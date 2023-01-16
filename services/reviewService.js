const Review = require('../models/review');
const SupportService = require('../services/supportService');
const timeAgo = require('node-time-ago');


exports.create = async function(data){
    try{
        let imagePath = ""
        if(data.picture)
            imagePath = await SupportService.uploadImage(data.picture);

        let saveReview = await Review.create({
            name: data.name,
            picture:imagePath,
            rating:data.rating,
            comments:data.comments
        })
        return saveReview;
    }catch(e){
        throw Error('Error in Create Review',e);
    }
}

exports.getDetails = async function(data){
    try{
        let reviewList = await Review.findAll({order:[['id','DESC']]});
        let total = reviewList.length;
        let sumRating = 0;
        let excellent = 0;
        let good = 0;
        let average = 0;
        let belowAverage = 0;
        let poor = 0;
        let newReviewList = [];
        await reviewList.map(dt =>{
            if(dt.rating) sumRating = sumRating + dt.rating;
            switch (dt.rating) {
                case 5:
                    excellent++;
                    break;
                case 4:
                    good++;
                    break;
                case 3:
                    average++;
                    break;
                case 2:
                    belowAverage++;
                    break;
                case 1:
                    poor++;
                    break;
                default:
                    break;
            }
            let time = timeAgo(dt.createdAt);
            let obj = {
                id:dt.id,
                name:dt.name,
                ratings:dt.rating.toFixed(1),
                reviews:dt.reviews,
                comments:dt.comments,
                createdAt:time,
            }
            newReviewList.push(obj);
            return dt;
        })
        let overAllRating = 0;
        if(sumRating) {
            overAllRating = sumRating/total;
            overAllRating = overAllRating.toFixed(1);
        }
        let formatResponse = { 
            reviewList : newReviewList,
            ratingList:{
                total:newReviewList.length,
                overAllRating,
                ratingScale:{
                    excellent: await SupportService.percentageCal(excellent,total),
                    good: await SupportService.percentageCal(good,total),
                    average:await SupportService.percentageCal(average,total),
                    belowAverage: await SupportService.percentageCal(belowAverage,total),
                    poor: await SupportService.percentageCal(poor,total)
                }
            }
        }
        return formatResponse;
    }catch(e){
        throw Error('Error in get Details Review',e);
    }
}
