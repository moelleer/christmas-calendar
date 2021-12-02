import type { LinksFunction } from "remix";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "remix";
import darkStylesUrl from "~/styles/dark.css";
import globalStylesUrl from "~/styles/global.css";

// https://remix.run/api/app#links
export let links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: globalStylesUrl },
    {
      rel: "stylesheet",
      href: darkStylesUrl,
      media: "(prefers-color-scheme: dark)",
    },
  ];
};

// https://remix.run/api/conventions#default-export
// https://remix.run/api/conventions#route-filenames
export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <Document title="Error!">
      <Layout>
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
          <hr />
          <p>
            Hey, developer, you should replace this with what you want your
            users to see.
          </p>
        </div>
      </Layout>
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export function CatchBoundary() {
  let caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      );
      break;
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      );
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </Layout>
    </Document>
  );
}

function Document({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="remix-app">
      <header className="remix-app__header">
        <div className="container remix-app__header-content">
          <Link to="/" title="Remix" className="remix-app__header-home-link">
            <Team1Logo />
          </Link>
          <strong>Team 1 Julkalender</strong>
        </div>
      </header>
      <div className="remix-app__main">
        <div className="container remix-app__main-content">{children}</div>
      </div>
    </div>
  );
}

function Team1Logo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="35">
      <defs>
        <clipPath id="a">
          <path d="M8 0h24v34.957H8Zm0 0" />
        </clipPath>
        <clipPath id="b">
          <path d="M0 0h40v34.957H0Zm0 0" />
        </clipPath>
      </defs>
      <path
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "#f09b77",
          fillOpacity: 1,
        }}
        d="M19.922 31.113c7.758 0 14.047-6.289 14.047-14.043 0-7.758-6.29-14.043-14.047-14.043-7.754 0-14.043 6.285-14.043 14.043 0 7.754 6.289 14.043 14.043 14.043Zm0 0"
      />
      <g clipPath="url(#a)">
        <path
          style={{
            stroke: "none",
            fillRule: "nonzero",
            fill: "#fce6d2",
            fillOpacity: 1,
          }}
          d="m8.742 25.055 1.637 5.695 5.867 3.844-.86-5.399m3.743-20.8c-1.352.125-2.977-.38-4.7-1.454l-.66-.41L17.614.363l.477.301c2.98 1.754 5.305 1.625 7.875-.293l5.32 3.32-15.898 25.504-6.645-4.14Zm0 0"
        />
      </g>
      <g clipPath="url(#b)">
        <path
          style={{
            stroke: "none",
            fillRule: "evenodd",
            fill: "#166984",
            fillOpacity: 1,
          }}
          d="m9.355 25.871 5.696 3.547.703 4.418-5.063-3.316Zm-.968-.73c.004.015.011.03.015.047l1.625 5.66a.368.368 0 0 0 .153.207l5.847 3.832a.38.38 0 0 0 .176.07h.043v.004a.366.366 0 0 0 .324-.2l5.508-9.265c.703.262 1.414.5 2.133.695 2.152.586 4.11.88 5.906.88 1.219.007 2.438-.141 3.621-.45.024-.008.04-.023.043-.047l1.989-10.777-.762 9.226c-.004.02.004.036.02.051.011.008.023.016.038.016l.012-.004 2.524-.469a.055.055 0 0 0 .046-.055l.45-6.378L40 12.277a.067.067 0 0 0-.023-.07.064.064 0 0 0-.075.004c-.922.762-5.289 1.64-5.402 1.668h-.004a.06.06 0 0 0-.043.031c-.008.02-.008.04.004.055.004.012.012.02.023.027l1.266.617c-2.121.536-4.496.543-7.21.02l3.687-6.2a.351.351 0 0 0 .047-.234l-.622-4.511a.366.366 0 0 0-.171-.305L26.157.062a.366.366 0 0 0-.41.02c-2.485 1.848-4.65 1.93-7.47.27l-.472-.297a.38.38 0 0 0-.278-.047.373.373 0 0 0-.226.164l-3.805 6.101a.38.38 0 0 0-.082.344l.89 3.625a21.585 21.585 0 0 0-2.007-.21c-1.774-.106-4.078-.126-6.168.69-.02.008-.031.024-.035.048L4.148 21.309l.903-9.524a.056.056 0 0 0-.024-.055.072.072 0 0 0-.062-.007L2.332 12.84c-.02.012-.035.031-.035.055L1.96 18.52.004 24.54a.055.055 0 0 0 .008.054c.011.02.031.027.05.027h.012l5.324-1.226a.068.068 0 0 0 .047-.055c0-.024-.011-.05-.035-.059l-1.3-.566c2.03-.754 4.253-.735 5.976-.633l.078.008-1.73 2.777a.373.373 0 0 0-.047.274Zm6.703-14.766c.66.121 1.316.27 1.969.441l-.36-2.386a11.064 11.064 0 0 1-2.363-1.117Zm3.125 13.59c-2.586-.985-4.965-1.578-7.235-1.809l-1.734 2.782 6.024 3.753Zm12.57-20.16-6.094 9.777c-.847-.305-1.68-.64-2.496-.977l-.011-.003h-.008v-.004c-.406-.164-.828-.336-1.246-.5a36.309 36.309 0 0 0-3.024-1.047l1.535-2.465a.363.363 0 0 0-.34-.555c-1.269.117-2.82-.367-4.476-1.398l-.352-.223L17.73.867l.168.102.008.004c1.457.859 2.782 1.293 4.059 1.293 1.351 0 2.656-.485 4.015-1.454Zm0 0"
        />
      </g>
      <path
        style={{
          stroke: "none",
          fillRule: "evenodd",
          fill: "#fce6d2",
          fillOpacity: 1,
        }}
        d="m7.516 14.629 1.652.062-.164 4.5 1.266.047.164-4.504 1.652.063.05-1.41-4.57-.168Zm9.98-.184-3.953-.86-1.262 5.778 3.953.864.282-1.297-2.703-.59.214-.98 2.602.566.266-1.223-2.602-.566.215-.985 2.707.59Zm1.402 1.72c.207-.618.793-.99 1.297-.817l2.504.851c.504.172.746.817.535 1.43l-1.52 4.484-1.206-.414.523-1.535-1.933-.656-.52 1.535-1.2-.406Zm2.57 2.702.493-1.449-1.93-.652-.492 1.445Zm3.794-1.648c-.528-.074-1.032.394-1.121 1.039l-.653 4.687 1.254.176.621-4.46 1.68.23-.621 4.46 1.246.176.621-4.465 1.676.235-.617 4.46 1.254.177.648-4.688c.09-.644-.27-1.23-.797-1.305l-1.91-.265a.893.893 0 0 0-.73.222.891.891 0 0 0-.641-.414Zm0 0"
      />
    </svg>
  );
}
