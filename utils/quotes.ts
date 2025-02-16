interface Quote {
  text: string;
  author: string;
}

export const rainQuotes: Quote[] = [
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

export const sunQuotes: Quote[] = [
  {
    text: "Keep your face always toward the sunshine—and shadows will fall behind you.",
    author: "Walt Whitman"
  },
  {
    text: "A day without sunshine is like, you know, night.",
    author: "Steve Martin"
  },
  {
    text: "To love and be loved is to feel the sun from both sides.",
    author: "David Viscott"
  },
  {
    text: "Live in the sunshine, swim in the sea, drink the wild air.",
    author: "Ralph Waldo Emerson"
  },
  {
    text: "Some people are so much sunshine to the square inch.",
    author: "Walt Whitman"
  },
  {
    text: "If you spend your whole life waiting for the storm, you'll never enjoy the sunshine.",
    author: "Morris West"
  },
  {
    text: "Sunshine is delicious, rain is refreshing, wind braces us up, snow is exhilarating; there is really no such thing as bad weather, only different kinds of good weather.",
    author: "John Ruskin"
  },
  {
    text: "Even on a cloudy day, the sun is still shining somewhere.",
    author: "Unknown"
  },
  {
    text: "He that will enjoy the brightness of sunshine, must quit the coolness of the shade.",
    author: "Samuel Johnson"
  },
  {
    text: "A sunny disposition is worth more than a fortune.",
    author: "Andrew Carnegie"
  },
  {
    text: "Sunshine is a welcome thing. It brings a lot of brightness.",
    author: "Jimmie Davis"
  },
  {
    text: "If you want to shine like the sun, first burn like the sun.",
    author: "A.P.J. Abdul Kalam"
  },
  {
    text: "There is no such thing as too much sunshine, but plenty of people miss it by staying in the shade.",
    author: "Unknown"
  },
  {
    text: "Laughter is the sun that drives winter from the human face.",
    author: "Victor Hugo"
  },
  {
    text: "When the sun is shining, I can do anything; no mountain is too high, no trouble too difficult to overcome.",
    author: "Wilma Rudolph"
  },
  {
    text: "Rise above the storm and you will find the sunshine.",
    author: "Mario Fernández"
  },
  {
    text: "Sunlight is painting.",
    author: "Nathaniel Hawthorne"
  },
  {
    text: "Bring sunshine into the place you enter.",
    author: "Latin Proverb"
  },
  {
    text: "Look at the sunny side of everything.",
    author: "Christian D. Larson"
  },
  {
    text: "Nothing can dim the light that shines from within.",
    author: "Maya Angelou"
  }
];

export const getRandomQuote = (isRaining: boolean) => {
  const quotes = isRaining ? rainQuotes : sunQuotes;
  return quotes[Math.floor(Math.random() * quotes.length)];
}; 