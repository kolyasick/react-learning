import type { Product, Review } from "../../../types/product";
import { useState, type JSX } from "react";
import ReviewForm from "./ReviewForm";
import ReviewItem from "./ReviewItem";

type Props = {
  product: Product;
  renderRatingStars: (raiting: number) => JSX.Element[];
  addReview: (data: Review) => void;
};

const ProductReviews: React.FC<Props> = ({ product, renderRatingStars, addReview }) => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
      {isFormOpen ? (
        <ReviewForm onClose={() => setIsFormOpen(false)} addReview={addReview} />
      ) : (
        <div className="text-center">
          <div className="flex justify-center items-center mb-4">{renderRatingStars(product.rating)}</div>
          <div className="text-4xl font-bold text-gray-900 mb-2">{product.rating}/5</div>
          <div className="text-gray-600 mb-4">Based on {product.reviews} reviews</div>

          {product.reviewList?.length ? (
            <div className="flex flex-col gap-4 mb-4">
              {product.reviewList?.map((r) => (
                <ReviewItem key={r.text} review={r} />
              ))}
            </div>
          ) : (
            ""
          )}

          <button
            onClick={() => setIsFormOpen(true)}
            className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Write a Review
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
