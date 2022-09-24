import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import React, { useContext, useState } from 'react'
import Meta from '../../components/Meta'
import { getData } from '../../utils/fetchData'
import { DataContext } from '../../store/globalState'
import { addToCart } from '../../store/Actions'

const Product = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [product, setProduct] = useState(props.product)
  const [tab, setTab] = useState(0)

  const { state, dispatch } = useContext(DataContext)
  const { cart } = state

  const isActive = (index: number) => {
    if (tab === index) {
      return "active"
    }
    return ""
  }

  return (
    <div className='row detail-page'>
      <Meta title={product.title} />

      <div className="content">
        <div className='images'>
          <img
            src={product.images[tab].url}
            alt={product.images[tab].url}
            className="d-block img-thumbnail rounded mt-4 w-100"
            style={{
              height: "350px"
            }} />

          <div className="row mx-0"
            style={{ cursor: 'pointer' }}>
            {
              product.images.map((img: { url: string }, index: React.Key | null | undefined) => (
                <img key={index} src={img.url} alt={img.url}
                  className={`img-thumbnail rounded ${isActive(Number(index))}`}
                  style={{
                    height: '80px',
                    width: '20%'
                  }}
                  onClick={() => setTab(Number(index))} />
              ))
            }
          </div>
        </div>

        <div className="description mt-3">
          <h2 className='text-uppercase'>
            {product.title}
          </h2>
          <h5 className='text-danger'>
            ${product.price}
          </h5>

          <div className="row d-flex justify-content-between">
            {
              product.inStock > 0
                ? <h6 className='text-danger'>In Stock: {product.inStock}</h6>
                : <h6 className="text-danger">Out Stock</h6>
            }
          </div>

          <div className="my-2">
            {product.description}
          </div>

          <div className="my-2">
            {product.content}
          </div>

          <button
            type='button'
            className='btn btn-dark d-block my-3'
            onClick={() => dispatch(product, cart)}
          >Buy</button>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps({ params }: GetServerSidePropsContext) {
  const id = params?.id
  const res = await getData(`product/${id}`)
  // console.log(res)

  return {
    props: {
      product: res.product
    }
  }

}

export default Product