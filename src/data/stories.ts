import { Story } from '../types';

export const STORIES: Story[] = [
  {
    id: 'story-1',
    titleDe: 'Leo und die Katze',
    titleEn: 'Leo and the Cat',
    descriptionEn: 'A sweet story about Leo meeting a fluffy little kitten in the sunny meadow.',
    coverEmoji: '🐱',
    coverImage: '/src/assets/images/story_cat_apple_1792347917027.jpg',
    pages: [
      {
        textDe: 'Leo sieht eine kleine Katze im grünen Gras.',
        textEn: 'Leo sees a little cat in the green grass.',
        emoji: '🐱',
        highlightWords: [
          { word: 'sieht', meaning: 'sees' },
          { word: 'die Katze', meaning: 'the cat' },
          { word: 'das Gras', meaning: 'the grass' },
        ],
      },
      {
        textDe: 'Die Katze ist klein und getigert. Sie macht leise: Miau!',
        textEn: 'The cat is small and striped. She softly says: Meow!',
        emoji: '🐾',
        highlightWords: [
          { word: 'klein', meaning: 'small' },
          { word: 'leise', meaning: 'softly' },
        ],
      },
      {
        textDe: 'Leo winkt mit der Pfote und sagt freundlich: Hallo, Katze!',
        textEn: 'Leo waves with his paw and says friendly: Hello, cat!',
        emoji: '👋',
        highlightWords: [
          { word: 'winkt', meaning: 'waves' },
          { word: 'Hallo', meaning: 'hello' },
        ],
      },
      {
        textDe: 'Die Katze schnurrt glücklich. Jetzt sind sie beste Freunde!',
        textEn: 'The cat purrs happily. Now they are best friends!',
        emoji: '💖',
        highlightWords: [
          { word: 'Freunde', meaning: 'friends' },
          { word: 'glücklich', meaning: 'happy' },
        ],
        question: {
          questionDe: 'Was sagt Leo zur kleinen Katze?',
          questionEn: 'What does Leo say to the little cat?',
          options: [
            { text: 'Hallo, Katze! 👋', isCorrect: true },
            { text: 'Gute Nacht! 🌙', isCorrect: false },
            { text: 'Tschüss! 🏃‍♂️', isCorrect: false },
          ],
        },
      },
    ],
  },
  {
    id: 'story-2',
    titleDe: 'Der rote Apfel',
    titleEn: 'The Red Apple',
    descriptionEn: 'An apple falls from the tree! Who will enjoy the sweet snack?',
    coverEmoji: '🍎',
    pages: [
      {
        textDe: 'Ein großer, roter Apfel hängt am hohen Baum.',
        textEn: 'A big, red apple hangs on the tall tree.',
        emoji: '🍎',
        highlightWords: [
          { word: 'groß', meaning: 'big' },
          { word: 'rot', meaning: 'red' },
          { word: 'der Apfel', meaning: 'the apple' },
        ],
      },
      {
        textDe: 'Plumps! Der Apfel fällt leise ins weiche Moos.',
        textEn: 'Plop! The apple softly falls onto the soft moss.',
        emoji: '🌳',
        highlightWords: [
          { word: 'fällt', meaning: 'falls' },
          { word: 'weich', meaning: 'soft' },
        ],
      },
      {
        textDe: 'Der kleine Igel kommt herbei und schnuppert neugierig.',
        textEn: 'The little hedgehog comes along and sniffs curiously.',
        emoji: '🦔',
        highlightWords: [
          { word: 'der Igel', meaning: 'the hedgehog' },
          { word: 'schnuppert', meaning: 'sniffs' },
        ],
      },
      {
        textDe: 'Mmh, lecker! Der Apfel schmeckt wunderbar süß!',
        textEn: 'Mmm, delicious! The apple tastes wonderfully sweet!',
        emoji: '😋',
        highlightWords: [
          { word: 'lecker', meaning: 'delicious / yummy' },
          { word: 'süß', meaning: 'sweet' },
        ],
        question: {
          questionDe: 'Welche Farbe hat der Apfel?',
          questionEn: 'What color is the apple?',
          options: [
            { text: 'Rot 🔴', isCorrect: true },
            { text: 'Blau 🔵', isCorrect: false },
            { text: 'Schwarz ⚫', isCorrect: false },
          ],
        },
      },
    ],
  },
  {
    id: 'story-3',
    titleDe: 'Ein Tag im Zoo',
    titleEn: 'A Day at the Zoo',
    descriptionEn: 'Leo visits his animal friends at the colorful animal park!',
    coverEmoji: '🐘',
    pages: [
      {
        textDe: 'Heute geht Leo fröhlich in den großen Zoo.',
        textEn: 'Today Leo happily visits the big zoo.',
        emoji: '🦁',
        highlightWords: [
          { word: 'der Zoo', meaning: 'the zoo' },
          { word: 'fröhlich', meaning: 'happily' },
        ],
      },
      {
        textDe: 'Der graue Elefant spritzt kühles Wasser mit dem Rüssel: Psssh!',
        textEn: 'The gray elephant sprays cool water with his trunk: Psssh!',
        emoji: '🐘',
        highlightWords: [
          { word: 'der Elefant', meaning: 'the elephant' },
          { word: 'das Wasser', meaning: 'the water' },
        ],
      },
      {
        textDe: 'Drei lustige Affen klettern von Ast zu Ast und essen Bananen.',
        textEn: 'Three funny monkeys climb from branch to branch and eat bananas.',
        emoji: '🐒',
        highlightWords: [
          { word: 'drei', meaning: 'three' },
          { word: 'Bananen', meaning: 'bananas' },
        ],
      },
      {
        textDe: 'Leo winkt allen Tieren zu und ruft: Bis bald, Freunde!',
        textEn: 'Leo waves to all the animals and calls: See you soon, friends!',
        emoji: '👋',
        highlightWords: [
          { word: 'Bis bald', meaning: 'see you soon' },
          { word: 'die Freunde', meaning: 'friends' },
        ],
        question: {
          questionDe: 'Was essen die lustigen Affen?',
          questionEn: 'What do the funny monkeys eat?',
          options: [
            { text: 'Bananen 🍌', isCorrect: true },
            { text: 'Kuchen 🎂', isCorrect: false },
            { text: 'Schuhe 👟', isCorrect: false },
          ],
        },
      },
    ],
  },
  {
    id: 'story-4',
    titleDe: 'Mein bunter Regenbogen',
    titleEn: 'My Colorful Rainbow',
    descriptionEn: 'The warm rain stops and a magical rainbow arcs across the sky!',
    coverEmoji: '🌈',
    pages: [
      {
        textDe: 'Der Regen tropft: Plitsch, platsch, plitsch!',
        textEn: 'The rain drips: drip, drop, drip!',
        emoji: '🌧️',
        highlightWords: [
          { word: 'der Regen', meaning: 'the rain' },
          { word: 'tropft', meaning: 'drips' },
        ],
      },
      {
        textDe: 'Plötzlich kommt die goldene Sonne hervor und wärmt die Erde.',
        textEn: 'Suddenly the golden sun peeks out and warms the earth.',
        emoji: '☀️',
        highlightWords: [
          { word: 'die Sonne', meaning: 'the sun' },
          { word: 'golden', meaning: 'golden' },
        ],
      },
      {
        textDe: 'Am blauen Himmel strahlt ein riesiger, bunter Regenbogen!',
        textEn: 'In the blue sky radiates a huge, colorful rainbow!',
        emoji: '🌈',
        highlightWords: [
          { word: 'der Regenbogen', meaning: 'the rainbow' },
          { word: 'bunt', meaning: 'colorful' },
        ],
      },
      {
        textDe: 'Rot, Orange, Gelb, Grün, Blau und Lila! Wie wunderschön!',
        textEn: 'Red, Orange, Yellow, Green, Blue and Purple! How gorgeous!',
        emoji: '✨',
        highlightWords: [
          { word: 'rot', meaning: 'red' },
          { word: 'gelb', meaning: 'yellow' },
          { word: 'blau', meaning: 'blue' },
        ],
        question: {
          questionDe: 'Was strahlt nach dem Regen am Himmel?',
          questionEn: 'What shines in the sky after the rain?',
          options: [
            { text: 'Der Regenbogen 🌈', isCorrect: true },
            { text: 'Ein Schneemann ⛄', isCorrect: false },
            { text: 'Ein Auto 🚗', isCorrect: false },
          ],
        },
      },
    ],
  },
  {
    id: 'story-5',
    titleDe: 'Gute Nacht, kleiner Bär',
    titleEn: 'Good Night, Little Bear',
    descriptionEn: 'A cozy, calming bedtime story under gentle twinkling stars.',
    coverEmoji: '🐻',
    pages: [
      {
        textDe: 'Der Abend kommt. Der Himmel wird dunkelblau.',
        textEn: 'Evening arrives. The sky turns deep dark blue.',
        emoji: '🌆',
        highlightWords: [
          { word: 'der Abend', meaning: 'the evening' },
          { word: 'dunkelblau', meaning: 'dark blue' },
        ],
      },
      {
        textDe: 'Der silberne Mond lächelt freundlich über den Tannenbäumen.',
        textEn: 'The silvery moon smiles friendly over the pine trees.',
        emoji: '🌙',
        highlightWords: [
          { word: 'der Mond', meaning: 'the moon' },
          { word: 'lächelt', meaning: 'smiles' },
        ],
      },
      {
        textDe: 'Tausend kleine Sterne funkeln wie Diamanten in der Nacht.',
        textEn: 'A thousand little stars twinkle like diamonds in the night.',
        emoji: '⭐',
        highlightWords: [
          { word: 'die Sterne', meaning: 'the stars' },
          { word: 'die Nacht', meaning: 'the night' },
        ],
      },
      {
        textDe: 'Der kleine Bär kuschelt sich ein: Gute Nacht und süße Träume!',
        textEn: 'The little bear snuggles in: Good night and sweet dreams!',
        emoji: '🛌',
        highlightWords: [
          { word: 'Gute Nacht', meaning: 'good night' },
          { word: 'Träume', meaning: 'dreams' },
        ],
        question: {
          questionDe: 'Wer lächelt am Abend über den Bäumen?',
          questionEn: 'Who smiles over the trees in the evening?',
          options: [
            { text: 'Der Mond 🌙', isCorrect: true },
            { text: 'Der Fisch 🐟', isCorrect: false },
            { text: 'Der Bus 🚌', isCorrect: false },
          ],
        },
      },
    ],
  },
];
