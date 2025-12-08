import React from 'react'

export default function BookReview() {
    return (
        <>
            <div>BookReview</div>





            <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                {/* Book Image */}
                <div className="h-64 w-full bg-gray-100 flex items-center justify-center">
                    <img
                        src={`../src/assets/${book.coverImage}`}
                        alt={book.title}
                        className="h-full w-full object-cover"
                    />
                </div>

                {/* Book Info */}
                <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{book.title}</h2>
                    <p className="text-gray-600 mb-4">
                        {book.description.length > 100
                            ? `${book.description.slice(0, 100)}...`
                            : book.description}
                    </p>
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-lg font-semibold text-blue-600">
                            ${book.newPrice}
                        </span>
                        {book.oldPrice && (
                            <span className="line-through text-gray-400">${book.oldPrice}</span>
                        )}
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-all duration-200"
                    >
                        <FiShoppingCart size={20} />
                        Add to Cart
                    </button>
                </div>
            </div>
        </>

    )
}
