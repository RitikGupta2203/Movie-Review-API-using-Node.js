import express from 'express'
import ReviewsController from './reviews.controller.js'

const router = express.Router()

//router.route("/").get((req, res)=>res.send("This is the DEMO ROUTE EXPRESS"))


router.route("/movie/:id").get(ReviewsController.apiGetReviews)
router.route("/new").post(ReviewsController.apiPostReviews)
router.route(":/id")
            .get(ReviewsController.apiGetReviews)
            .put(ReviewsController.apiUpdateReviews)
            .delete(ReviewsController.apiDeleteReviews)

export default router