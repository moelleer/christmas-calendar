import { User, Winner } from ".prisma/client";
import {
  json,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
} from "remix";
import userStylesUrl from "~/styles/user.css";
import { db } from "~/utils/db.server";

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: userStylesUrl }];
};

export let meta: MetaFunction = () => {
  return {
    title: "Team 1's medlemmar!",
    description: "Här kan du se alla som är med i Team 1",
  };
};

export let loader: LoaderFunction = async () => {
  let users = await db.user.findMany({
    orderBy: { Winner: { _count: "desc" } },
    include: { Winner: true },
  });

  return json(users);
};

export default function Users() {
  let users = useLoaderData<Array<User & { Winner: Array<Winner> }>>();

  return (
    <div>
      {users.map((user) => {
        return (
          <div className="user">
            <img src={user.avatar} width={48} height={48} />
            <p>
              <strong>{user.name}:</strong> {user.Winner.length}
            </p>
          </div>
        );
      })}
    </div>
  );
}
