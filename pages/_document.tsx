import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en-US">
        <Head>
          <title>Gitkémon</title>
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,user-scalable=no"
          />
          <meta charSet="utf-8" />
          <meta property="og:url" content="https://gitkemon.com" />
          <meta property="og:type" content="website" />
          <meta
            property="og:description"
            content="Get Pokémons as payback for Github contributions"
          />
          <meta
            property="og:image"
            content="https://firebasestorage.googleapis.com/v0/b/hand-pokemon-2.appspot.com/o/monImages%2F%E1%84%91%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%85%E1%85%B5.png?alt=media&amp;token=e719c144-0e45-4307-ab02-7fa64ff9edf9"
          />
          <meta
            property="og:image:url"
            content="https://firebasestorage.googleapis.com/v0/b/hand-pokemon-2.appspot.com/o/monImages%2F%E1%84%91%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%85%E1%85%B5.png?alt=media&amp;token=e719c144-0e45-4307-ab02-7fa64ff9edf9"
          />
          <meta
            property="og:image:secure_url"
            content="https://firebasestorage.googleapis.com/v0/b/hand-pokemon-2.appspot.com/o/monImages%2F%E1%84%91%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%85%E1%85%B5.png?alt=media&amp;token=e719c144-0e45-4307-ab02-7fa64ff9edf9"
          />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="250" />
          <meta property="og:image:height" content="250" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
