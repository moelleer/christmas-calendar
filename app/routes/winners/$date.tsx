import type { Lottery } from "@prisma/client";
import {
  ActionFunction,
  Link,
  MetaFunction,
  useLoaderData,
  useParams,
} from "remix";
import { db } from "~/utils/db.server";

type LoaderData = {
  winner: Lottery;
};

export let loader: ActionFunction = async ({ params }) => {
  let winner = await db.lottery.findFirst({
    where: {
      date: new Date(params.date || ""),
    },
  });

  if (!winner)
    throw new Error("Det finns ingen vinnare för den här dagen, än... 😏");

  return { winner };
};

export let meta: MetaFunction = () => {
  let params = useParams();
  return {
    title: `Grattis ${params.date} `,
    description: "Grattis till vinsten!",
  };
};

export function ErrorBoundary({ error }: { error: { message: string } }) {
  return (
    <div className="remix__page">
      <h1>{error.message}</h1>
    </div>
  );
}

export default function LotteryWinner() {
  let params = useParams();
  let loaderData = useLoaderData<LoaderData>();

  return (
    <div className="remix__page">
      <main>
        <h1>
          💁‍♀️🎉 <br />
          Vinnare {params.date}: {loaderData.winner.name}! <br />
          💁‍♀️🎉
        </h1>

        <Link to="/">Tillbaka till översikten</Link>
      </main>
    </div>
  );
}
