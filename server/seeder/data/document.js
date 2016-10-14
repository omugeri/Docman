const TestDocuments = [
  {
    title: 'ALPHABETS',
    content: 'fgdahsjleiuyvabnlekfhrsuigrkeljfiov',
    owner: 'stranger',
    createdAt: new Date(Date.now()),
    permissions: 'Public',
  },
  {
    title: 'Numbers',
    content: '1234567890 09876543',
    owner: 'riwhiz',
    createdAt: new Date(Date.now() + 1),
    permissions: 'Private',
  },
  {
    title: 'Nursery Rhyme',
    content: 'Johnny, Johnny yes papa, eating sugar? no papa, open your mouth\n'
    + 'hahaha',
    owner: 'ganjez',
    createdAt: new Date(Date.now() + 2),
    permissions: 'Public',
  },
  {
    title: 'Songs',
    content: 'Run, run lost boy, they say to me, Neverlands home to lost boys\n'
              + 'like me and lost boys like me are free',
    owner: 'ganjez',
    createdAt: new Date(Date.now() + 3),
    permissions: 'Private',
  },
  {
    title: 'Football Clubs',
    content: 'Chelsea, Paris Saint German, Arsenal, Manchester United.',
    owner: 'riwhiz',
    createdAt: new Date(Date.now() + 4),
    permissions: 'Public',

  },
  {
    title: 'Mwanake',
    content: 'mwanake ngukwira ati wendo ni wendo, utumage mundu oye mukanda\n'
              + 'ecurie, erute mwoyo niundu wa mundu ungi.',
    owner: 'riwhiz',
    permissions: 'Private',
    createdAt: new Date(Date.now() + 5),
  },
  {
    title: 'Board games',
    content: 'Sixty seconds, Monopoly, Cashflow, Scrabble, Chess, Draft,\n'
              + 'Family Feud',
    owner: 'ganjez',
    createdAt: new Date(Date.now() + 6),
    permissions: 'Public',
  },
  {
    title: 'Brands',
    content: 'Louis Vuitton, Gucci',
    owner: 'riwhiz',
    createdAt: new Date(Date.now() + 7),
    permissions: 'Private',
  },
  {
    title: 'Car Models',
    content: 'Ferrari, Bugatti, Chrysler, Runx, Rolls Royce, Mercedes Benz, BMW',
    createdAt: new Date(Date.now() + 8),
    permissions: 'Public',
  },
];
module.exports = TestDocuments;
