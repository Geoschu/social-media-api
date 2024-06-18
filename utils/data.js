const userNames = [
  "Goku",
  "Hachiro",
  "Hayate",
  "Inuyasha",
  "Jiro",
  "Kazuo",
  "Kuro",
  "Moe",
  "Noburo",
  "Renji",
  "Sasuke",
  "Sosuke",
  "Uzumaki",
  "Minato",
  "Naruto",
  "Natsu",
  "Raiden",
  "Ryo",
  "Ryuu",
  "Shikamaru",
  "Sora",
  "Yagami",
  "Yahiko",
  "Yuri",
  "Alex",
  "Alphonse",
  "Ash",
  "Astro",
  "Boruto",
  "Brock",
  "Cygnus",
  "Dante",
  "Duke",
  "Edward",
  "Eren",
  "Finnian",
  "Isaac",
  "Akira",
  "Dai",
  "Daiki",
  "Daisuke",
  "Gohan",
  "Hideaki",
  "Hiroshi",
  "Isamu",
  "Isao",
  "Izuku",
  "Kenta",
  "Kisuke",
  "Ken",
  "Levi",
  "Meliodas",
  "Moon",
  "Roy",
  "Shin",
  "Spike",
  "Vegeta",
  "Zoro",
];

const thoughtDescriptions = [
  "Just finished binge-watching my favorite anime series! What should I watch next?",
  "Can't get over the epic fight scene in the latest episode of #anime! 😱🔥",
  "When you realize you've been watching anime for hours and it's already 3 AM... 😅",
  "Feeling attacked by all these anime feels... 😭💔",
  "Throwback to my first anime convention! Best weekend ever! 🌟🎉 #throwback",
  "Just bought the limited edition Blu-ray box set of Cowboy Bebop! 😍📀",
  "What's your favorite anime genre: Shonen, Shojo, Seinen, or Josei? 🤔🎬",
  "Anime and chill kind of night... 😌🍿",
  "Trying to explain anime plot twists like... 🤯🌀",
  "In need of anime recommendations! Hit me with your best suggestions! 🙏🎌",
  "That moment when you find someone who loves your favorite anime as much as you do... 🤩🎌",
  "My anime watchlist is getting longer by the day... 📝🎬",
  "Anime merch haul! My collection is growing! 🛍️😍",
  "When the opening theme of your favorite anime starts playing... 🎵🌸",
  "Cosplaying [Character Name] this weekend! Can't wait to show you all! 👀👗",
  "That feeling when you finish an anime and don't know what to do with your life... 😭🔚",
  "Who's your anime waifu/husbando? Mine is definitely Revvy! 💖🌟",
  "Watching anime is not a hobby, it's a lifestyle! 💪🌟",
  "When your non-anime friends ask why you love it so much... 🤷‍♀️💖",
  "Anime marathon in progress! No interruptions, please! 📺🍕",
  "Can't decide which anime OST is my favorite... They're all so good! 🎶💫",
  "That feeling when you finish an anime series and don't know what to do with your life anymore... 😭🔚",
  "Just discovered a hidden gem anime that deserves more love! Sharing it with all of you! 💎🎬",
  "That moment when an anime character becomes your spirit animal... 🐱🌟",
  "Trying to explain anime to someone who's never watched it before... 🤷‍♂️🎌",
  "Can't stop listening to anime OPs and EDs... They're too catchy! 🎶🌟",
  "When you meet someone who hates your favorite anime... 😒🙄",
  "Just received my first anime figure! It's so detailed! 🎨👀",
  "When you finish an anime and immediately start searching for fan theories... 🤓🔍",
  "In the mood for some classic anime today... Any recommendations? 📺🌸",
  "Rewatching my favorite anime for the 10th time... Still not tired of it! 🔄🌟",
  "Just discovered the perfect anime meme... Sharing it with the world! 😂🌐",
  "When someone says anime is just for kids... 😤👊",
  "Just ordered the manga box set of Dragon Ball! Can't wait to dive into the story! 📚🌟",
  "That moment when an anime character's backstory hits you right in the feels... 😭💔",
  "Anime nights are the best nights! 🌙📺",
  "When your favorite anime gets a new season announcement... Pure happiness! 😍🎉",
  "Trying to choose which anime to watch next... The struggle is real! 🤔📺",
  "Anime and ramen kind of night... 🍜📺",
  "When an anime ending leaves you with more questions than answers... 🤔🔚",
  "That feeling when you discover a new anime OST that gives you chills... 🎵❄️",
  "Reorganizing my anime collection... It's a work in progress! 📦🌟",
  "Anime club meeting tonight! Ready for some spirited discussions! 🗣️🎌",
];

const thoughtReactions = [
  "😂",
  "😍",
  "❤️",
  "😊",
  "🙌",
  "🎉",
  "🤔",
  "🤣",
  "🥰",
  "🥺",
  "✨",
  "🙏",
  "😎",
  "🥳",
  "🥴",
  "😘",
  "🤩",
  "🤯",
  "🤗",
  "🌟",
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomUserName = () =>
  `${getRandomArrItem(userNames)} ${getRandomArrItem(userNames)}`;

// Function to generate random thoughts that we can add to user object.
const getRandomThoughts = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      thoughtDescription: getRandomArrItem(thoughtDescriptions),
      reactions: Math.floor(Math.random() * (999 - 70 + 1) + 70),
    });
  }
  return results;
};

// Function to generate a random email address
const getRandomEmail = () => {
  const emailDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com"];
  const domain = emailDomains[Math.floor(Math.random() * emailDomains.length)];
  return `${getRandomArrItem(userNames).toLowerCase()}${Math.floor(
    Math.random() * 100
  )}@${domain}`;
};

// Export the functions for use in seed.js
module.exports = { getRandomUserName, getRandomThoughts, getRandomEmail };

// Funcrtion to generate random reactions to a thought
const getRandomReaction = () => getRandomArrItem(thoughtReactions);