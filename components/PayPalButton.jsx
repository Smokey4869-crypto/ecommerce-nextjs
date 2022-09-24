import React, { useContext, useEffect } from 'react'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { DataContext } from '../store/globalState'
import { updateItem } from '../store/Actions'
import { patchData, postData } from '../utils/fetchData'

const PayPalBtn = ({total, address, phone}) => {
    const { state, dispatch } = useContext(DataContext)
    const { auth, cart } = state

    return (
        <div>
            <PayPalButtons
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: total
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
                    
                    postData('order', {
                        address, phone, cart, total
                    }, auth.token)
                    .then(res => {
                        if (res.error) {
                            return dispatch({
                                type: 'NOTIFY',
                                payload: {
                                    error: res.error
                                }
                            })
                        }
                        dispatch({
                            type: 'ADD_CART',
                            payload: []
                        })

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

