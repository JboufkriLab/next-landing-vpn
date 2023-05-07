import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {


    return (
      <Html>
        <Head>
          <script dangerouslySetInnerHTML={{
            __html: `
              window.intercomSettings = {
                app_id: 't9scbaiq',
                hideDefaultLauncher: true,
              };
              
              (function() {
                var w = window;
                var ic = w.Intercom;
                if (typeof ic === 'function') {
                  ic('reattach_activator');
                  ic('update', w.intercomSettings);
                } else {
                  var d = document;
                  var i = function() {
                    i.c(arguments);
                  };
                  i.q = [];
                  i.c = function(args) {
                    i.q.push(args);
                  };
                  w.Intercom = i;
                  var l = function() {
                    var s = d.createElement('script');
                    s.type = 'text/javascript';
                    s.async = true;
                    s.src = 'https://widget.intercom.io/widget/t9scbaiq';
                    var x = d.getElementsByTagName('script')[0];
                    x.parentNode.insertBefore(s, x);
                  };
                  if (w.attachEvent) {
                    w.attachEvent('onload', l);
                  } else {
                    w.addEventListener('load', l, false);
                  }
                }
              })();
            `
          }}></script>
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
