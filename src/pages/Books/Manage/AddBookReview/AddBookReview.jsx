import React, { useState } from 'react'
import InputField from './InputField'
import SelectField from './SelectField'
import { useForm } from 'react-hook-form';

import Swal from 'sweetalert2';
import { useAddBookReviewMutation } from '../../../../redux/features/book-reviews/book-reviews.api';

const AddBookReview = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [imageFile, setimageFile] = useState(null);
    const [addBookReview, { isLoading, isError }] = useAddBookReviewMutation()
    const [imageFileName, setimageFileName] = useState('')
    const onSubmit = async (data) => {

        const newBookData = {
            ...data,
            coverImage: imageFileName
        }
        try {
            await addBookReview(newBookData).unwrap();
            Swal.fire({
                title: "Book added",
                text: "Your book is uploaded successfully!",
                icon: "success",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, It's Okay!"
            });
            reset();
            setimageFileName('')
            setimageFile(null);
        } catch (error) {
            console.error(error);
            alert("Failed to add book. Please try again.")
        }

    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setimageFile(file);
            setimageFileName(file.name);
        }
    }
    return (
        <div className="max-w-lg   mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Book Review</h2>

            {/* Form starts here */}
            <form onSubmit={handleSubmit(onSubmit)} className=''>
                {/* Reusable Input Field for Title */}
                <InputField
                    label="Title"
                    name="title"
                    placeholder="Enter book title"
                    register={register}
                />
                <InputField
                    label="Reviewer Name"
                    name="author"
                    placeholder="Enter book Reviewer name"
                    register={register}
                />

                {/* Reusable Textarea for Description */}
                <InputField
                    label="Review & Author"
                    name="review"
                    placeholder="Enter book Review and Book Author"
                    type="textarea"
                    register={register}

                />

                {/* Reusable Select Field for Category */}
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
                        { value: 'biography', label: 'Biography' },
                        { value: 'dystopia', label: 'Dystopia' },
                        { value: 'science fiction', label: 'Science Fiction' },
                        { value: 'fantasy', label: 'Fantasy' },
                        { value: 'mystery', label: 'Mystery' },
                        { value: 'romance', label: 'Romance' },
                        { value: 'thriller', label: 'Thriller' },
                        { value: 'historical fiction', label: 'Historical Fiction' },
                        { value: 'self-help', label: 'Self-Help' },
                        { value: 'health & wellness', label: 'Health & Wellness' },
                        { value: 'business & economics', label: 'Business & Economics' },
                        { value: 'philosophy', label: 'Philosophy' },
                        { value: 'religion & spirituality', label: 'Religion & Spirituality' },
                        { value: 'poetry', label: 'Poetry' },
                        { value: 'young adult', label: 'Young Adult' },
                        { value: "children's literature", label: "Children's Literature" },
                        { value: "Gothic", label: "Gothic" }
                        // Add more options as needed
                    ]}
                    register={register}
                />

                {/* Trending Checkbox */}
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

                {/* Old Price */}
                <InputField
                    label="Old Price"
                    name="oldPrice"
                    type="number"
                    placeholder="Old Price"
                    register={register}

                />

                {/* New Price */}
                <InputField
                    label="Rating between 1 to 5"
                    name="rating"
                    type="number"
                    placeholder="Ex 5 "
                    register={register}

                />

                {/* Cover Image Upload */}
                <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2 border rounded w-55 p-2" />
                    {imageFileName && <p className="text-sm text-gray-500">Selected: {imageFileName}</p>}
                </div>

                {/* Submit Button */}
                <button type="submit" className="w-full py-2 bg-green-500 text-white font-bold rounded-md">
                    {
                        isLoading ? <span className="">Adding.. </span> : <span>Add Book</span>
                    }
                </button>
            </form>
        </div>
    )
}

export default AddBookReview