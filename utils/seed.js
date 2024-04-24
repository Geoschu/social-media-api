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
    const userName = getRandomUserName();
    const email = getRandomEmail();
    const thoughtContent = getRandomThoughts(1)[0].thoughtDescription;
    console.log(
      `Creating thought with content: ${thoughtContent} and username: ${userName}`
    );
    const thought = new Thoughts({
      thoughtContent: thoughtContent,
      username: userName,
    });
    thoughts.push(thought);

    const user = new User({
      username: userName,
      email: email,
      thoughts: [thought._id],
    });
    users.push(user);
  }

  // Add users to the collection and await the results
  // Add thoughts to the collection and await the results
  try {
    await User.insertMany(users);
    await Thoughts.insertMany(thoughts);
    console.log("Seeding complete! 🌱");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
});
