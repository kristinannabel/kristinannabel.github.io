// Full song pool for Music Bingo
// ~60 songs across 4 categories (~15 per category)
// Each game randomly picks 8 per category = 32 songs
// spotifyUri is cached after first Spotify search

window.SONG_POOL = [
  // ===== Norske Klassikere =====
  { title: "Take On Me",               artist: "a-ha",               category: "Norske Klassikere" },
  { title: "En solskinnsdag",          artist: "Postgirobygget",     category: "Norske Klassikere" },
  { title: "Hjerteknuser",             artist: "Kaizers Orchestra",  category: "Norske Klassikere" },
  { title: "Vinsjan på kaia",          artist: "DDE",                category: "Norske Klassikere" },
  { title: "Lys og varme",             artist: "Åge Aleksandersen",  category: "Norske Klassikere" },
  { title: "Eg ser",                   artist: "Bjørn Eidsvåg",      category: "Norske Klassikere" },
  { title: "Strangers",                artist: "Sigrid",             category: "Norske Klassikere" },
  { title: "Runaway",                  artist: "Aurora",             category: "Norske Klassikere" },
  { title: "Idyll",                    artist: "Karpe",              category: "Norske Klassikere" },
  { title: "Håper du har plass",        artist: "Cezinando",          category: "Norske Klassikere" },
  { title: "Sail Along",               artist: "Röyksopp",           category: "Norske Klassikere" },
  { title: "Riding",                   artist: "Dagny",              category: "Norske Klassikere" },
  { title: "Sommerfuggel i vinterland", artist: "Hellbillies",       category: "Norske Klassikere" },
  { title: "Alt jeg ønsker meg",       artist: "Odd Nordstoga",      category: "Norske Klassikere" },
  { title: "Optimist",                 artist: "Postgirobygget",     category: "Norske Klassikere" },

  // ===== Dansegulvet =====
  { title: "Dancing Queen",            artist: "ABBA",               category: "Dansegulvet" },
  { title: "September",                artist: "Earth, Wind & Fire", category: "Dansegulvet" },
  { title: "Uptown Funk",              artist: "Mark Ronson ft. Bruno Mars", category: "Dansegulvet" },
  { title: "Don't Start Now",          artist: "Dua Lipa",           category: "Dansegulvet" },
  { title: "Stayin' Alive",            artist: "Bee Gees",           category: "Dansegulvet" },
  { title: "Billie Jean",              artist: "Michael Jackson",    category: "Dansegulvet" },
  { title: "I Wanna Dance with Somebody", artist: "Whitney Houston", category: "Dansegulvet" },
  { title: "Girls Just Want to Have Fun", artist: "Cyndi Lauper",    category: "Dansegulvet" },
  { title: "Levitating",               artist: "Dua Lipa",           category: "Dansegulvet" },
  { title: "Blinding Lights",          artist: "The Weeknd",         category: "Dansegulvet" },
  { title: "Shake It Off",             artist: "Taylor Swift",       category: "Dansegulvet" },
  { title: "Mr. Brightside",           artist: "The Killers",        category: "Dansegulvet" },
  { title: "Rasputin",                 artist: "Boney M.",           category: "Dansegulvet" },
  { title: "Hung Up",                  artist: "Madonna",            category: "Dansegulvet" },
  { title: "Crazy In Love",            artist: "Beyoncé",            category: "Dansegulvet" },

  // ===== Love Songs =====
  { title: "I Will Always Love You",   artist: "Whitney Houston",    category: "Love Songs" },
  { title: "Someone Like You",         artist: "Adele",              category: "Love Songs" },
  { title: "Perfect",                  artist: "Ed Sheeran",         category: "Love Songs" },
  { title: "All of Me",                artist: "John Legend",         category: "Love Songs" },
  { title: "Your Song",                artist: "Elton John",         category: "Love Songs" },
  { title: "My Heart Will Go On",      artist: "Celine Dion",        category: "Love Songs" },
  { title: "Can't Help Falling in Love", artist: "Elvis Presley",    category: "Love Songs" },
  { title: "Shallow",                  artist: "Lady Gaga Bradley Cooper", category: "Love Songs" },
  { title: "Make You Feel My Love",    artist: "Adele",              category: "Love Songs" },
  { title: "Unchained Melody",         artist: "The Righteous Brothers", category: "Love Songs" },
  { title: "A Thousand Years",         artist: "Christina Perri",    category: "Love Songs" },
  { title: "Thinking Out Loud",        artist: "Ed Sheeran",         category: "Love Songs" },
  { title: "Just the Way You Are",     artist: "Bruno Mars",         category: "Love Songs" },
  { title: "At Last",                  artist: "Etta James",         category: "Love Songs" },
  { title: "I Don't Want to Miss a Thing", artist: "Aerosmith",      category: "Love Songs" },

  // ===== Rock & Power =====
  { title: "Bohemian Rhapsody",        artist: "Queen",              category: "Rock & Power" },
  { title: "Livin' on a Prayer",       artist: "Bon Jovi",           category: "Rock & Power" },
  { title: "Sweet Child O' Mine",      artist: "Guns N' Roses",      category: "Rock & Power" },
  { title: "Highway to Hell",          artist: "AC/DC",              category: "Rock & Power" },
  { title: "Don't Stop Believin'",     artist: "Journey",            category: "Rock & Power" },
  { title: "Africa",                   artist: "Toto",               category: "Rock & Power" },
  { title: "Eye of the Tiger",         artist: "Survivor",           category: "Rock & Power" },
  { title: "The Final Countdown",      artist: "Europe",             category: "Rock & Power" },
  { title: "We Will Rock You",         artist: "Queen",              category: "Rock & Power" },
  { title: "Back in Black",            artist: "AC/DC",              category: "Rock & Power" },
  { title: "Sweet Home Alabama",       artist: "Lynyrd Skynyrd",     category: "Rock & Power" },
  { title: "Thunderstruck",            artist: "AC/DC",              category: "Rock & Power" },
  { title: "You Give Love a Bad Name", artist: "Bon Jovi",           category: "Rock & Power" },
  { title: "Pour Some Sugar on Me",    artist: "Def Leppard",        category: "Rock & Power" },
  { title: "Another One Bites the Dust", artist: "Queen",            category: "Rock & Power" }
];

