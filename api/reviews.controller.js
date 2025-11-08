import { json } from "express"
import ReviewsDAO from "../dao/reviewsDAO.js"

export default class ReviewsController{

    //POST REVIEW FUNCTION
    static async apiPostReview(req, res, next){
        try{
            const movieId = req.body.moveieId 
            const review = req.body.review
            const user = req.body.user

            const reviewResponse = await ReviewsDAO.addReview(
                movieId,
                user,
                review
            )
            res.json({status: "success"})
        }
        catch(e){
            res.status(500).json({error: e.message})
        }
    }
    
    // GET REVIEW FUNCTION
    static async apiGetReview(req, res, next){
        try{
            let id = req.params.id ||{}         ///we'll either get the id or empty object
            let review = await ReviewsDAO.getReview(id)
            if(!review){
                res.status(404).json({error: "Not FOund"})
                return
            }
            res.json(review)
    
        }
        catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiUpdateReview(req, res, next){
        try{
            const reviewId  = req.params.id
            const user = req.body.user
            const review = req.body.review

        //response from mongodb    
        const reviewResponse = await ReviewsDAO.updateReview(
            reviewId,
            user,
            review
        )    

        var {error} = reviewResponse
        if(error){
            res.status(400).json({error})
        }

        //nothing was changed in the database
        if( reviewResponse.modifiedCount === 0){
            throw new Error("Unable to update review")
        }
        res.json({status:"success"})
        }
        catch(e){
            res.status(500).json({error: e.message})
        }
    }



    //DELETE REVIEW
    static async apiDeleteReview(req, res, next){
        try{
            const reviewId  = req.params.id

        //response from mongodb    
        const reviewResponse = await ReviewsDAO.deleteReview(reviewId)    

        res.json({status: "success"})
        }
        catch(e){
            res.status(500).json({error: e.message})
        }
    }


    //GET REVIEWS
    static async apiGetReviews(req, res, next){
        try{
            const Id  = req.params.id ||{}

        //response from mongodb    
        const reviews = await ReviewsDAO.getReviewsByMovieId(Id)    

         if(!reviews){
                res.status(404).json({error: "Not FOund"})
                return
            }
            res.json(reviews)
        }
        catch(e){
            res.status(500).json({error: e.message})
        }
    }

}