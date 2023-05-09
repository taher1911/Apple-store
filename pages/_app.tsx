import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/store/store";

import Head from "next/head";
import Layout from "@/components/Layout";
import { Toaster } from "react-hot-toast";

import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <Head>
        <title>Apple-Market</title>
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta
          name="description"
          content="This is apple market for iphones and mac devices created by Taher Abozeid"
        />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <link rel="shortcut icon" href="/apple.png" type="image/x-icon" />
      </Head>
      {/* session provider elemtnt for auth */}

      {/* provider elemtnt for redux  */}
      <SessionProvider session={session}>
        <Provider store={store}>
          <Layout>
            <Toaster />

            <Component {...pageProps} />
          </Layout>
        </Provider>
      </SessionProvider>
      {/* </SessionProvider> */}
    </>
  );
}
