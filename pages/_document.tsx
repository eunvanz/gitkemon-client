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
            content="https://storage.googleapis.com/gitkemon.appspot.com/mon-images/mon_4_밥밥이_1628354906313.png"
          />
          <meta
            property="og:image:url"
            content="https://storage.googleapis.com/gitkemon.appspot.com/mon-images/mon_4_밥밥이_1628354906313.png"
          />
          <meta
            property="og:image:secure_url"
            content="https://storage.googleapis.com/gitkemon.appspot.com/mon-images/mon_4_밥밥이_1628354906313.png"
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
