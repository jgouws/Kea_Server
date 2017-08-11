// const path = require('path');
//
// exports.seed = function(knex, Promise) {
//   return knex('observations').del()
//     .then(function () {
//       return Promise.all([
//         knex('observations').insert({
//           user_id: 1,
//           image_url: path.join(__dirname, '../../uploads/bird_1.jpg'),
//           species: 'Parrot',
//           description: 'This is a parrot',
//           approved: true,
//           latitude: '41.2865',
//           longitude: '174.7762'
//         }),
//         knex('observations').insert({
//           user_id: 2,
//           image_url: path.join(__dirname, '../../uploads/bird_2.jpg'),
//           species: 'Kiwi',
//           description: 'This is a kiwi',
//           approved: true,
//           latitude: '41.2865',
//           longitude: '174.7762'
//         })
//       ]);
//     });
// };
