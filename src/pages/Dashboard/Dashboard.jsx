import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdIncompleteCircle } from 'react-icons/md';
import getBaseUrl from '../../utils/baseURL';
import Loading from '../../components/Loading';
import RevenueChart from './RevenueChart';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${getBaseUrl()}/api/admin`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                });
                setData(response.data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <Loading />;

    return (
        <section className="p-6 md:p-10 bg-gray-100 min-h-screen">
            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
                {/* Products */}
                <Card iconColor="purple" iconBg="bg-purple-100" value={data?.totalBooks} label="Products" icon={
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                } />

                {/* Total Sales */}
                <Card iconColor="green" iconBg="bg-green-100" value={`$${data?.totalSales}`} label="Total Sales" icon={
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                } />

                {/* Trending Books */}
                <Card iconColor="red" iconBg="bg-red-100" value={data?.trendingBooks} label="Trending Books" extraLabel="(13%)" icon={
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                    </svg>
                } />

                {/* Total Orders */}
                <Card iconColor="blue" iconBg="bg-blue-100" value={data?.totalOrders} label="Total Orders" icon={<MdIncompleteCircle className="h-6 w-6" />} />
            </div>

            {/* Revenue & Other Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                {/* Revenue Chart */}
                <div className="lg:col-span-2 xl:col-span-2 bg-white shadow rounded-lg p-4 flex flex-col">
                    <h2 className="font-semibold text-gray-700 mb-4 border-b pb-2">Revenue Per Month</h2>
                    <div className="flex-grow">
                        <div className="h-64">
                            <RevenueChart data={data?.monthlyRevenue} />
                        </div>
                    </div>
                </div>

                {/* Orders Left */}
                <Card iconColor="yellow" iconBg="bg-yellow-100" value="02" label="Orders Left" icon={
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path fill="#fff" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                    </svg>
                } />

                {/* Website Visits */}
                <Card iconColor="teal" iconBg="bg-teal-100" value="139" label="Website Visits (last day)" icon={
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                } />
            </div>

            {/* Users Table */}
            <div className="mt-6 bg-white shadow rounded-lg overflow-auto">
                <h2 className="px-6 py-4 font-semibold border-b border-gray-200">Users by Average Order</h2>
                <div className="p-6">
                    <ul className="space-y-4">
                        {data?.users?.map((user, idx) => (
                            <li key={idx} className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <img className="h-10 w-10 rounded-full mr-4" src={user.avatar} alt={user.name} />
                                    <span className="text-gray-700">{user.name}</span>
                                </div>
                                <span className="font-semibold">{user.avgOrder}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
