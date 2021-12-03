import { PrismaClient } from "@prisma/client";
let db = new PrismaClient();

async function seed() {
  await Promise.all(
    getUsers().map(async (user) => {
      let dbUser = await db.user.create({
        data: { avatar: user.avatar, name: user.name },
      });

      user.winnerDates.map(async (date) => {
        return await db.winner.create({
          data: { userId: dbUser.id, date: new Date(date) },
        });
      });
    })
  );
}

seed();

function getUsers() {
  return [
    {
      name: "Johan",
      avatar: "https://ca.slack-edge.com/T02FUQ2JT-U4SQ3KHR7-4c6d81ecfb0b-128",
      winnerDates: ["2021-12-01"],
      // winnerDates: [],
    },
    {
      name: "Tessan",
      avatar: "https://ca.slack-edge.com/T02FUQ2JT-U03BQ221L-40778e44a000-128",
      winnerDates: ["2021-12-02"],
      // winnerDates: [],
    },
    {
      name: "Valle",
      avatar: "https://ca.slack-edge.com/T02FUQ2JT-U0JMWBG5R-4e99fc8abebe-128",
      winnerDates: ["2021-12-03"],
      // winnerDates: [],
    },
    {
      name: "Joi",
      avatar: "https://ca.slack-edge.com/T02FUQ2JT-U03S9E1GA-gdc06f2185b7-128",
      winnerDates: [],
    },
    {
      name: "Jaglyser",
      avatar:
        "https://ca.slack-edge.com/T02FUQ2JT-U02E43SK285-c9f80babc66c-128",
      winnerDates: [],
    },
    {
      name: "Marre",
      avatar: "https://ca.slack-edge.com/T02FUQ2JT-U2HU856KZ-ebb3adecf566-128",
      winnerDates: [],
    },
    {
      name: "Nina",
      avatar:
        "https://ca.slack-edge.com/T02FUQ2JT-U018J6Z9VNV-66bf3b5869f2-128",
      winnerDates: [],
    },
    {
      name: "Widén",
      avatar:
        "https://ca.slack-edge.com/T02FUQ2JT-U01JA30B9C3-2c54a229e023-128",
      winnerDates: [],
    },
    {
      name: "Magnus",
      avatar: "https://ca.slack-edge.com/T02FUQ2JT-U4KBC3PPW-beab35a2e510-128",
      winnerDates: [],
    },
    {
      name: "Andreas",
      avatar: "https://ca.slack-edge.com/T02FUQ2JT-UMESTEGKX-5dd77bf24fc4-128",
      winnerDates: [],
    },
  ];
}
