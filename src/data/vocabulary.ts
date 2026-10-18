import { VocabularyItem } from '../types';

export const VOCABULARY_CATEGORIES = [
  { id: 'animals', nameDe: 'Tiere', nameEn: 'Animals', emoji: '🦁', color: '#75E6A6' },
  { id: 'colors', nameDe: 'Farben', nameEn: 'Colors', emoji: '🎨', color: '#55B8FF' },
  { id: 'numbers', nameDe: 'Zahlen', nameEn: 'Numbers', emoji: '🔢', color: '#FFD966' },
  { id: 'fruits', nameDe: 'Obst', nameEn: 'Fruits', emoji: '🍎', color: '#FF8F9C' },
  { id: 'vegetables', nameDe: 'Gemüse', nameEn: 'Vegetables', emoji: '🥕', color: '#75E6A6' },
  { id: 'family', nameDe: 'Familie', nameEn: 'Family', emoji: '👨‍👩‍👧', color: '#B7A4FF' },
  { id: 'toys', nameDe: 'Spielzeug', nameEn: 'Toys', emoji: '🧸', color: '#FFD966' },
  { id: 'clothes', nameDe: 'Kleidung', nameEn: 'Clothes', emoji: '👕', color: '#55B8FF' },
  { id: 'body', nameDe: 'Körperteile', nameEn: 'Body Parts', emoji: '👀', color: '#FF8F9C' },
  { id: 'food_drinks', nameDe: 'Essen & Trinken', nameEn: 'Food & Drinks', emoji: '🥪', color: '#FFD966' },
  { id: 'school', nameDe: 'Schulsachen', nameEn: 'School Objects', emoji: '🎒', color: '#55B8FF' },
  { id: 'weather', nameDe: 'Wetter', nameEn: 'Weather', emoji: '☀️', color: '#75E6A6' },
  { id: 'transport', nameDe: 'Fahrzeuge', nameEn: 'Transport', emoji: '🚗', color: '#FF8F9C' },
  { id: 'nature', nameDe: 'Natur', nameEn: 'Nature', emoji: '🌳', color: '#75E6A6' },
  { id: 'greetings', nameDe: 'Begrüßung', nameEn: 'Greetings', emoji: '👋', color: '#B7A4FF' },
  { id: 'activities', nameDe: 'Aktivitäten', nameEn: 'Everyday Fun', emoji: '🏃‍♂️', color: '#55B8FF' },
];

