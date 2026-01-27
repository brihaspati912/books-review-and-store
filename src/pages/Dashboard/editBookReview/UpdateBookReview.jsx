import React, { useEffect, useState } from 'react';
import InputField from '../../Books/Manage/AddBookReview/InputField';
import SelectField from '../../Books/Manage/AddBookReview/SelectField';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Loading from '../../../components/Loading';
import Swal from 'sweetalert2';
import {
    useFetchBookReviewByIdQuery,
    useUpdateBookReviewMutation
} from '../../../redux/features/book-reviews/book-reviews.api';

const UpdateBookReview = () => {
    const { id } = useParams();
    const { data: bookReviewData, isLoading, isError, refetch } = useFetchBookReviewByIdQuery(id);
    const [updateBookReview] = useUpdateBookReviewMutation();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm();

    const [imagePreview, setImagePreview] = useState("");

    // Watch review for word counter
    const reviewText = watch("review") || "";
    const wordCount = reviewText.trim() ? reviewText.trim().split(/\s+/).length : 0;

    // Watch image URL changes
    const imageUrl = watch("coverImage");

    useEffect(() => {
        if (bookReviewData) {
            setValue('title', bookReviewData.title);
            setValue('review', bookReviewData.review);
            setValue('category', bookReviewData.category);
            setValue('trending', bookReviewData.trending);
            setValue('oldPrice', bookReviewData.oldPrice);
            setValue('newPrice', bookReviewData.newPrice);
            setValue('rating', bookReviewData.rating);
            setValue('coverImage', bookReviewData.coverImage);
            setImagePreview(bookReviewData.coverImage);
        }
    }, [bookReviewData, setValue]);

    useEffect(() => {
        if (imageUrl) setImagePreview(imageUrl);
    }, [imageUrl]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const localUrl = URL.createObjectURL(file);
            setImagePreview(localUrl);

            // Replace with uploaded URL if using cloud storage later
            setValue("coverImage", file.name);
        }
    };

    const onSubmit = async (data) => {
        const updateBookReviewData = {
            title: data.title,
            review: data.review,
            category: data.category,
            trending: data.trending || false,
            oldPrice: Number(data.oldPrice),
            newPrice: Number(data.newPrice),
            rating: Number(data.rating),
            coverImage: data.coverImage || bookReviewData.coverImage,
        };

        try {
            await updateBookReview({ id, ...updateBookReviewData }).unwrap();

            Swal.fire({
                title: "Book Review Updated",
                text: "Your book review has been updated successfully!",
                icon: "success",
                confirmButtonColor: "#3085d6",
            });

            await refetch();
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Failed to update book review.", "error");
        }
    };

    if (isLoading) return <Loading />;
    if (isError) return <div>Error fetching book review data</div>;

    return (
        <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Book Review</h2>

            <form onSubmit={handleSubmit(onSubmit)}>

                <InputField
                    label="Title"
                    name="title"
                    register={register}
                    errors={errors}
                    validation={{ required: "Title is required" }}
                />

                <InputField
                    label="Review"
                    name="review"
                    type="textarea"
                    register={register}
                    errors={errors}
                    validation={{
                        required: "Review is required",
                        validate: value => {
                            const count = value.trim().split(/\s+/).length;
                            return count <= 300 || `Review cannot exceed 300 words (Currently ${count})`;
                        }
                    }}
                />

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
                        { value: 'fiction', label: 'Fiction' },
                        { value: 'science-fiction', label: 'Science Fiction' },
                        { value: 'fantasy', label: 'Fantasy' },
                        { value: 'mystery', label: 'Mystery' },
                        { value: 'thriller', label: 'Thriller' },
                        { value: 'romance', label: 'Romance' },
                        { value: 'horror', label: 'Horror' },
                        { value: 'biography', label: 'Biography' },
                        { value: 'philosophy', label: 'Philosophy' },
                        { value: 'self-help', label: 'Self-Help' },
                        { value: 'young-adult', label: 'Young Adult' },
                    ]}
                />

                <div className="mb-4">
                    <label className="inline-flex items-center">
                        <input type="checkbox" {...register('trending')} />
                        <span className="ml-2 text-sm font-semibold text-gray-700">Trending</span>
                    </label>
                </div>

                <InputField
                    label="Old Price"
                    name="oldPrice"
                    type="number"
                    register={register}
                    errors={errors}
                />

                <InputField
                    label="New Price"
                    name="newPrice"
                    type="number"
                    register={register}
                    errors={errors}
                />

                <InputField
                    label="Rating (1–5)"
                    name="rating"
                    type="number"
                    register={register}
                    errors={errors}
                    validation={{
                        required: "Rating is required",
                        min: { value: 1, message: "Minimum rating is 1" },
                        max: { value: 5, message: "Maximum rating is 5" }
                    }}
                />

                {/* IMAGE URL */}
                <InputField
                    label="Cover Image URL"
                    name="coverImage"
                    type="text"
                    register={register}
                    errors={errors}
                />

                {/* FILE UPLOAD */}
                <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Or Upload Image
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full border p-2 rounded-md"
                    />
                </div>

                {/* PREVIEW */}
                {imagePreview && (
                    <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-1">Image Preview:</p>
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-32 h-40 object-cover rounded shadow"
                        />
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition"
                >
                    Update Book Review
                </button>
            </form>
        </div>
    );
};

export default UpdateBookReview;
