import { useState } from "react";
import type { Review } from "../../types/product";

type Props = {
  onClose: () => void;
  addReview: (data: Review) => void;
};

const ReviewForm: React.FC<Props> = ({ addReview, onClose }) => {
  const [rating, setRaiting] = useState(0);
  const [form, setForm] = useState({
    email: "",
    text: "",
    rating: 0,
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addReview({ ...form });
    onClose();
  };
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Leave a Review</h2>

      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-700">Your rating</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((rate) => (
              <button
                key={rate}
                type="button"
                onMouseEnter={() => setRaiting(rate)}
                onMouseLeave={() => setRaiting(0)}
                onClick={() => setForm({ ...form, rating: rate === form.rating ? 0 : rate })}
                className={`
              transition-all duration-200 transform hover:scale-110 ${
                rate <= (rating || form.rating) ? "text-yellow-500 scale-110" : "text-gray-300 hover:text-yellow-400"
              }
            `}
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Poor</span>
            <span>Excellent</span>
          </div>
        </div>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-700">Your email</span>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </div>
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="pl-10 border border-gray-300 px-4 py-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              type="email"
              placeholder="example@mail.ru"
              required
            />
          </div>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-700">Your review</span>
          <div className="relative">
            <div className="absolute top-3 left-3 pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                />
              </svg>
            </div>
            <textarea
              rows={4}
              value={form.text}
              onChange={(e) => setForm({ ...form, text: e.target.value })}
              className="pl-10 border border-gray-300 px-4 py-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="Share your experience..."
              required
            />
          </div>
          <div className="text-xs text-gray-500 text-right">{form.text.length}/500 characters</div>
        </label>

        <button
          type="submit"
          disabled={!form.rating || !form.email || !form.text}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <div className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Send Review
          </div>
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
