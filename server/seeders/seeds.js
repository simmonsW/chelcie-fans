const db = require('../config/connection');
const { User, Category, Product, Print } = require('../models');

db.once('open', async () => {

  //************//
  // CATEGORIES //
  //************//

  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'succulents' },
    { name: 'city life' },
    { name: 'nature' },
    { name: 'cars' }
  ]);

  console.log('categories seeded');

  //********//
  // PRINTS //
  //********//

  await Print.deleteMany();

  const prints = await Print.insertMany([
    {
      size: '11x14',
      price: 20
    },
    {
      size: '16x20',
      price: 28
    },
    {
      size: '20x24',
      price: 36
    },
    {
      size: '20x30',
      price: 44
    },
    {
      size: '24x36',
      price: 52
    },
    {
      size: '30x40',
      price: 60
    }
  ]);

  console.log('prints seeded');

  //**********//
  // PRODUCTS //
  //**********//

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'colorful succulents',
      description: 'a beautiful grid of many succulents in some colorful pots',
      image: 'succulent-pots-Ian-deng.jpg',
      quantity: 3,
      print: prints[5]._id,
      category: [categories[0]._id],
    },
    {
      name: 'succulents',
      description: 'a wonderful collection of succulents in a white pot',
      image: 'succulent-collection-sheelah-brennan.jpg',
      quantity: 2,
      print: prints[3]._id,
      category: [categories[0]._id],
    },
    {
      name: 'up close',
      description: 'a super cool macro shot of a succulent',
      image: 'succulent-close-up-yousef-espanioly.jpg',
      quantity: 4,
      print: prints[4]._id,
      category: [categories[0]._id],
    },
    {
      name: 'city garage',
      description: 'a super cool shot of a city parking garage at night',
      image: 'city-garage-neonbrand.jpg',
      quantity: 2,
      print: prints[5]._id,
      category: [categories[1]._id, categories[3]._id],
    },
    {
      name: 'city metro',
      description: 'a look down the metro tracks while in Vegas',
      image: 'city-metro-liz-sanchez.jpg',
      quantity: 6,
      print: prints[3]._id,
      category: [categories[1]._id],
    },
    {
      name: 'metro station',
      description: 'a shot I took while waiting to catch my train',
      image: 'metro-station-nic-y-c.jpg',
      quantity: 4,
      print: prints[4]._id,
      category: [categories[1]._id],
    },
    {
      name: 'autumn trees',
      description: 'beautiful autumn colors captured on a nature walk',
      image: 'autumn-trees-sebastian-unrau.jpg',
      quantity: 3,
      print: prints[5]._id,
      category: [categories[2]._id],
    },
    {
      name: 'el capitan',
      description: 'an amazing shot taken while in Yosemite',
      image: 'el-cap-adam-kool.jpg',
      quantity: 2,
      print: prints[3]._id,
      category: [categories[2]._id],
    },
    {
      name: 'forest and bmw',
      description: 'a great shot of a friends car while out for a scenic drive',
      image: 'trees-and-bmw-janfillem.jpg',
      quantity: 3,
      print: prints[5]._id,
      category: [categories[2]._id, categories[3]._id],
    },
    {
      name: 'wildflowers',
      description: 'a beautiful shot of some flower fields',
      image: 'wildflowers-silvestri-matteo.jpg',
      quantity: 4,
      print: prints[2]._id,
      category: [categories[2]._id],
    },
    {
      name: 'forest path',
      description: 'beautiful trees from one of many nature walks',
      image: 'forest-path-lukasz-szmigiel.jpg',
      quantity: 5,
      print: prints[3]._id,
      category: [categories[2]._id],
    },
    {
      name: 'desert road',
      description: 'cool shot of the desert road while on a road trip',
      image: 'desert-road-jake-blucker.jpg',
      quantity: 2,
      print: prints[4]._id,
      category: [categories[2]._id],
    },
  ]);

  console.log('Products seeded');

  //**************//
  // USER / ADMIN //
  //**************//

  await User.deleteMany();

  await User.create({
    firstName: 'Chelcie',
    lastName: 'De Almeida',
    username: 'admin',
    email: 'chelcie@admin.com',
    password: 'dadjokesrock'
  });

  console.log('user/admin seeded');

  process.exit();
});