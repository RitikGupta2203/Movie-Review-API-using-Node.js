//connect to database

import mongodb from 'mongodb'
const ObjectId = mongodb.ObjectId

let reviews

export default class ReviewsDAO{
    static async injectDB(conn){
        if(reviews){
            return
        }

        try{
            reviews = await conn.db("reviews").collections("reviews")
        }
        catch(e){
            console.log("Unable to establish collections in userDAO: ",e.stack)
        }
    }
    //function that would be usesd in controller to add
    static async addReview(movieId, user, review){
        try{
            const reviewDoc = {
                movieId: movieId,
                user: user,
                review:review
            }
            return await reviews.insertOne(reviewDoc)
        }
        catch(e){
             console.log("Unable to Post ",e.stack)
             return({error: e})
        }
    }

    static async getReview(reviewId){
        try{
            return await review.findOne({_id : ObjectId(reviewId)})
        }catch(e){
            console.log("Unable to get the reviews")
            return({error: e})
        }
    }


    static async updateReview(reviewId, user, review){
        console.log("reviewID:", reviewId)
        try{
          const updateResponse = await reviews.updateOne(
            {_id: ObjectId(reviewId)},
            {
                $set: {user: user, review:review}
            }
          )
            return updateResponse
        }
        catch(e){
             console.log("Unable to Update ",e.stack)
             return({error: e})
        }
    }

     static async deleteReview(reviewId){
        try{
           const deleteResponse = await reviews.deleteOne({
            _id : ObjectId(reviewId)
           })
        }catch(e){
            console.log("Unable to Delete")
            return({error: e})
        }
    }

    static async getReviewByMovieId(movieId){
        try{
            const cursor = await reviews.find({
                movieId: parseInt(movieId)
               
            })
            
            return cursor.toArray()
        
        
        }catch(e){
            console.log("Unable to get the reviews")
            return({error: e})
        }
    }

}