import Head from 'next/head';
import '../styles/game.css';
import '../styles/globals.css';
import { Web3Provider } from '../web3/Web3provider';

const MyApp = ({ Component, pageProps }) => (
  <Web3Provider>
    <Head>
      <title>Metaversus</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://stijndv.com" />
      <link rel="stylesheet" href="https://stijndv.com/fonts/Eudoxus-Sans.css" />
    </Head>
    <Component {...pageProps} />
  </Web3Provider>
);

export default MyApp;
