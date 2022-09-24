import React, { useContext, useEffect, useState } from 'react'
import Meta from '../components/Meta'
import { DataContext } from '../store/globalState'
import UserCart from '../components/Cart'
import Link from 'next/link'
import { getData } from '../utils/fetchData'
import Modal from '../components/Modal'
import PayPalBtn from '../components/PayPalButton'


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

const cart = () => {
  const { state, dispatch } = useContext(DataContext)
  const { cart, auth } = state

  const [total, setTotal] = useState(0)
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [payment, setPayment] = useState(false)

  useEffect(() => {
    const getTotal = () => {
      const res = cart.reduce((prev: number, item: CartItem) => {
        return prev + (item.price * item.quantity)
      }, 0)

      setTotal(res)
    }

    getTotal()
  })

  useEffect(() => {
    const cartLocal = JSON.parse(localStorage.getItem('__cart') || "")
    if (cartLocal && cart.length > 0) {
      let newArr: any[] = []
      const updateCart = async () => {
        for (const item of cartLocal) {
          const res = await getData(`product/${item._id}`)
          const product = res.product
          if (product.inStock > 0) {
            newArr.push({
              ...product, 
              quantity: item.quantity > product.inStock ? 1 : item.quantity
            })
          }
        }

        dispatch({
          type: 'ADD_CART',
          payload: newArr
        })
      }

      updateCart()
    }
  }, [])

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handlePayment = () => {
    if (!address || !phone) {
      return dispatch({
        type: 'NOTIFY',
        payload: {
          error: 'Please add your address and phone number.'
        }
      })
    } 
    setPayment(true)
  }

  return (
    <div>
      <Meta title='Cart' />
      <div >
        <Modal
          show={show}
          handleClose={handleClose}
        />
        <div>
          <h2 className="text-uppercase">Shopping Cart</h2>
          {
            cart.length === 0 ?
              <div>
                <h3>You have no items in your cart. &nbsp;
                  <Link href="/">
                    <a>Shop now</a>
                  </Link>
                </h3>
                <img
                  className="img-responsive"
                  src='/empty_cart.jpg'
                  alt=""
                  style={{
                    width: '100%'
                  }} />
              </div>
              : <div className='row'>
                {
                  <UserCart cart={cart} dispatch={dispatch} handleShow={handleShow} />
                }
                <div className="col-md-4 my-3 text-uppercase text-secondary ml-3">
                  <form action="">
                    <h2>Shipping</h2>
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      name='address'
                      id='address'
                      value={address}
                      className='form-control mb-2'
                      onChange={e => setAddress(e.target.value)} />

                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="text"
                      name='phone'
                      id='phone'
                      value={phone}
                      className='form-control mb-2'
                      onChange={e => setPhone(e.target.value)} />

                    <h3>Total: <span className='text-info'>${total}</span></h3>

                    {
                      payment ?
                        <PayPalBtn 
                          total={total}
                          address={address}
                          phone={phone} 
                        />
                        : <Link href={auth.user ? "#!" : "/signin"}>
                          <a 
                            className='btn btn-dark my-2'
                            onClick={handlePayment}  
                          >Proceed with payment</a>
                        </Link>
                    }
                  </form>
                </div>
              </div>
          }
        </div>
      </div>
    </div>
  )
}

export default cart