import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { DataContext } from '../../store/globalState'
import { useRouter } from 'next/router'
import Meta from '../../components/Meta'
import Orders from '../../components/Order'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'

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

const OrderDetail = () => {
    const { state, dispatch } = useContext(DataContext)
    const { auth, orders } = state

    const router = useRouter()

    const [orderDetail, setOrderDetail] = useState<Order[]>([])

    useEffect(() => {
        const newArr = orders.filter((item: Order) => item._id === router.query.id)
        setOrderDetail(newArr)
    }, [orders])

    if (!auth.user) {
        return null
    }

    return (
        <div>
            <Meta title='Order Detail' />

            <div>
                <button className="btn btn-dark"
                    onClick={() => router.back()}>
                    <KeyboardArrowLeftIcon />
                </button>
            </div>

            <Orders orderDetail={orderDetail} state={state} dispatch={dispatch}/>
            
        </div>
    )
}

export default OrderDetail