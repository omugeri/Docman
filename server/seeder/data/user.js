const bcrypt = require('bcrypt-nodejs');

const TestUsers = [
  {
    userName: 'riwhiz',
    name: {
      first: 'Olive',
      last: 'Nyotu',
    },
    email: 'nyotuo16@gmail.com',
    password: bcrypt.hashSync('olive', bcrypt.genSaltSync(8), null),
    role: 'Admin',
  },
  {
    userName: 'ganjez',
    name: {
      first: 'Alex',
      last: 'Nyotu',
    },
    email: 'mugane@gmail.com',
    password: bcrypt.hashSync('alex', bcrypt.genSaltSync(8), null),
    role: 'User',
  },
  {
    userName: 'stranger',
    name: {
      first: 'Someone',
      last: 'Anyone',
    },
    email: 'someone@gmail.com',
    password: bcrypt.hashSync('someone', bcrypt.genSaltSync(8), null),
    role: 'User',
  },
  {
    userName: 'tonee',
    name: {
      first: 'Tonida',
      last: 'Baraza',
    },
    email: 'tonee@gmail.com',
    password: bcrypt.hashSync('tonee', bcrypt.genSaltSync(8), null),
    role: 'User',
  },
  {
    userName: 'dama',
    name: {
      first: 'Esther',
      last: 'Kahindi',
    },
    email: 'dama@andela.com',
    password: bcrypt.hashSync('esther', bcrypt.genSaltSync(8), null),
    role: 'User',
  },
  {
    userName: 'joykare',
    name: {
      first: 'Joy',
      last: 'Waruguru',
    },
    email: 'joy@gmail.com',
    password: bcrypt.hashSync('joykare', bcrypt.genSaltSync(8), null),
    role: 'User',
  },
  {
    userName: 'blonde',
    name: {
      first: 'Jacky',
      last: 'Kimani',
    },
    email: 'blonde@gmail.com',
    password: bcrypt.hashSync('blondie', bcrypt.genSaltSync(8), null),
    role: 'User',
  },
  {
    userName: 'monee',
    name: {
      first: 'Monicah',
      last: 'Kwamboka',
    },
    email: 'monee@gmail.com',
    password: bcrypt.hashSync('monicah', bcrypt.genSaltSync(8), null),
    role: 'User',
  },
  {
    userName: 'neutral',
    name: {
      first: 'Elizabeth',
      last: 'Mabishi',
    },
    email: 'mabishi@gmail.com',
    password: bcrypt.hashSync('gender', bcrypt.genSaltSync(8), null),
    role: 'Admin',
  },
];
module.exports = TestUsers;
