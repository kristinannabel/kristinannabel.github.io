// Default song list for Music Bingo
// 32 songs across 4 categories (8 per category)
// spotifyUri = Spotify track URI for playback

window.DEFAULT_SONGS = [
  // Norske Klassikere (1-8)
  { number: 1,  title: "Take On Me",                    artist: "a-ha",               category: "Norske Klassikere", spotifyUri: "spotify:track:2WfaOiMkCvy7F5fcp2zZ8L" },
  { number: 2,  title: "En solskinnsdag",               artist: "Postgirobygget",     category: "Norske Klassikere", spotifyUri: "spotify:track:5J1Yh2HGIKoy26cweEGH9E" },
  { number: 3,  title: "Hjerteknuser",                  artist: "Kaizers Orchestra",  category: "Norske Klassikere", spotifyUri: "spotify:track:6sFnMUFaRPnZK7LiX2kjzA" },
  { number: 4,  title: "Vinsjan på kaia",               artist: "DDE",                category: "Norske Klassikere", spotifyUri: "spotify:track:1FNwLOZ7U8aAJdRVKQBOIt" },
  { number: 5,  title: "Lys og varme",                  artist: "Åge Aleksandersen",  category: "Norske Klassikere", spotifyUri: "spotify:track:5Qhb1UAnTmHePR0aeV8OvG" },
  { number: 6,  title: "Eg ser",                        artist: "Bjørn Eidsvåg",      category: "Norske Klassikere", spotifyUri: "spotify:track:2CVV8PtUYYsux1XGBBcEMa" },
  { number: 7,  title: "Strangers",                     artist: "Sigrid",             category: "Norske Klassikere", spotifyUri: "spotify:track:7CfDT1BoOcHgXzC8lCbsfr" },
  { number: 8,  title: "Runaway",                       artist: "Aurora",             category: "Norske Klassikere", spotifyUri: "spotify:track:1v1oIWf2Xgh54kIWcKEjFH" },

  // Dansegulvet (9-16)
  { number: 9,  title: "Dancing Queen",                 artist: "ABBA",               category: "Dansegulvet", spotifyUri: "spotify:track:0GjEhVFGZW8afUYGChu3Rr" },
  { number: 10, title: "September",                     artist: "Earth, Wind & Fire", category: "Dansegulvet", spotifyUri: "spotify:track:7Cuk8jsPPoNYQWXK8G2Eyn" },
  { number: 11, title: "Uptown Funk",                   artist: "Bruno Mars",         category: "Dansegulvet", spotifyUri: "spotify:track:32OlwWuMpZ6b0aN2RZOeMS" },
  { number: 12, title: "Don't Start Now",               artist: "Dua Lipa",           category: "Dansegulvet", spotifyUri: "spotify:track:3PfIrDoz19wz7qK7tYeu62" },
  { number: 13, title: "Stayin' Alive",                 artist: "Bee Gees",           category: "Dansegulvet", spotifyUri: "spotify:track:4uLU6hMCjMI75M1A2tKUQC" },
  { number: 14, title: "Billie Jean",                   artist: "Michael Jackson",    category: "Dansegulvet", spotifyUri: "spotify:track:7J1uxwnxfQLu4APicE5Rnj" },
  { number: 15, title: "I Wanna Dance with Somebody",   artist: "Whitney Houston",    category: "Dansegulvet", spotifyUri: "spotify:track:2tUBqZG2AbRi7Q0BIrVrEj" },
  { number: 16, title: "Girls Just Want to Have Fun",   artist: "Cyndi Lauper",       category: "Dansegulvet", spotifyUri: "spotify:track:4y1LsJpmMti1PfRQV9AWWe" },

  // Love Songs (17-24)
  { number: 17, title: "I Will Always Love You",        artist: "Whitney Houston",    category: "Love Songs", spotifyUri: "spotify:track:4eHbdreAnSOrDDsFfc4Fpm" },
  { number: 18, title: "Someone Like You",              artist: "Adele",              category: "Love Songs", spotifyUri: "spotify:track:1zwMYTA5nlNjZxYrvBB2pV" },
  { number: 19, title: "Perfect",                       artist: "Ed Sheeran",         category: "Love Songs", spotifyUri: "spotify:track:0tgVpDi06FyKpA1z0VMD4v" },
  { number: 20, title: "All of Me",                     artist: "John Legend",        category: "Love Songs", spotifyUri: "spotify:track:3U4isOIWM3VvDubwSI3y7a" },
  { number: 21, title: "Your Song",                     artist: "Elton John",         category: "Love Songs", spotifyUri: "spotify:track:38zsOOcu31XbbYj9BIPUF1" },
  { number: 22, title: "My Heart Will Go On",           artist: "Celine Dion",        category: "Love Songs", spotifyUri: "spotify:track:33LC84JgLvK2KuW43MfaNq" },
  { number: 23, title: "Can't Help Falling in Love",    artist: "Elvis Presley",      category: "Love Songs", spotifyUri: "spotify:track:44AyOl4qVkzS48vBsbNXaC" },
  { number: 24, title: "Shallow",                       artist: "Lady Gaga",          category: "Love Songs", spotifyUri: "spotify:track:2VxeLyX666F8uXCJ0dZF8B" },

  // Rock & Power (25-32)
  { number: 25, title: "Bohemian Rhapsody",             artist: "Queen",              category: "Rock & Power", spotifyUri: "spotify:track:4u7EnebtmKWzUH433cf5Qv" },
  { number: 26, title: "Livin' on a Prayer",            artist: "Bon Jovi",           category: "Rock & Power", spotifyUri: "spotify:track:37ZJ0p5Jm13JPevGcx4SkF" },
  { number: 27, title: "Sweet Child O' Mine",           artist: "Guns N' Roses",      category: "Rock & Power", spotifyUri: "spotify:track:7o2CTH4ctstm8TNelqjb51" },
  { number: 28, title: "Highway to Hell",               artist: "AC/DC",              category: "Rock & Power", spotifyUri: "spotify:track:2zYzyRzz6pRmhPzyfMEC8s" },
  { number: 29, title: "Don't Stop Believin'",          artist: "Journey",            category: "Rock & Power", spotifyUri: "spotify:track:4bHsxqR3GMrXTxEPLuK5ue" },
  { number: 30, title: "Africa",                        artist: "Toto",               category: "Rock & Power", spotifyUri: "spotify:track:2374M0fQpWi3dLnB54qaLX" },
  { number: 31, title: "Eye of the Tiger",              artist: "Survivor",           category: "Rock & Power", spotifyUri: "spotify:track:2KH16WveTQWT6KOG9Rg6e2" },
  { number: 32, title: "The Final Countdown",           artist: "Europe",             category: "Rock & Power", spotifyUri: "spotify:track:2qOm7ukLyHUXWyR4ZLLlvA" }
];
