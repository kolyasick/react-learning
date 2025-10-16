import type { Review } from "../../../types/product";
type Props = {
  review: Review;
};

const ReviewItem: React.FC<Props> = ({ review }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <svg
        key={index}
        className={`w-4 h-4 ${index < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
          {review.email.charAt(0).toUpperCase()}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-900 text-sm">{review.email}</span>
              <div className="flex items-center space-x-1">{renderStars(review.rating)}</div>
            </div>
            <span className="text-xs text-gray-500">{Math.floor(Math.random() * 30) + 1}d ago</span>
          </div>

          <p className="text-gray-700 text-sm leading-relaxed text-start wrap-break-word line-clamp-4 overflow-hidden">{review.text}</p>

          <div className="flex items-center space-x-4 mt-3">
            <button className="text-xs text-gray-500 hover:text-gray-700 transition-colors">Helpful</button>
            <button className="text-xs text-gray-500 hover:text-gray-700 transition-colors">Reply</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
