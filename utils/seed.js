const connection = require("../config/connection");
const { Thoughts, User } = require("../models");

const {
  getRandomUserName,
  getRandomThoughts,
  getRandomEmail,
} = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  // Delete the collections if they exist
  let thoughtCheck = await connection.db
    .listCollections({ name: "thoughts" })
    .toArray();
  console.log(thoughtCheck);
  if (thoughtCheck.length) {
    await connection.dropCollection("thoughts");
  }

  let usersCheck = await connection.db
    .listCollections({ name: "users" })
    .toArray();
  console.log(usersCheck);
  if (usersCheck.length) {
    await connection.dropCollection("users");
  }
  // Create empty array to hold the users
  const users = [];
  const thoughts = [];

  // Loop 20 times -- add users to the users array
  for (let i = 0; i < 20; i++) {
    console.log("foo");
    // Get some random assignment objects using a helper function that we imported from ./data

    const userName = getRandomUserName();
    const email = getRandomEmail();
    const thoughtContent = getRandomThoughts(1)[0].thoughtDescription;
    // console.log(thoughtDescription);
    console.log(
      `Creating thought with content: ${thoughtContent} and username: ${userName}`
    );
    const thought = await Thoughts.create({
      thoughtContent: thoughtContent,
      username: userName,
    });
    console.log(thoughts, email, userName);

    thoughts.push(thought);

    const user = await User.create({
      username: userName,
      email,
      thoughts: [thought._id],
    });
    users.push(user);
  }

  // // Add users to the collection and await the results
  const userData = await User.insertMany(users);

  // Add thoughts to the collection and await the results
  await Thoughts.insertMany({
    thoughtDescription: thoughts.map(({ thoughtText }) => thoughtText),
    users: [...userData.map(({ _id }) => _id)],
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
