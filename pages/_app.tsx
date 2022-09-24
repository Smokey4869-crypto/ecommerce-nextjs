import '../styles/global.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { DataProvider } from '../store/globalState'
import 'bootstrap/dist/css/bootstrap.css'
import { PayPalScriptProvider } from "@paypal/react-paypal-js"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DataProvider>
      <PayPalScriptProvider 
        options={{
          "client-id": process.env.PAYPAL_CLIENT_ID || ""
        }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PayPalScriptProvider>
    </DataProvider>

  )
}

export default MyApp
