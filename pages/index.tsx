import type { InferGetServerSidePropsType } from 'next'
import { getData } from '../utils/fetchData'
import { useState } from 'react'
import Meta from '../components/Meta'
import ProductList from '../components/ProductList'

const Home = (props : InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [ products, setProducts ] = useState(props.products)
  // console.log(products)
  // console.log("hello", Buffer.from("478646783979473:R6U7eoR6sn3PuSYuhrJf75RaiXQ").toString('base64'))

  return (
    <div>
      <Meta title="Home" />
      {
        products.length === 0 ?
        <h2>No products</h2> 
        : <ProductList products={products}/>
      }
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  const res = await getData('product')
  return {
    props: {
      products: res.products,
      result: res.result
    }
  }
}