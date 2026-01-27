import React, { useState } from 'react'
import InputField from './InputField'
import SelectField from './SelectField'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { useAddBookReviewMutation } from '../../../redux/features/book-reviews/book-reviews.api'

const AddBookReview = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch
    } = useForm()

    const [imageFile, setimageFile] = useState(null)
    const [imageFileName, setimageFileName] = useState('')
    const [addBookReview, { isLoading }] = useAddBookReviewMutation()

    const reviewText = watch("review") || ""
    const wordCount = reviewText.trim() ? reviewText.trim().split(/\s+/).length : 0

    const onSubmit = async (data) => {
        const newBookData = {
            ...data,
            coverImage: imageFileName
        }

        try {
            await addBookReview(newBookData).unwrap()
            Swal.fire({
                title: "Book added",
                text: "Your book is uploaded successfully!",
                icon: "success",
                confirmButtonColor: "#3085d6"
            })
            reset()
            setimageFileName('')
            setimageFile(null)
        } catch (error) {
            console.error(error)
            Swal.fire("Error", "Failed to add book. Please try again.", "error")
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setimageFile(file)
            setimageFileName(file.name)
        }
    }

    return (
        <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Book Review</h2>

            <form onSubmit={handleSubmit(onSubmit)}>

                <InputField
                    label="Title"
                    name="title"
                    placeholder="Enter book title"
                    register={register}
                    errors={errors}
                    validation={{ required: "Title is required" }}
                />

                <InputField
                    label="Reviewer Name"
                    name="author"
                    placeholder="Enter reviewer name"
                    register={register}
                    errors={errors}
                    validation={{ required: "Reviewer name is required" }}
                />

                <InputField
                    label="Review"
                    name="review"
                    type="textarea"
                    placeholder="Write your review (max 300 words)"
                    register={register}
                    errors={errors}
                    validation={{
                        required: "Review is required",
                        validate: value => {
                            const count = value.trim().split(/\s+/).length
                            return count <= 300 || `Review cannot exceed 300 words (Currently ${count})`
                        }
                    }}
                />

                {/* Live Word Counter */}
                <p className={`text-sm mb-4 ${wordCount > 300 ? 'text-red-500' : 'text-gray-500'}`}>
                    {wordCount} / 300 words
                </p>

                <SelectField
                    label="Category"
                    name="category"
                    register={register}
                    errors={errors}
                    validation={{ required: "Please select a category" }}
                    options={[
                        { value: '', label: 'Choose A Category' },
                        { value: 'business', label: 'Business' },
                        { value: 'technology', label: 'Technology' },
                        { value: 'fiction', label: 'Fiction' },
                        { value: 'horror', label: 'Horror' },
                        { value: 'adventure', label: 'Adventure' },
                        { value: 'mystery', label: 'Mystery' },
                        { value: 'romance', label: 'Romance' },
                        { value: 'sci-fi', label: 'Sci-Fi' },
                        { value: 'biography', label: 'Biography' },
                        { value: 'self-help', label: 'Self-Help' },
                        { value: 'health', label: 'Health' },
                        { value: 'history', label: 'History' },
                        { value: 'travel', label: 'Travel' },
                        { value: 'children', label: 'Children' },
                        { value: 'fantasy', label: 'Fantasy' },
                        { value: 'education', label: 'Education' },
                        { value: 'comics', label: 'Comics' },
                        { value: 'cookbooks', label: 'Cookbooks' },
                    ]}
                />

                <div className="mb-4">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            {...register('trending')}
                            className="rounded text-blue-600 focus:ring focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm font-semibold text-gray-700">Trending</span>
                    </label>
                </div>

                <InputField
                    label="Old Price"
                    name="oldPrice"
                    type="number"
                    placeholder="Old Price"
                    register={register}
                    errors={errors}
                />

                <InputField
                    label="Rating (1–5)"
                    name="rating"
                    type="number"
                    placeholder="Example: 5"
                    register={register}
                    errors={errors}
                    validation={{
                        required: "Rating is required",
                        min: { value: 1, message: "Minimum rating is 1" },
                        max: { value: 5, message: "Maximum rating is 5" }
                    }}
                />

                <button
                    type="submit"
                    className="w-full py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-md transition"
                >
                    {isLoading ? "Adding..." : "Add Book"}
                </button>
            </form>
        </div>
    )
}

export default AddBookReview
