import React from 'react'
import { useGetOrdersByEmailQuery } from '../../redux/features/orders/ordersApi';
import { useAuth } from '../../Context/AuthContext';


//7:17 fix error why the orders info is not shown on the page


function Orders() {
    const { currentUser } = useAuth();
    const { data, isLoading, isError } =
        useGetOrdersByEmailQuery(currentUser?.email);

    const orders = data?.orders || [];

    if (isLoading) {
        return <div>Loading orders...</div>;
    }
    if (isError) {
        return <div>Error fetching orders.</div>;
    }
    return (
        <>
            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-semibold mb-4">Your Orders</h1>


                {
                    orders.length === 0 ?
                        (<p>No orders found.</p>) : (
                            orders.map((order, index) => (
                                <div key={order._id} className="bg-white rounded shadow-lg p-4">
                                    <div className="border-b mb-4 pb-4"></div>
                                    {index + 1}
                                    <h2 className="font-bold">Order ID: {order?._id}</h2>
                                    <p className="text-gray-600">Name: {order.name}</p>
                                    <p className="text-gray-600">Email: {order.email}</p>
                                    <p className="text-gray-600">Phone: {order.phone}</p>
                                    <p className="text-gray-600">Total Price: ${order.totalPrice}</p>
                                    <h3 className="font-semibold mt-2">Address:</h3>
                                    <p> City: {order.city}, State: {order.state}, Country: {order.country}, ZipCode: {order.zipCode}   </p>
                                    <h3 className="font-semibold mt-2">Products Id:</h3>
                                    <ul>

                                        <li key={`${order._id}-${index}`}>{order.productIds}</li>

                                    </ul>
                                </div>
                            )
                            )
                        )

                }


            </div>


        </>
    )
}

export default Orders