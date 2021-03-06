const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    include: {
      model: Product,
      // be sure to include its associated Products
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
  .then(CategoryData => {
    if(!CategoryData) {
      res.status(404).json({message: "No categories"});
      return;
    }
    res.json(CategoryData);
  })
  .catch(err => {
    res.status(500).json(err);
    console.log(err);
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      // be sure to include its associated Products
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
  .then(CategoryData => {
    if(!CategoryData) {
      res.status(404).json({message: "No categories"});
      return;
    }
    res.json(CategoryData);
  })
  .catch(err => {
    res.status(500).json(err);
    console.log(err);
  })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
  .then(CategoryData => {
    if(!CategoryData) {
      res.status(404).json({message: "Error to create category"});
      return;
    }
    res.json(CategoryData);
  })
  .catch(err => {
    res.status(500).json(err);
    console.log(err);
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(CategoryData => {
    if(!CategoryData) {
      res.status(404).json({message: "No categories found with this id"});
      return;
    }
    res.json(CategoryData);
  })
  .catch(err => {
    res.status(500).json(err);
    console.log(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(CategoryData => {
    if(!CategoryData) {
      res.status(404).json({message: "No categories found with this id"});
      return;
    }
    res.json(CategoryData);
  })
  .catch(err => {
    res.status(500).json(err);
    console.log(err);
  })
});

module.exports = router;
