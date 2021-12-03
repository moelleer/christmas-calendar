import { User, Winner } from ".prisma/client";
import {
  ActionFunction,
  Form,
  json,
  LinksFunction,
  LoaderFunction,
  redirect,
  useActionData,
  useLoaderData,
  useSubmit,
} from "remix";
import invariant from "tiny-invariant";
import winnersStylesUrl from "~/styles/winners.css";
import { db } from "~/utils/db.server";

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: winnersStylesUrl }];
};

export let loader: LoaderFunction = async () => {
  let winners = await db.winner.findMany({ include: { user: true } });

  return json(winners);
};

export let action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();
  let date = formData.get("date");

  invariant(typeof date === "string");

  let count = await db.user.count();
  let randomRowNumber = Math.floor(Math.random() * count);
  let [randomUser] = await db.user.findMany({
    take: 1,
    skip: randomRowNumber,
  });

  await db.winner.create({
    data: { date: new Date(date), userId: randomUser.id },
  });

  return redirect("/");
};

export default function Winners() {
  const submit = useSubmit();
  let actionMessage = useActionData<string>();
  let winners = useLoaderData<Array<Winner & { user: User }>>();

  let dates = [...Array(24)].map((_, i) => i + 1);
  let today = new Date().getDate();

  return (
    <Form method="post" onChange={(event) => submit(event?.currentTarget)}>
      <div className="winners">
        {dates.map((date, index) => {
          let dateObj = new Date();
          dateObj.setDate(date);

          let winner = winners.find((winner) => {
            let winnerDate = new Date(winner.date);

            return winnerDate.getDate() === dateObj.getDate();
          });

          if (!winner && today >= date) {
            return <UnlockDate key={index} date={date} />;
          }
          if (!winner) {
            return <LockedDate key={index} date={date} />;
          }

          return (
            <div key={index} className="winner-user">
              <div className="winner-avatar">
                <span className="winner-date">{date}</span>
                <img src={winner.user.avatar} width={128} height={128} />
              </div>
            </div>
          );
        })}
      </div>
    </Form>
  );
}

function LockedDate({ date }: { date: Number }) {
  return (
    <div className="winner-locked">
      <span className="winner-locked-date">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={32}
          height={32}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      </span>
    </div>
  );
}

function UnlockDate({ date }: { date: Number }) {
  return (
    <label htmlFor={`date-${date}`} className="winner-locked unlock">
      <input
        type="radio"
        id={`date-${date}`}
        name="date"
        value={`2021-01-${date < 10 ? `0${date}` : date}`}
      />
      <span className="winner-locked-date">{date}</span>
    </label>
  );
}
