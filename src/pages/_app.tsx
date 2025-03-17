import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { AuthProvider } from '@context/AuthContext';
import { UIProvider } from '@context/UIContext';
import SolanaWalletProvider from '@context/WalletProvider';
import Layout from '@components/layout/Layout';
import { ToastContainer } from 'react-toastify';
import '@styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Lumen Tales | Interactive Stories Powered by AI & Blockchain</title>
        <meta name="description" content="A tokenized interactive narrative platform where stories become digital assets." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet" />
      </Head>
      
      <AuthProvider>
        <UIProvider>
          <SolanaWalletProvider>
            <Layout>
              <Component {...pageProps} />
              <ToastContainer position="bottom-right" autoClose={5000} />
            </Layout>
          </SolanaWalletProvider>
        </UIProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp; 