import { useEffect, useState } from "react";
import { useProduct } from "../hooks/useProduct";
import { useParams } from "react-router";
import type { Product, Review } from "../types/product";
import { CheckIcon, ShieldCheckIcon } from "@heroicons/react/24/solid";
import ProductReviews from "../components/review/ProductReviews";

type Props = {
  addToCart: (product: Product, initial?: boolean) => void;
  deleteFromCart: (p: Product, isTotal: boolean) => void;
  getProductQty: (p: Product) => number;
};

const ProductPage: React.FC<Props> = ({ addToCart, deleteFromCart, getProductQty }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const { products } = useProduct();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (products.length > 0 && id) {
      const foundProduct = products.find((p) => p.id === Number(id));
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
  }, [products, id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  const renderRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const partialStar = rating - fullStars;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`full-${i}`} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    if (partialStar > 0) {
      stars.push(
        <div key="partial" className="relative">
          <svg className="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <div className="absolute top-0 left-0 overflow-hidden" style={{ width: `${partialStar * 100}%` }}>
            <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
      );
    }

    return stars;
  };

  const addReview = (data: Review) => {
    if (!data || Object.values(data).some((f) => !f)) return;
    product.reviewList?.push(data);
    setProduct({ ...product, reviews: product.reviews + 1 });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <a href="/" className="text-gray-400 hover:text-gray-500">
                Home
              </a>
            </li>
            <li>
              <span className="text-gray-400">/</span>
            </li>
            <li>
              <span className="text-gray-600 font-medium">{product.name}</span>
            </li>
          </ol>
        </nav>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            <div className="space-y-4">
              <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-xl overflow-hidden">
                <img src={"/products/" + product.image} alt={product.name} className="w-full h-full object-cover object-center" />
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="aspect-square bg-gray-100 rounded-lg cursor-pointer border-2 border-transparent hover:border-blue-500">
                    <img src={"/products/" + product.image} alt={`${product.name} ${item}`} className="w-full h-full object-cover rounded-lg" />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                  <div className="flex items-center space-x-1">
                    {renderRatingStars(product.rating)}
                    <span className="ml-2 text-sm text-gray-600">({product.reviews} reviews)</span>
                  </div>
                </div>
                <p className="mt-2 text-lg text-gray-500">{product.brand}</p>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-4xl font-bold text-gray-900">
                  {product.currency} {product.price}
                </span>
                {product.inStock ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <CheckIcon className="w-4 h-4 mr-1" />
                    In Stock
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">Out of Stock</span>
                )}
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-900">Category:</span>
                  <span className="ml-2 text-gray-600">{product.category}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Brand:</span>
                  <span className="ml-2 text-gray-600">{product.brand}</span>
                </div>
              </div>

              {getProductQty(product) <= 0 ? (
                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={product.inStock ? () => addToCart(product, true) : () => {}}
                    className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
                      product.inStock ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={!product.inStock}
                  >
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </button>
                  <button className="py-3 px-6 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    Wishlist
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3 pt-4">
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => deleteFromCart(product, false)}
                      className="w-12 h-12 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-800"
                      aria-label="Decrease quantity"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>

                    <div className="w-16 h-12 flex items-center justify-center bg-white">
                      <span className="text-lg font-semibold text-gray-900">{getProductQty(product)}</span>
                    </div>

                    <button
                      onClick={() => addToCart(product, false)}
                      className="w-12 h-12 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-800"
                      aria-label="Increase quantity"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>

                  <button
                    onClick={() => deleteFromCart(product, true)}
                    className="flex-1 py-3 px-6 border border-red-300 rounded-lg font-medium text-red-700 hover:bg-red-50 transition-colors"
                  >
                    Remove from Cart
                  </button>
                </div>
              )}

              <div className="flex items-center justify-center space-x-6 pt-4 border-t border-gray-200">
                <div className="flex items-center text-sm text-gray-500">
                  <ShieldCheckIcon className="w-5 h-5 text-green-500 mr-1" />
                  2-Year Warranty
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-5 h-5 text-blue-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                  Free Shipping
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Specifications</h2>
            <div className="space-y-4">
              {product.features.map((feature, index) => (
                <div key={index} className="flex justify-between py-3 border-b border-gray-100">
                  <span className="font-medium text-gray-500">{index + 1}.</span>
                  <span className="text-gray-900">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <ProductReviews product={product} renderRatingStars={renderRatingStars} addReview={addReview} />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
