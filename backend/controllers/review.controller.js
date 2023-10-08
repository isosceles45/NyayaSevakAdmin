import Review from "../models/review.model.js";
import lawyerModel from "../models/lawyers.model.js";
export const createReview = async (req, res) => {
  const { lawyerId, senderId, review, rating } = req.body;
  const newReview = new Review({
    lawyerId,
    senderId,
    review,
    rating,
  });
  const lawyer = await lawyerModel.findById(lawyerId);
  const prevReviews = lawyer.reviews;
  const prevRating = lawyer.rating;
  const newRating =
    (prevRating * prevReviews.length + rating) / (prevReviews.length + 1);
 
  await lawyerModel.findByIdAndUpdate(lawyerId, {
    reviews: [...prevReviews, newReview],
    rating: newRating,
  })

  console.log(lawyer);
  try {
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