/**
 * Pick 32 random songs (8 per category) from the pool.
 * Returns an array of song objects with number property added (1-32).
 */
window.pickSongsForGame = function () {
  var categories = {};
  var categoryOrder = [];

  // Group by category
  for (var i = 0; i < window.SONG_POOL.length; i++) {
    var cat = window.SONG_POOL[i].category;
    if (!categories[cat]) {
      categories[cat] = [];
      categoryOrder.push(cat);
    }
    categories[cat].push(window.SONG_POOL[i]);
  }

  // Pick 8 random from each category
  var picked = [];
  var num = 1;
  for (var c = 0; c < categoryOrder.length; c++) {
    var catSongs = categories[categoryOrder[c]].slice();
    // Shuffle
    for (var j = catSongs.length - 1; j > 0; j--) {
      var k = Math.floor(Math.random() * (j + 1));
      var tmp = catSongs[j];
      catSongs[j] = catSongs[k];
      catSongs[k] = tmp;
    }
    // Take 8
    var take = catSongs.slice(0, 8);
    for (var t = 0; t < take.length; t++) {
      picked.push({
        number: num++,
        title: take[t].title,
        artist: take[t].artist,
        category: take[t].category,
        spotifyUri: take[t].spotifyUri || null
      });
    }
  }

  return picked;
};

// Keep DEFAULT_SONGS for backward compat
window.DEFAULT_SONGS = window.pickSongsForGame();
