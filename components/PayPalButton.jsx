import React, { useContext, useEffect } from 'react'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { DataContext } from '../store/globalState'
import { updateItem } from '../store/Actions'
import { patchData, postData } from '../utils/fetchData'

const PayPalBtn = ({order}) => {
    const { state, dispatch } = useContext(DataContext)
    const { auth, orders } = state

    return (
        <div>
            <PayPalButtons
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: order.total
                                }
                            }
                        ]
                    })
                }}

                onApprove={(data, actions) => {
                    dispatch({
                        type: 'NOTIFY',
                        payload: {
                            loading: true
                        }
                    })
                    
                    patchData(`order/${order._id}`, null, auth.token)
                    .then(res => {
                        if (res.error) {
                            return dispatch({
                                type: 'NOTIFY',
                                payload: {
                                    error: res.error
                                }
                            })
                        }

                        dispatch(updateItem(orders, order._id, {
                            ...order,
                            paid: true,
                            dateOfPayment: new Date().toISOString()
                        }, 'ADD_ORDERS'))

                        return dispatch({
                            type: 'NOTIFY',
                            payload: {
                                success: res.msg
                            }
                        })
                    })

                    // dispatch({
                    //     type: "NOTIFY",
                    //     payload: {
                    //         loading: true
                    //     }
                    // })

                    
                }}
            />
        </div>
    )
}

export default PayPalBtn

