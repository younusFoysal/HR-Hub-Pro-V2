import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import useAuth from "../../../hooks/useAuth.js";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";

const PostReview = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: user?.displayName,
        designation: 'HR',
        review_text: '',
    });
    const axiosSecure = useAxiosSecure()

    const [responseMessage, setResponseMessage] = useState('');
    const [isError, setIsError] = useState(false);

    // Mutation to post review data
    const { mutateAsync } = useMutation({
        mutationFn: async (reviewData) => {
            const { data } = await axiosSecure.post('/reviews', reviewData);
            return data;
        },
        onSuccess: () => {
            console.log('Review submitted successfully');
            toast.success('Review Submitted Successfully!');
            setFormData({ name: '', designation: '', review_text: '' }); // Reset form
            setLoading(false);
            refetch();
        },
        onError: (error) => {
            console.error(error);
            setResponseMessage('Failed to submit review.');
            setIsError(true);
            setLoading(false);
        },
    });

    // Query to fetch reviews
    const { data: allreviews = [], isLoading, refetch } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const { data } = await axios.get('/reviews');
            return data;
        },
    });

    // Form handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResponseMessage('');
        setIsError(false);

        const reviewData = {
            name: formData.name,
            designation: formData.designation,
            review_text: formData.review_text,
        };

        try {
            await mutateAsync(reviewData);
        } catch (err) {
            console.error(err);
            setResponseMessage('An error occurred. Please try again.');
            setIsError(true);
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4">Post a Review</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        disabled
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="designation">
                        Designation
                    </label>
                    <input
                        type="text"
                        id="designation"
                        disabled
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="review_text">
                        Review Text
                    </label>
                    <textarea
                        id="review_text"
                        name="review_text"
                        value={formData.review_text}
                        onChange={handleChange}
                        rows="4"
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full ${loading ? 'bg-gray-400' : 'bg-green-600'} text-white py-2 px-4 rounded-md hover:bg-blue-600`}
                >
                    {loading ? 'Submitting...' : 'Submit Review'}
                </button>
            </form>

            {responseMessage && (
                <p
                    className={`mt-4 text-center ${isError ? 'text-red-500' : 'text-green-500'}`}
                >
                    {responseMessage}
                </p>
            )}

        </div>
    );
};

export default PostReview;
