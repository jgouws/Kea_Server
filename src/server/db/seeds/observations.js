const path = require('path');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('observations').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('observations').insert({
          user_id: 1,
          image_url: '/uploads/bird_1.jpg',
          observation_type: 'Sighting',
          description: 'This is a bird',
          approved: true,
          latitude: '41.2865',
          longitude: '174.7762',
          created_at: '2017-10-01 16:23:03.262663+13'
        })
      ]);
    });
};
