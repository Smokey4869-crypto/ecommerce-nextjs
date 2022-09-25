import React from 'react'
import Link from 'next/link'
import { patchData } from '../utils/fetchData'
import PayPalBtn from '../components/PayPalButton'

interface User {
    _id: string,
    name: string,
    email: string,
    role: string,
    root: boolean
}

interface Order {
    _id: string,
    createdAt: string,
    user: User,
    address: string,
    phone: string,
    cart: [],
    total: string,
    delivered: boolean,
    updatedAt: string,
    paid: boolean,
    dateOfPayment: string
}

interface Product {
    _id: string,
    images: [{
        public_id: string,
        url: string
    }],
    inStock: number,
    sold: number,
    title: string,
    price: number,
    description: string,
    content: string,
    category: string,
    quantity: number,
}

const Order = ({ orderDetail, state, dispatch }: { orderDetail: Order[], state: any, dispatch: any }) => {
    const { auth, orders } = state

    const handleDelivery = (order: Order) => {
        dispatch({
            type: 'NOTIFY',
            payload: { loading: true }
        })

        patchData
    }
    return (
        <>
            {
                orderDetail.map((item: Order) => (
                    <div style={{
                        maxWidth: '600px',
                        margin: '20px auto'
                    }}>
                        <div key={item._id}
                            className="text-uppercase my-3">
                            <h2 className="text-break">Order {item._id}</h2>
                            <div className="mt-4 text-secondary">
                                <h4>Shipping</h4>
                                <p>Name: {item.user.name}</p>
                                <p>Email: {item.user.email}</p>
                                <p>Address: {item.address}</p>
                                <p>Mobile: {item.phone}</p>

                                <div className={`alert ${item.delivered ? 'alert-success' : 'alert-danger'} d-flex justify-content-between align-items-center`} role="alert">
                                    {
                                        item.delivered ? `Delivered on ${item.updatedAt}` : 'Not delivered yet'
                                    }
                                </div>

                                <h3>Payment</h3>
                                <div className={`alert ${item.delivered ? 'alert-success' : 'alert-danger'} d-flex justify-content-between align-items-center`} role="alert">
                                    {
                                        item.paid ? `Payment completed on ${item.dateOfPayment}` : 'Not Paid'
                                    }
                                </div>

                                <div>
                                    <h4>Items</h4>
                                    {
                                        item.cart.map((item: Product) => (
                                            <div className='border-bottom mb-4'
                                                key={item._id}
                                                style={{
                                                    display: 'flex'
                                                }}>
                                                <img src={item.images[0].url} alt={item.images[0].url}
                                                    style={{
                                                        width: '100px',
                                                        height: '75px',
                                                        objectFit: 'cover'
                                                    }} />
                                                <h5 className='flex-fill text-secondary px-3 m-0'>
                                                    <Link href={`/product/${item._id}`}>
                                                        <a style={{
                                                            textDecoration: 'none',
                                                            color: 'black'
                                                        }}>{item.title}</a>
                                                    </Link>
                                                </h5>

                                                <span className='text-info text-lowercase'>
                                                    {item.quantity} x ${item.price} = ${item.quantity * item.price}
                                                </span>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>

                        {
                            !item.paid && <div>
                                <h2 className='ml-0 mb-4 text-uppercase'>Total: ${item.total}</h2>
                                <PayPalBtn order={item} />
                            </div>
                        }
                    </div>
                ))
            }
        </>
    )
}

export default Order