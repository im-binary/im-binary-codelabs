import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>codelab::페이지네이션</title>
        <meta name='description' content='pongdang-pagination' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
