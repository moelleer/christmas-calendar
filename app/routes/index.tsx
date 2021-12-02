import { Action } from "history";
import {
  ActionFunction,
  Form,
  json,
  Link,
  LoaderFunction,
  MetaFunction,
  redirect,
  useActionData,
  useLoaderData,
} from "remix";
import invariant from "tiny-invariant";
import { db } from "~/utils/db.server";

type LotteryData = {
  lottery: Array<{ name: string; date: string }>;
};

type ActionData = {
  winner: string;
  formError?: string;
};

export let loader: LoaderFunction = async (): Promise<Response | Action> => {
  let data = await db.lottery.findMany();

  return json({ lottery: data });
};

export let action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();
  let date = formData.get("date");

  invariant(typeof date === "string");

  let winnerExists = await db.lottery.findFirst({
    where: { date: new Date(date) },
  });

  if (winnerExists) {
    return {
      formError: "2 vinnare på samma dag, hur skulle det se ut? 🥴😵‍💫",
    };
  }

  let teamMembers = [
    "Andreas",
    "Jaglyser",
    "Johan",
    "Joi",
    "Magnus",
    "Marre",
    "Nina",
    "Tessan",
    "Valle",
    "Widén",
  ];

  let winner = teamMembers[Math.floor(Math.random() * teamMembers.length)];

  await db.lottery.create({
    data: {
      name: winner,
      date: new Date(date),
    },
  });

  return redirect(`/winners/${date}`);
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "Team 1 Julkalender",
    description: "Tjoho vad kul, hoppas du vinner något roligt!",
  };
};

export function ErrorBoundary({ error }: { error: { message: string } }) {
  return (
    <div className="remix__page">
      <main>
        <h1>{error.message}</h1>
        <Link to="/">Försök igen!</Link>
      </main>
    </div>
  );
}

// https://remix.run/guides/routing#index-routes
export default function Index() {
  let data = useLoaderData<LotteryData>();
  let actionData = useActionData<ActionData>();

  return (
    <div className="remix__page">
      <main>
        <h1>Välkommen till Team 1's julkalender!</h1>

        <h3>Dra dagens vinnare:</h3>
        <Form method="post">
          <p>
            <label htmlFor="date">
              Välj datum:{" "}
              <input
                type="date"
                name="date"
                min="2021-12-01"
                max={new Date().toISOString().slice(0, 10)}
                defaultValue={new Date().toISOString().slice(0, 10)}
              />
            </label>
          </p>

          <button type="submit" className="button">
            Ta reda på vem som vinner
          </button>

          {actionData?.formError ? <p>{actionData.formError}</p> : null}
        </Form>
      </main>

      <aside>
        <h3>Tidigare dragningar:</h3>
        <ul>
          {data.lottery.map((lottery) => {
            let formattedDate = Intl.DateTimeFormat("sv-SE").format(
              new Date(lottery.date)
            );
            return (
              <li key={lottery.date}>
                <strong>{formattedDate}: </strong>
                <Link to={`/winners/${formattedDate}`}>{lottery.name}</Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
}
