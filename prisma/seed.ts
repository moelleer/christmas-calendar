import { PrismaClient } from "@prisma/client";
let db = new PrismaClient();

async function seed() {
  await Promise.all(
    getLotteryWinners().map((lotteryWinner) => {
      return db.lottery.create({ data: lotteryWinner });
    })
  );
}

seed();

function getLotteryWinners() {
  // shout-out to https://icanhazdadjoke.com/

  return [
    {
      name: "Johan",
      date: new Date("2021-12-01"),
    },
  ];
}
