const { faker } = require("@faker-js/faker");
const { Record } = require("./db");

function createRandomUser(dbName, length) {
  const records = [];

  for (let i = 0; i < length; i++) {
    records.push({
      name: faker.internet.userName(),
      email: faker.internet.email(),
      phone: faker.string.octal({ length: 8, prefix: "97" }),
      dbName,
    });
  }

  return records;
}

async function pushRecordsToDB() {
  const records = await Record.findOne({});
  if (records) {
    console.log("Db already seeded");
    return;
  }

  console.log("Seeding db");

  for (let i = 1; i <= 3; i++) {
    let records = createRandomUser(i.toString(), 50);
    await Record.insertMany(records);
  }

  console.log("Seeding complete");
  return;
}


pushRecordsToDB();