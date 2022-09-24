import React from 'react'
import Head from 'next/head'
import Script from 'next/script'

const Meta = ({ title, keywords, description }: { title: string, keywords: string, description: string }) => {
  return (
    <Head>
      <meta name='viewport'
        content='width=devices-width, initial-scale=1' />
      <meta name='keywords' content={keywords} />
      <meta name='description' content={description} />
      <meta charSet='utf-8' />
      <link rel='icon' href='/favicon.ico' />
      <Script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></Script>
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js"></Script>
      <Script src={`https://www.paypal.com/sdk/js?client-id=${process.env.PAYPAL_CLIENT_ID}`} data-namespace="paypal_sdk"></Script>
      <title>{title}</title>
    </Head>
  )

}

Meta.defaultProps = {
  title: "WebDev",
  keywords: "web development, programming",
  description: "Get the latest news in the world"
}

export default Meta