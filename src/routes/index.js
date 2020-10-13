const express = require('express')
const routes = express.Router()

const Product = require('../model/Product');
routes.post('/products/create', async (req, res) => {
  try {
    let { name, description, price, quantitity } = req.body

    const product = await Product.create({
        name,
        description,
        price,
        quantitity
    }) 

    return res.json({ product })
  } catch(err) {
    return res.status(500).json({ message: err.stack || err })
  }
})

routes.get('/products', async (req, res) => {
  try {
    const products = await Product.find({})
    return res.json({ products })
  } catch(err) {
      return res.status(500).json({message: err.message || err})
  }
})

routes.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params

    const product = await Product.findOne({ _id: id })
    
    if (!product) return res.status(204).json({message: "Product not found!"})

    return res.json({ product })
  } catch(err) {
    return res.status(500).json({message: err.message || err})
  }
});

routes.put('/products/:id', async(req, res) => {
  try {
    const { id } = req.params

    const product = await Product.findOneAndUpdate({ _id: id}, req.body)

    return res.json({ product })
  }catch(err) {
    return res.status(500).json({message: err.message || err})
  }
});

routes.delete('/products/:id', async(req, res) => {
  try {
    const { id } = req.params

    const product = await Product.findOneAndDelete({_id: id})

    return res.json({ product })
  }catch(err) {
    return res.status(500).json({message: err.message || err})
  }
});

module.exports = routes;