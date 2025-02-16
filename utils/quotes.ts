export const rainQuotes = [
  {
    text: "Some people feel the rain. Others just get wet.",
    author: "Bob Marley"
  },
  {
    text: "The way I see it, if you want the rainbow, you gotta put up with the rain.",
    author: "Dolly Parton"
  },
  {
    text: "Rain is grace; rain is the sky descending to the earth; without rain, there would be no life.",
    author: "John Updike"
  },
  {
    text: "A rainy day is the perfect time for a walk in the woods.",
    author: "Rachel Carson"
  },
  {
    text: "Do not be angry with the rain; it simply does not know how to fall upwards.",
    author: "Vladimir Nabokov"
  },
  {
    text: "I like people who smile when it's raining.",
    author: "Unknown"
  },
  {
    text: "The rain began again. It fell heavily, easily, with no meaning or intention but the fulfillment of its own nature.",
    author: "Helen Garner"
  },
  {
    text: "Rain showers my spirit and waters my soul.",
    author: "Emily Logan Decens"
  },
  {
    text: "Life isn't about waiting for the storm to pass… It's about learning to dance in the rain.",
    author: "Vivian Greene"
  },
  {
    text: "Let the rain kiss you. Let the rain beat upon your head with silver liquid drops. Let the rain sing you a lullaby.",
    author: "Langston Hughes"
  },
  {
    text: "The nicest thing about the rain is that it always stops. Eventually.",
    author: "Eeyore (A.A. Milne)"
  },
  {
    text: "I always like walking in the rain, so no one can see me crying.",
    author: "Charlie Chaplin"
  },
  {
    text: "It will never rain roses: when we want to have more roses, we must plant more trees.",
    author: "George Eliot"
  },
  {
    text: "If you pray for rain, be prepared to deal with some mud.",
    author: "Unknown"
  },
  {
    text: "Rainy days should be spent at home with a cup of tea and a good book.",
    author: "Bill Watterson"
  },
  {
    text: "The best thing one can do when it's raining is to let it rain.",
    author: "Henry Wadsworth Longfellow"
  },
  {
    text: "Thunderstorms are as much our friends as the sunshine.",
    author: "Criss Jami"
  },
  {
    text: "A single gentle rain makes the grass many shades greener.",
    author: "Henry David Thoreau"
  },
  {
    text: "No person has the right to rain on your dreams.",
    author: "Marian Wright Edelman"
  },
  {
    text: "Anyone who says sunshine brings happiness has never danced in the rain.",
    author: "Unknown"
  }
];

export const getRandomQuote = () => {
  return rainQuotes[Math.floor(Math.random() * rainQuotes.length)];
}; 