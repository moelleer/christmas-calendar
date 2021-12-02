import { json, LoaderFunction } from "remix";
import { db } from "~/utils/db.server";

export let loader: LoaderFunction = async () => {
  let data = await db.lottery.findMany();

  return json({ lottery: data });
};

export default function Winners() {
  return <div>Alla vinnare</div>;
}
