const router = require("express").Router();
const crypto = require("crypto");
const { db } = require("../db/db");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../auth/auth");
const multer = require("multer");
const path = require("path");
const adminAuth = require("../auth/adminAuth");

const storage = multer.diskStorage({
  destination: "./web-server/web-folder/public/webStorage/product",
  filename: function (req, file, cb) {
    cb(null, "product" + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
});

// Create a product
router.post(
  "/product",
  upload.single("upload"),
  adminAuth,
  async (req, res) => {
    try {
      async function QUERY(val) {
        return new Promise((resolve, reject) => {
          let sql = val;
          db.query(sql, (error, result) => {
            if (error) {
              return console.log(error);
            }
            resolve(result);
          });
        });
      }

      let category = await QUERY(
        `SELECT * FROM categories WHERE _id='${req.body.category_id}'`
      );

      if (category.length < 1)
        return res.status(400).send({
          message: "Category does not exist ",
        });

      const product = {
        _id: crypto.randomBytes(16).toString("hex"),
        category_id: req.body.category_id,
        name: req.body.name,
        description: req.body.description,
        status: req.body.status,
        createdAt: new Date().toISOString(),
        image: req.file.filename,
        price: req.body.price,
      };

      let sql = `INSERT INTO products SET ?`;
      db.query(sql, product, (error) => {
        if (error) return console.log(error);
      });

      res.status(200).send({
        message: "Product created successfully",
        product,
      });
    } catch (error) {
      res.send(error);
      console.log(error);
    }
  }
);

// Fetch a product by ID
router.get("/product/:_id", async (req, res) => {
  try {
    async function QUERY(val) {
      return new Promise((resolve, reject) => {
        let sql = val;
        db.query(sql, (error, result) => {
          if (error) {
            return console.log(error);
          }
          resolve(result);
        });
      });
    }

    let [product] = await QUERY(
      `SELECT * FROM products WHERE _id='${req.params._id}'`
    );
    console.log(product);
    if (!product) {
      return res.status(400).send({
        message: "No product found",
      });
    }

    res.status(200).send(product);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

router.get("/product_by_category/:_id", async (req, res) => {
  try {
    async function QUERY(val) {
      return new Promise((resolve, reject) => {
        let sql = val;
        db.query(sql, (error, result) => {
          if (error) {
            return console.log(error);
          }
          resolve(result);
        });
      });
    }

    let product = await QUERY(
      `SELECT * FROM products WHERE category_id='${req.params._id}' ORDER BY id DESC`
    );

    if(req.params._id === "all"){
             let product_ = await QUERY(
        `SELECT * FROM products ORDER BY id DESC`
      );
      res.status(200).send(product_);

      return
    }
    if (!product) {
      return res.status(400).send({
        message: "No product found",
      });
    }

    res.status(200).send(product);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

// Fetch all product
router.get("/products", async (req, res) => {
  try {
    async function QUERY(val) {
      return new Promise((resolve, reject) => {
        let sql = val;
        db.query(sql, (error, result) => {
          if (error) {
            return console.log(error);
          }
          resolve(result);
        });
      });
    }

    const ProductWithCateoryName = async () => {
      let product = await QUERY(`SELECT * FROM products ORDER BY id DESC`);
      const mergedProductWithCategory = product.map(async (item) => {
        let [category] = await QUERY(
          `SELECT * FROM categories WHERE _id='${item.category_id_}'`
        );

        let pro_name = item.name
        pro_name = pro_name.replace(/\?\?/g, "");
        item.name = pro_name
        if(!category) return 
        item.category = "ddsds" 
      });
      await Promise.all(mergedProductWithCategory);
      return product;
    };

    let newProduct = await ProductWithCateoryName();

    res.status(200).send(newProduct);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

// Delete a  product
router.delete("/product/:id", adminAuth, async (req, res) => {
  try {
    async function QUERY(val) {
      return new Promise((resolve, reject) => {
        let sql = val;
        db.query(sql, (error, result) => {
          if (error) {
            return console.log(error);
          }
          resolve(result);
        });
      });
    }

    let product = await QUERY(
      `SELECT * FROM products WHERE _id='${req.params.id}'`
    );

    if (product.length < 1)
      return res.status(400).send({
        message: "Product does not exist",
      });

    db.query(
      `DELETE FROM products WHERE _id='${req.params.id}'`,
      (error, result) => {
        if (error) {
          return console.log(error);
        }
      }
    );

    res.status(200).send({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});
module.exports = router;
