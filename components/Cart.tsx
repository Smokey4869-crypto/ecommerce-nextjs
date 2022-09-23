import React from 'react'
import Link from 'next/link'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { decrease, increase } from '../store/Actions'


interface CartItem {
    _id: string,
    title: string,
    price: number,
    description: string,
    content: string,
    images: [{
        public_id: string,
        url: string
    }],
    category: string,
    checked: boolean,
    inStock: number,
    sold: number,
    quantity: number
}

const Cart = ({ cart, dispatch, handleShow }: { cart: [CartItem], dispatch: any, handleShow: any }) => {
    return (
        <div className='cart col-md-7 text-secondary table-responsive my-3 mr-5'>
            {
                cart.map((item) => (
                    <CartItem key={item._id} item={item} dispatch={dispatch} cart={cart} handleShow={handleShow} />
                ))
            }
        </div>
    )
}

const CartItem = ({ item, dispatch, cart, handleShow }: { item: CartItem, dispatch: any, cart: [CartItem], handleShow: any }) => {
    return (
        <div className='cart-item'>
            <img
                className='img-thumbnail w-180'
                src={item.images[0].url}
                style={{
                    width: "14rem",
                    height: '10rem'
                }}
                alt="" />
            <div className='description'>
                <Link href={`product/${item._id}`}>
                    <a>{item.title}</a>
                </Link>
                <h6>Quantity: {item.quantity} </h6>
                <h6>Total: ${item.quantity * item.price} </h6>
                <h6>
                    {
                        item.inStock > 0
                            ? <p className='text-danger'>In Stock: {item.inStock}</p>
                            : <p className='text-danger'>Out Stock</p>
                    }
                </h6>

                <div style={{
                    cursor: 'pointer'
                }}>
                    <button
                        className='btn btn-outline-secondary'
                        onClick={() => dispatch(decrease(cart, item._id))}
                        disabled={item.quantity === 1 ? true : false}
                    > - </button>
                    <span className='px-3'> {item.quantity} </span>
                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => dispatch(increase(cart, item._id))}
                        disabled={item.quantity === item.inStock ? true : false}
                    > + </button>
                </div>

                <div>
                    <button type='button' className="button-delete" data-toggle="modal" data-target="#exampleModal"
                        onClick={handleShow}
                    >
                        <DeleteOutlineOutlinedIcon />
                    </button>
                </div>
            </div>
        </div>

    )
}
export default Cart