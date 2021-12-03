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
          <h1>Välkommen till Team 1's Julkalender!</h1>
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
    <svg xmlns="http://www.w3.org/2000/svg" width={80} height={70}>
      <defs>
        <clipPath id="a">
          <path d="M17 0h46v69.918H17Zm0 0" />
        </clipPath>
        <clipPath id="b">
          <path d="M0 0h80v69.918H0Zm0 0" />
        </clipPath>
      </defs>
      <path
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "#f09b77",
          fillOpacity: 1,
        }}
        d="M39.848 62.227c15.511 0 28.086-12.579 28.086-28.09 0-15.512-12.575-28.086-28.086-28.086-15.512 0-28.086 12.574-28.086 28.086 0 15.511 12.574 28.09 28.086 28.09Zm0 0"
      />
      <g clipPath="url(#a)">
        <path
          style={{
            stroke: "none",
            fillRule: "nonzero",
            fill: "#fce6d2",
            fillOpacity: 1,
          }}
          d="m17.488 50.113 3.27 11.387 11.734 7.688-1.719-10.793m7.485-41.606c-2.703.25-5.95-.754-9.403-2.902l-1.32-.825L35.223.73l.957.594c5.96 3.516 10.61 3.25 15.746-.578L62.57 7.383 30.773 58.39l-13.285-8.278Zm0 0"
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
          d="m18.715 51.742 11.387 7.094 1.41 8.836-10.13-6.637Zm-1.938-1.46a.535.535 0 0 0 .028.093l3.25 11.324c.05.168.156.313.304.406l11.7 7.668a.749.749 0 0 0 .433.145v.004a.734.734 0 0 0 .653-.395l11.011-18.535c1.407.52 2.828 1 4.262 1.39 4.312 1.177 8.227 1.763 11.812 1.763 2.446.015 4.88-.29 7.247-.903a.123.123 0 0 0 .085-.094l3.977-21.554-1.527 18.453a.117.117 0 0 0 .039.098c.023.02.05.03.082.035l.027-.004 5.04-.938a.125.125 0 0 0 .1-.113l.895-12.754L80 24.555a.119.119 0 0 0-.05-.137.123.123 0 0 0-.145.004c-1.844 1.523-10.575 3.285-10.809 3.332h-.004a.122.122 0 0 0-.082.07c-.02.031-.015.074 0 .106a.1.1 0 0 0 .055.05l2.527 1.239c-4.246 1.066-8.996 1.082-14.418.043l7.371-12.403a.73.73 0 0 0 .094-.468l-1.238-9.02a.725.725 0 0 0-.344-.61L52.312.126a.731.731 0 0 0-.82.035C46.52 3.863 42.195 4.02 36.555.7l-.946-.59a.733.733 0 0 0-1.008.234L26.993 12.55a.727.727 0 0 0-.164.683l1.781 7.25a44.638 44.638 0 0 0-4.02-.425c-3.546-.211-8.151-.243-12.327 1.386a.123.123 0 0 0-.075.09L8.293 42.617l1.809-19.047a.116.116 0 0 0-.047-.11.123.123 0 0 0-.121-.015l-5.266 2.239a.12.12 0 0 0-.074.105l-.672 11.246L.008 49.082a.111.111 0 0 0 .015.11c.024.03.059.05.098.05h.027l10.649-2.453a.12.12 0 0 0 .094-.11.124.124 0 0 0-.075-.12l-2.597-1.13c4.058-1.503 8.508-1.468 11.953-1.261l.156.008-3.46 5.554a.736.736 0 0 0-.09.551ZM30.18 20.745c1.32.246 2.633.543 3.933.887l-.715-4.77c-1.511-.492-3.101-1.242-4.726-2.238Zm6.254 27.184c-5.176-1.97-9.934-3.16-14.47-3.617l-3.472 5.562 12.047 7.508ZM61.566 7.61 49.38 27.163c-1.688-.605-3.356-1.285-4.992-1.95l-.02-.007-.015-.008c-.817-.332-1.657-.672-2.489-1.004a72.612 72.612 0 0 0-6.05-2.09l3.074-4.933a.733.733 0 0 0-.688-1.113c-2.539.234-5.633-.727-8.945-2.797l-.703-.438L35.465 1.73l.336.211.015.008c2.914 1.719 5.559 2.582 8.118 2.582 2.699 0 5.308-.968 8.027-2.906Zm0 0"
        />
      </g>
      <path
        style={{
          stroke: "none",
          fillRule: "evenodd",
          fill: "#fce6d2",
          fillOpacity: 1,
        }}
        d="m15.031 29.258 3.301.12-.324 9.005 2.527.094.332-9.004 3.301.12.105-2.82-9.14-.335Zm19.965-.363-7.91-1.727-2.527 11.559 7.91 1.722.562-2.59-5.402-1.18.426-1.964 5.203 1.133.535-2.442-5.203-1.133.43-1.968 5.41 1.18Zm2.797 3.433c.422-1.23 1.594-1.976 2.602-1.633l5.003 1.703c1.008.34 1.489 1.63 1.07 2.864l-3.038 8.96-2.414-.82 1.043-3.074-3.864-1.312-1.043 3.074-2.394-.813Zm5.148 5.406.98-2.894-3.862-1.313-.98 2.895Zm7.582-3.297c-1.054-.144-2.066.79-2.242 2.079l-1.304 9.375 2.507.347 1.239-8.922 3.359.465-1.242 8.926 2.496.344 1.238-8.922 3.356.465-1.239 8.926 2.508.347 1.301-9.375c.18-1.289-.535-2.465-1.59-2.613l-3.824-.527a1.804 1.804 0 0 0-1.461.445 1.794 1.794 0 0 0-1.281-.828Zm0 0"
      />
    </svg>
  );
}
