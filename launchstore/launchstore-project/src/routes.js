const express = require('express')
const routes = express.Router()
const ProductsController = require('./app/controllers/ProductsController')

/*GET ROUTES*/
routes.get('/', (req, res) => {
    return res.render("layout.html")
})
routes.get('/products/create', ProductsController.create)
routes.get('/products/:id/edit', ProductsController.edit)
routes.post('/products', ProductsController.post)


routes.get('ads/create', function(req, res) {
    return res.redirect("/products/create")
})

module.exports = routes