import React, { useEffect } from 'react';
import InputField from '../addBook/InputField';
import SelectField from '../addBook/SelectField';
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

    // Fetch the book review data by ID
    const { data: bookReviewData, isLoading, isError, refetch } = useFetchBookReviewByIdQuery(id);

    // RTK Query mutation hook
    const [updateBookReview, { isLoading: isUpdating }] = useUpdateBookReviewMutation();

    // react-hook-form
    const { register, handleSubmit, setValue } = useForm();

    // Prefill form when data is available
    useEffect(() => {
        if (bookReviewData) {
            setValue('title', bookReviewData.title);
            setValue('review', bookReviewData.review);
            setValue('category', bookReviewData.category);
            setValue('trending', bookReviewData.trending);
            setValue('oldPrice', bookReviewData.oldPrice);
            setValue('newPrice', bookReviewData.newPrice);
            setValue('coverImage', bookReviewData.coverImage);
        }
    }, [bookReviewData, setValue]);

    const onSubmit = async (data) => {
        const updateData = {
            ...data,
            trending: data.trending || false,
            oldPrice: Number(data.oldPrice),
            newPrice: Number(data.newPrice)
        };

        try {
            await updateBookReview({ id, ...updateData }).unwrap();

            Swal.fire({
                title: "Book Review Updated",
                text: "Your book review has been updated successfully!",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK"
            });

            refetch(); // Refresh data
        } catch (error) {
            console.error("Failed to update book review:", error);
            Swal.fire({
                title: "Error",
                text: "Failed to update book review. Please try again.",
                icon: "error",
                confirmButtonColor: "#d33",
                confirmButtonText: "OK"
            });
        }
    };

    if (isLoading) return <Loading />;
    if (isError) return <div>Error fetching book review data.</div>;

    return (
        <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Book Review</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField
                    label="Title"
                    name="title"
                    placeholder="Enter book title"
                    register={register}
                />

                <InputField
                    label="Review"
                    name="review"
                    placeholder="Enter book review"
                    type="textarea"
                    register={register}
                />

                <SelectField
                    label="Category"
                    name="category"
                    options={[
                        { value: '', label: 'Choose A Category' },
                        { value: 'business', label: 'Business' },
                        { value: 'technology', label: 'Technology' },
                        { value: 'fiction', label: 'Fiction' },
                        { value: 'horror', label: 'Horror' },
                        { value: 'adventure', label: 'Adventure' },
                    ]}
                    register={register}
                />

                <div className="mb-4">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            {...register('trending')}
                            className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
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
                />

                <InputField
                    label="New Price"
                    name="newPrice"
                    type="number"
                    placeholder="New Price"
                    register={register}
                />

                <InputField
                    label="Cover Image URL"
                    name="coverImage"
                    type="text"
                    placeholder="Cover Image URL"
                    register={register}
                />

                <button
                    type="submit"
                    className={`w-full py-2 font-bold rounded-md text-white ${isUpdating ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
                    disabled={isUpdating}
                >
                    {isUpdating ? 'Updating...' : 'Update Book Review'}
                </button>
            </form>
        </div>
    );
};

export default UpdateBookReview;
