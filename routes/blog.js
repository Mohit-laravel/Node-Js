const {Router} = require("express");
const router = Router();
const multer = require("multer");
const path = require("path");
const CategoriesController = require('../controllers/categoriesController');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.resolve(`./public/uploads/`));
//     },
//     filename: function (req, file, cb) {
//       const fileName = `${Date.now()}-${file.originalname}`
//       cb(null, fileName);
//     }
//   })
// const upload = multer({ storage: storage })

// router.get('/add-new', async (req, res) => {
//     res.render('addBlog', {user: req.user});
// })

// router.post("/", upload.single("coverImage"), async (req, res) => {
//   const { title, body } = req.body;
//   const blog = await Blog.create({
//     body,
//     title,
//     createdBy: req.user.id,
//     coverImageURL: `/uploads/${req.file.filename}`,
//   });
//   return res.redirect(`/blog/${blog._id}`);
// });


router.get('/categories/home-appliances', CategoriesController.getHomeAppliances);
router.get('/categories/electronics', CategoriesController.getElectronicItems);
router.get('/categories/clothing', CategoriesController.getClothingItems);
router.get('/categories/accessories', CategoriesController.getAccessoriesItems);
router.get('/product/checkout/product', CategoriesController.checkout);
router.get('/product/:category/:id' , CategoriesController.getCategoryById);


module.exports = router