export const VOCABULARY_LIST: VocabularyItem[] = [
  // 1. Animals
  { id: 'v_dog', german: 'der Hund', english: 'the dog', article: 'der', phonetic: 'dair hoond', category: 'animals', emoji: '🐶', exampleSentenceDe: 'Der Hund bellt wau-wau.', exampleSentenceEn: 'The dog barks woof-woof.' },
  { id: 'v_cat', german: 'die Katze', english: 'the cat', article: 'die', phonetic: 'dee KAT-suh', category: 'animals', emoji: '🐱', exampleSentenceDe: 'Die Katze schnurrt leise.', exampleSentenceEn: 'The cat purrs softly.' },
  { id: 'v_elephant', german: 'der Elefant', english: 'the elephant', article: 'der', phonetic: 'dair el-e-FANT', category: 'animals', emoji: '🐘', exampleSentenceDe: 'Der Elefant hat große Ohren.', exampleSentenceEn: 'The elephant has big ears.' },
  { id: 'v_bird', german: 'der Vogel', english: 'the bird', article: 'der', phonetic: 'dair FO-gel', category: 'animals', emoji: '🐦', exampleSentenceDe: 'Der Vogel singt im Baum.', exampleSentenceEn: 'The bird sings in the tree.' },
  { id: 'v_fish', german: 'der Fisch', english: 'the fish', article: 'der', phonetic: 'dair fish', category: 'animals', emoji: '🐟', exampleSentenceDe: 'Der Fisch schwimmt schnell.', exampleSentenceEn: 'The fish swims fast.' },
  { id: 'v_lion', german: 'der Löwe', english: 'the lion', article: 'der', phonetic: 'dair LUR-vuh', category: 'animals', emoji: '🦁', exampleSentenceDe: 'Leo ist der König der Tiere.', exampleSentenceEn: 'Leo is the king of animals.' },
  { id: 'v_rabbit', german: 'der Hase', english: 'the bunny', article: 'der', phonetic: 'dair HAH-zuh', category: 'animals', emoji: '🐰', exampleSentenceDe: 'Der Hase hüpft im Gras.', exampleSentenceEn: 'The bunny hops in the grass.' },
  { id: 'v_bear', german: 'der Bär', english: 'the bear', article: 'der', phonetic: 'dair bair', category: 'animals', emoji: '🐻', exampleSentenceDe: 'Der Bär schläft im Winter.', exampleSentenceEn: 'The bear sleeps in winter.' },

  // 2. Colors
  { id: 'v_red', german: 'rot', english: 'red', phonetic: 'roht', category: 'colors', emoji: '🔴', exampleSentenceDe: 'Der Apfel ist rot.', exampleSentenceEn: 'The apple is red.' },
  { id: 'v_blue', german: 'blau', english: 'blue', phonetic: 'blow', category: 'colors', emoji: '🔵', exampleSentenceDe: 'Der Himmel ist blau.', exampleSentenceEn: 'The sky is blue.' },
  { id: 'v_green', german: 'grün', english: 'green', phonetic: 'groon', category: 'colors', emoji: '🟢', exampleSentenceDe: 'Das Gras ist grün.', exampleSentenceEn: 'The grass is green.' },
  { id: 'v_yellow', german: 'gelb', english: 'yellow', phonetic: 'gelp', category: 'colors', emoji: '🟡', exampleSentenceDe: 'Die Sonne ist gelb.', exampleSentenceEn: 'The sun is yellow.' },
  { id: 'v_pink', german: 'rosa', english: 'pink', phonetic: 'RO-zah', category: 'colors', emoji: '🌸', exampleSentenceDe: 'Die Blume ist rosa.', exampleSentenceEn: 'The flower is pink.' },
  { id: 'v_purple', german: 'lila', english: 'purple', phonetic: 'LEE-lah', category: 'colors', emoji: '🟣', exampleSentenceDe: 'Der Schmetterling ist lila.', exampleSentenceEn: 'The butterfly is purple.' },
  { id: 'v_orange_col', german: 'orange', english: 'orange', phonetic: 'o-RAHNZH', category: 'colors', emoji: '🟠', exampleSentenceDe: 'Die Karotte ist orange.', exampleSentenceEn: 'The carrot is orange.' },
  { id: 'v_white', german: 'weiß', english: 'white', phonetic: 'vice', category: 'colors', emoji: '⚪', exampleSentenceDe: 'Der Schnee ist weiß.', exampleSentenceEn: 'The snow is white.' },

  // 3. Numbers
  { id: 'v_one', german: 'eins', english: 'one', phonetic: 'eyens', category: 'numbers', emoji: '1️⃣', exampleSentenceDe: 'Eins, zwei, los!', exampleSentenceEn: 'One, two, go!' },
  { id: 'v_two', german: 'zwei', english: 'two', phonetic: 'tsvye', category: 'numbers', emoji: '2️⃣', exampleSentenceDe: 'Ich habe zwei Augen.', exampleSentenceEn: 'I have two eyes.' },
  { id: 'v_three', german: 'drei', english: 'three', phonetic: 'dry', category: 'numbers', emoji: '3️⃣', exampleSentenceDe: 'Drei kleine Vögel.', exampleSentenceEn: 'Three little birds.' },
  { id: 'v_four', german: 'vier', english: 'four', phonetic: 'feer', category: 'numbers', emoji: '4️⃣', exampleSentenceDe: 'Ein Hund hat vier Pfoten.', exampleSentenceEn: 'A dog has four paws.' },
  { id: 'v_five', german: 'fünf', english: 'five', phonetic: 'fewnf', category: 'numbers', emoji: '5️⃣', exampleSentenceDe: 'Fünf Finger an der Hand.', exampleSentenceEn: 'Five fingers on the hand.' },
  { id: 'v_six', german: 'sechs', english: 'six', phonetic: 'zex', category: 'numbers', emoji: '6️⃣', exampleSentenceDe: 'Sechs bunte Stifte.', exampleSentenceEn: 'Six colored pencils.' },
  { id: 'v_seven', german: 'sieben', english: 'seven', phonetic: 'ZEE-ben', category: 'numbers', emoji: '7️⃣', exampleSentenceDe: 'Sieben Zwerge im Wald.', exampleSentenceEn: 'Seven dwarfs in the forest.' },
  { id: 'v_eight', german: 'acht', english: 'eight', phonetic: 'ahkht', category: 'numbers', emoji: '8️⃣', exampleSentenceDe: 'Die Spinne hat acht Beine.', exampleSentenceEn: 'The spider has eight legs.' },
  { id: 'v_nine', german: 'neun', english: 'nine', phonetic: 'noyn', category: 'numbers', emoji: '9️⃣', exampleSentenceDe: 'Neun Luftballons.', exampleSentenceEn: 'Nine balloons.' },
  { id: 'v_ten', german: 'zehn', english: 'ten', phonetic: 'tsayn', category: 'numbers', emoji: '🔟', exampleSentenceDe: 'Zehn kleine Kinder.', exampleSentenceEn: 'Ten little children.' },

  // 4. Fruits
  { id: 'v_apple', german: 'der Apfel', english: 'the apple', article: 'der', phonetic: 'dair AHP-fel', category: 'fruits', emoji: '🍎', exampleSentenceDe: 'Der Apfel ist knackig.', exampleSentenceEn: 'The apple is crunchy.' },
  { id: 'v_banana', german: 'die Banane', english: 'the banana', article: 'die', phonetic: 'dee bah-NAH-nuh', category: 'fruits', emoji: '🍌', exampleSentenceDe: 'Die Banane ist gelb und süß.', exampleSentenceEn: 'The banana is yellow and sweet.' },
  { id: 'v_strawberry', german: 'die Erdbeere', english: 'the strawberry', article: 'die', phonetic: 'dee AIRD-bay-ruh', category: 'fruits', emoji: '🍓', exampleSentenceDe: 'Ich mag Erdbeeren.', exampleSentenceEn: 'I like strawberries.' },
  { id: 'v_orange_fruit', german: 'die Orange', english: 'the orange', article: 'die', phonetic: 'dee o-RAHN-zhuh', category: 'fruits', emoji: '🍊', exampleSentenceDe: 'Die Orange ist saftig.', exampleSentenceEn: 'The orange is juicy.' },

  // 5. Vegetables
  { id: 'v_carrot', german: 'die Karotte', english: 'the carrot', article: 'die', phonetic: 'dee kah-ROT-tuh', category: 'vegetables', emoji: '🥕', exampleSentenceDe: 'Der Hase isst eine Karotte.', exampleSentenceEn: 'The bunny eats a carrot.' },
  { id: 'v_tomato', german: 'die Tomate', english: 'the tomato', article: 'die', phonetic: 'dee toh-MAH-tuh', category: 'vegetables', emoji: '🍅', exampleSentenceDe: 'Die Tomate ist rot.', exampleSentenceEn: 'The tomato is red.' },
  { id: 'v_cucumber', german: 'die Gurke', english: 'the cucumber', article: 'die', phonetic: 'dee GOOR-kuh', category: 'vegetables', emoji: '🥒', exampleSentenceDe: 'Die Gurke ist grün und frisch.', exampleSentenceEn: 'The cucumber is green and fresh.' },

  // 6. Family
  { id: 'v_mom', german: 'die Mama', english: 'mom', article: 'die', phonetic: 'dee MAH-mah', category: 'family', emoji: '👩', exampleSentenceDe: 'Die Mama lacht freundlich.', exampleSentenceEn: 'Mom smiles friendly.' },
  { id: 'v_dad', german: 'der Papa', english: 'dad', article: 'der', phonetic: 'dair PAH-pah', category: 'family', emoji: '👨', exampleSentenceDe: 'Der Papa liest ein Buch.', exampleSentenceEn: 'Dad reads a book.' },
  { id: 'v_baby', german: 'das Baby', english: 'the baby', article: 'das', phonetic: 'dahs BAY-bee', category: 'family', emoji: '👶', exampleSentenceDe: 'Das Baby schläft selig.', exampleSentenceEn: 'The baby sleeps peacefully.' },
  { id: 'v_grandma', german: 'die Oma', english: 'grandma', article: 'die', phonetic: 'dee OH-mah', category: 'family', emoji: '👵', exampleSentenceDe: 'Die Oma backt Kuchen.', exampleSentenceEn: 'Grandma bakes cakes.' },
  { id: 'v_grandpa', german: 'der Opa', english: 'grandpa', article: 'der', phonetic: 'dair OH-pah', category: 'family', emoji: '👴', exampleSentenceDe: 'Der Opa erzählt Geschichten.', exampleSentenceEn: 'Grandpa tells stories.' },

  // 7. Toys
  { id: 'v_ball', german: 'der Ball', english: 'the ball', article: 'der', phonetic: 'dair bahl', category: 'toys', emoji: '⚽', exampleSentenceDe: 'Wir spielen mit dem Ball.', exampleSentenceEn: 'We play with the ball.' },
  { id: 'v_doll', german: 'die Puppe', english: 'the doll', article: 'die', phonetic: 'dee POOP-puh', category: 'toys', emoji: '🪆', exampleSentenceDe: 'Die Puppe hat ein schönes Kleid.', exampleSentenceEn: 'The doll has a pretty dress.' },
  { id: 'v_teddy', german: 'der Teddybär', english: 'the teddy bear', article: 'der', phonetic: 'dair TED-dee-bair', category: 'toys', emoji: '🧸', exampleSentenceDe: 'Mein Teddybär ist kuschelig.', exampleSentenceEn: 'My teddy bear is cuddly.' },
  { id: 'v_toycar', german: 'das Spielzeugauto', english: 'the toy car', article: 'das', phonetic: 'dahs SHPEEL-tsoyk-ow-toh', category: 'toys', emoji: '🚗', exampleSentenceDe: 'Das rote Auto fährt brumm-brumm.', exampleSentenceEn: 'The red car goes vroom-vroom.' },

  // 8. Clothes
  { id: 'v_shoes', german: 'die Schuhe', english: 'the shoes', article: 'die', phonetic: 'dee SHOO-uh', category: 'clothes', emoji: '👟', exampleSentenceDe: 'Ich ziehe meine Schuhe an.', exampleSentenceEn: 'I put on my shoes.' },
  { id: 'v_hat', german: 'die Mütze', english: 'the beanie', article: 'die', phonetic: 'dee MOOT-zuh', category: 'clothes', emoji: '🧢', exampleSentenceDe: 'Die Mütze hält den Kopf warm.', exampleSentenceEn: 'The beanie keeps head warm.' },
  { id: 'v_shirt', german: 'das T-Shirt', english: 'the t-shirt', article: 'das', phonetic: 'dahs TEE-shirt', category: 'clothes', emoji: '👕', exampleSentenceDe: 'Mein T-Shirt ist blau.', exampleSentenceEn: 'My t-shirt is blue.' },

  // 9. Body parts
  { id: 'v_eye', german: 'das Auge', english: 'the eye', article: 'das', phonetic: 'dahs OW-guh', category: 'body', emoji: '👁️', exampleSentenceDe: 'Ich sehe mit dem Auge.', exampleSentenceEn: 'I see with the eye.' },
  { id: 'v_nose', german: 'die Nase', english: 'the nose', article: 'die', phonetic: 'dee NAH-zuh', category: 'body', emoji: '👃', exampleSentenceDe: 'Ich rieche mit der Nase.', exampleSentenceEn: 'I smell with the nose.' },
  { id: 'v_mouth', german: 'der Mund', english: 'the mouth', article: 'der', phonetic: 'dair moond', category: 'body', emoji: '👄', exampleSentenceDe: 'Der Mund lächelt.', exampleSentenceEn: 'The mouth smiles.' },
  { id: 'v_ear', german: 'das Ohr', english: 'the ear', article: 'das', phonetic: 'dahs ohr', category: 'body', emoji: '👂', exampleSentenceDe: 'Ich höre Musik mit dem Ohr.', exampleSentenceEn: 'I hear music with the ear.' },
  { id: 'v_hand', german: 'die Hand', english: 'the hand', article: 'die', phonetic: 'dee hahnt', category: 'body', emoji: '✋', exampleSentenceDe: 'Die Hand winkt: Hallo!', exampleSentenceEn: 'The hand waves: Hello!' },

  // 10. Food and drinks
  { id: 'v_bread', german: 'das Brot', english: 'the bread', article: 'das', phonetic: 'dahs broht', category: 'food_drinks', emoji: '🍞', exampleSentenceDe: 'Das Brot schmeckt lecker.', exampleSentenceEn: 'The bread tastes delicious.' },
  { id: 'v_milk', german: 'die Milch', english: 'the milk', article: 'die', phonetic: 'dee milsh', category: 'food_drinks', emoji: '🥛', exampleSentenceDe: 'Die Katze trinkt Milch.', exampleSentenceEn: 'The cat drinks milk.' },
  { id: 'v_water', german: 'das Wasser', english: 'the water', article: 'das', phonetic: 'dahs VAH-ser', category: 'food_drinks', emoji: '💧', exampleSentenceDe: 'Frisches Wasser ist gesund.', exampleSentenceEn: 'Fresh water is healthy.' },
  { id: 'v_cheese', german: 'der Käse', english: 'the cheese', article: 'der', phonetic: 'dair KAY-zuh', category: 'food_drinks', emoji: '🧀', exampleSentenceDe: 'Die Maus liebt Käse.', exampleSentenceEn: 'The mouse loves cheese.' },

  // 11. School objects
  { id: 'v_book', german: 'das Buch', english: 'the book', article: 'das', phonetic: 'dahs bookh', category: 'school', emoji: '📖', exampleSentenceDe: 'Leo liest ein Bilderbuch.', exampleSentenceEn: 'Leo reads a picture book.' },
  { id: 'v_pen', german: 'der Stift', english: 'the pencil', article: 'der', phonetic: 'dair shtift', category: 'school', emoji: '✏️', exampleSentenceDe: 'Wir malen mit dem Stift.', exampleSentenceEn: 'We draw with the pencil.' },
  { id: 'v_backpack', german: 'der Rucksack', english: 'the backpack', article: 'der', phonetic: 'dair ROOK-zahk', category: 'school', emoji: '🎒', exampleSentenceDe: 'Mein Rucksack ist voll!', exampleSentenceEn: 'My backpack is full!' },

  // 12. Weather
  { id: 'v_sun', german: 'die Sonne', english: 'the sun', article: 'die', phonetic: 'dee ZON-nuh', category: 'weather', emoji: '☀️', exampleSentenceDe: 'Die Sonne scheint am Himmel.', exampleSentenceEn: 'The sun shines in the sky.' },
  { id: 'v_rain', german: 'der Regen', english: 'the rain', article: 'der', phonetic: 'dair RAY-gen', category: 'weather', emoji: '🌧️', exampleSentenceDe: 'Der Regen macht Plitsch-Platsch.', exampleSentenceEn: 'The rain goes drip-drop.' },
  { id: 'v_rainbow', german: 'der Regenbogen', english: 'the rainbow', article: 'der', phonetic: 'dair RAY-gen-boh-gen', category: 'weather', emoji: '🌈', exampleSentenceDe: 'Der Regenbogen hat sieben Farben.', exampleSentenceEn: 'The rainbow has seven colors.' },

  // 13. Transport
  { id: 'v_car', german: 'das Auto', english: 'the car', article: 'das', phonetic: 'dahs OW-toh', category: 'transport', emoji: '🚗', exampleSentenceDe: 'Das Auto fährt auf der Straße.', exampleSentenceEn: 'The car drives on the street.' },
  { id: 'v_bus', german: 'der Bus', english: 'the bus', article: 'der', phonetic: 'dair boos', category: 'transport', emoji: '🚌', exampleSentenceDe: 'Die Kinder fahren mit dem Bus.', exampleSentenceEn: 'The children ride the bus.' },
  { id: 'v_train', german: 'der Zug', english: 'the train', article: 'der', phonetic: 'dair tsook', category: 'transport', emoji: '🚂', exampleSentenceDe: 'Der Zug macht Tschu-Tschu!', exampleSentenceEn: 'The train goes choo-choo!' },
  { id: 'v_bicycle', german: 'das Fahrrad', english: 'the bicycle', article: 'das', phonetic: 'dahs FAHR-raht', category: 'transport', emoji: '🚲', exampleSentenceDe: 'Ich fahre mit dem Fahrrad.', exampleSentenceEn: 'I ride my bicycle.' },

  // 14. Nature
  { id: 'v_tree', german: 'der Baum', english: 'the tree', article: 'der', phonetic: 'dair bowm', category: 'nature', emoji: '🌳', exampleSentenceDe: 'Der Baum hat grüne Blätter.', exampleSentenceEn: 'The tree has green leaves.' },
  { id: 'v_flower', german: 'die Blume', english: 'the flower', article: 'die', phonetic: 'dee BLOO-muh', category: 'nature', emoji: '🌸', exampleSentenceDe: 'Die Blume duftet gut.', exampleSentenceEn: 'The flower smells good.' },
  { id: 'v_star', german: 'der Stern', english: 'the star', article: 'der', phonetic: 'dair shtairn', category: 'nature', emoji: '⭐', exampleSentenceDe: 'Der Stern leuchtet in der Nacht.', exampleSentenceEn: 'The star shines at night.' },

  // 15. Greetings
  { id: 'v_hallo', german: 'Hallo!', english: 'Hello!', phonetic: 'HAH-loh', category: 'greetings', emoji: '👋', exampleSentenceDe: 'Hallo, mein Freund!', exampleSentenceEn: 'Hello, my friend!' },
  { id: 'v_tschuess', german: 'Tschüss!', english: 'Bye!', phonetic: 'tshooss', category: 'greetings', emoji: '👋', exampleSentenceDe: 'Tschüss, bis morgen!', exampleSentenceEn: 'Bye, see you tomorrow!' },
  { id: 'v_danke', german: 'Danke!', english: 'Thank you!', phonetic: 'DAHN-kuh', category: 'greetings', emoji: '🙏', exampleSentenceDe: 'Danke für den Apfel!', exampleSentenceEn: 'Thank you for the apple!' },
  { id: 'v_bitte', german: 'Bitte!', english: 'Please / You are welcome!', phonetic: 'BIT-tuh', category: 'greetings', emoji: '🤲', exampleSentenceDe: 'Bitte sehr!', exampleSentenceEn: 'You are welcome!' },

  // 16. Activities
  { id: 'v_spielen', german: 'spielen', english: 'to play', phonetic: 'SHPEE-len', category: 'activities', emoji: '🤹‍♂️', exampleSentenceDe: 'Wir spielen zusammen.', exampleSentenceEn: 'We play together.' },
  { id: 'v_schlafen', german: 'schlafen', english: 'to sleep', phonetic: 'SHLAH-fen', category: 'activities', emoji: '😴', exampleSentenceDe: 'Der Bär will schlafen.', exampleSentenceEn: 'The bear wants to sleep.' },
  { id: 'v_essen_act', german: 'essen', english: 'to eat', phonetic: 'ES-sen', category: 'activities', emoji: '🥣', exampleSentenceDe: 'Wir essen leckeres Obst.', exampleSentenceEn: 'We eat yummy fruit.' },
  { id: 'v_lachen', german: 'lachen', english: 'to laugh', phonetic: 'LAH-khen', category: 'activities', emoji: '😄', exampleSentenceDe: 'Leo und seine Freunde lachen.', exampleSentenceEn: 'Leo and his friends laugh.' },
];
