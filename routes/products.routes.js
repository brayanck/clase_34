const router = require("express").Router();
const { eliminarProductoController, actualizarProductController } = require('../controllers/products.controller');
const { buscarProductController, guardarProductController, mokingProductController } = require('../controllers/products.controller');
const { isAuthenticatedAdmin, isAuthenticated } = require('../utils/auth');
const errorHadler = require('../middlewares/index.js');


// Las rutas que requieren autenticación pero no están relacionadas con administradores
router.use(isAuthenticated);

// Rutas públicas
router.get('/mockingproducts', mokingProductController);
router.get('/:pid', buscarProductController);

// Rutas que requieren autenticación de administrador
router.use(isAuthenticatedAdmin);
router.post('/', guardarProductController);
router.delete('/:pid', eliminarProductoController);
router.put('/:pid', actualizarProductController);


// Middleware para manejar errores
router.use(errorHadler)

module.exports = router;




