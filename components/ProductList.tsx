import React from 'react'
import Link from 'next/link'
import { useContext } from 'react'
import { DataContext } from '../store/globalState'
import { addToCart } from '../store/Actions'

interface Product {
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
    sold: number
}

const ProductList = ({ products }: { products: [Product] }) => {
    return (
        <div className='products'>
            {
                products.map((item) => (
                    <ProductItem key={item._id} product={item}/>
                ))
            }
        </div>
    )
}

const ProductItem = ({ product }: { product: Product }) => {
    const { state, dispatch } = useContext(DataContext)
    const { cart } = state 

    const userLink = () => {
        return (
            <>
                <Link href={`product/[id]`} as={`product/${product._id}`}>
                    <a 
                        className='btn btn-info mr-1'
                        style={{
                            marginRight: "5px",
                            flex: 1
                        }}    
                    >View</a>
                </Link>
                <button 
                    className='btn btn-success ml-1 flex-1'
                    disabled={product.inStock === 0 ? true : false }
                    onClick={() => dispatch(addToCart(product, cart))}>
                    Buy now
                </button>
            </>
        )
    }
    return (
        <div className="card" style={{width: "18rem"}}>
            <img className="card-img-top" src={product.images[0].url} alt={product.images[0].url}/>
                <div className="card-body">
                    <h5 className="card-title text-capitalize" title={product.title}>
                        {product.title}
                    </h5>

                    <div className='row justify-content-between'>
                        <h6 style={{
                            color: "blue"
                        }}>
                            ${product.price}
                        </h6>
                        {
                            product.inStock > 0
                            ? <h6 className='text-danger'>
                                In Stock: {product.inStock}
                            </h6>
                            : <h6 className="text-danger">
                                Out Stock
                            </h6>
                        }
                    </div>
                    <p className="card-text" title={product.description}>
                        {product.description}
                    </p>

                    <div className="row justity-content-between mx-0">
                        {
                            userLink()
                        }
                    </div>
                </div>
        </div>
    )
}

export default ProductList

