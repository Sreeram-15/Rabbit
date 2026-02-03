const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../Middleware/AuthMiddleware");
const router = express.Router();

// @route POST /api/products
// @desc Create a new Product
// @access Private/admin

router.post("/", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
    } = req.body;

    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      user: req.user.id, // Reference to Admin user who created it
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

// @route put /api/products/:id
// @desc Update anexisting product Id
// @access Private/admin

router.put("/:id", protect, admin, async (req, res, next) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
    } = req.body;

    // Find product by ID

    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name ?? product.name;
      product.description = description ?? product.description;
      product.price = price ?? product.price;
      product.discountPrice = discountPrice ?? product.discountPrice;
      product.countInStock = countInStock ?? product.countInStock;
      product.sku = sku ?? product.sku;
      product.category = category ?? product.category;
      product.brand = brand ?? product.brand;
      product.sizes = sizes ?? product.sizes;
      product.colors = colors ?? product.colors;
      product.collections = collections ?? product.collections;
      product.material = material ?? product.material;
      product.gender = gender ?? product.gender;
      product.images = images ?? product.images;
      product.isFeatured = isFeatured ?? product.isFeatured;
      product.isPublished = isPublished ?? product.isPublished;
      product.tags = tags ?? product.tags;
      product.dimensions = dimensions ?? product.dimensions;
      product.weight = weight ?? product.weight;

      //   save the Updated product

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({
        message: "product not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Server Error");
  }
});

// @route DELETE /api/products/:id
// @desc Delete a product by ID
// @access Private/Admin

router.delete("/:id", protect, admin, async (req, res, next) => {
  try {
    // Find the product by id
    const product = await Product.findById(req.params.id);

    if (product) {
      // Remove product from the database
      await product.deleteOne();
      return res.status(200).json({ message: "Product Removed" ,id:req.params.id});
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ Message: "Server Error" });
  }
});

// @route GET /api/products
// @route Desc GET all products with optional query filters
// @route public
router.get("/", async (req, res, next) => {
  try {
    const {
      category,
      gender,
      color,
      size,
      material,
      brand,
      minPrice,
      maxPrice,
      sortBy,
      collection,
      limit,
      search,
    } = req.query;

    let query = {};

    // Filter logic

    if (collection && collection.toLocaleLowerCase() !== "all") {
      query.collections = collection;
    }

    if (category) {
      query.category = category;
    }

    if (gender && gender.toLocaleLowerCase() !== "all") {
      query.gender = gender;
      // console.log("Inside gender filter fetch");
    }

    if (size) {
      query.sizes = { $in: size.split(",") };
    }

    if (brand) {
      query.brand = { $in: brand.split(",") };
    }

    if (material) {
      query.material = { $in: material.split(",") };
    }

    if (color) {
      query.colors = { $in: [color] };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) {
        query.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        query.price.$lte = Number(maxPrice);
      }
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Sort by logic
    let sort = {};
    if (sortBy) {
      // console.log("sortBy =", sortBy);
      switch (sortBy) {
        case "priceAsc":
          sort = { price: 1 };
          break;
        case "priceDesc":
          sort = { price: -1 };
          break;
        case "pouplarity":
          sort = { rating: -1 };
          break;
        default:
          break;
      }
    }

    // Fetch products and apply sorting and limit
    // console.log("FINAL QUERY:", JSON.stringify(query, null, 2));
    let products = await Product.find(query)
      .sort(sort)
      .limit(Number(limit) || 0);
    return res.json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
});

// @route GET api/products/similar/:id
// @desc Retrive similar products  based on the current poduct's gender and category
// @public

router.get("/similar/:id", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    const { category, gender, _id } = product;
    const similarProducts = await Product.find({
      category,
      gender,
      _id: { $ne: _id }, // Exclude the current product
    })
      .sort({ rating: -1 })
      .limit(4);
    return res.json(similarProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route GET api/products/best-seller
// desc retrive the product with highest rating
// access Public

router.get("/best-seller", async (req, res) => {
  try {
    const bestSeller = await Product.findOne().sort({ rating: -1 });
    if (bestSeller) {
      return res.json(bestSeller);
    } else {
      return res.status(404).json({ message: "No Best Seller found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
});

// @route GET api/products/new-arrivals
// @desc Retrive latest 8 products - creation Date
// @access public
router.get("/new-arrivals",async (req,res)=>{
  try {
    // const date=new Date();
    const newArrivals=await Product.find().sort({createdAt:-1}).limit(8);
    if(newArrivals){
      return res.json(newArrivals);
    }else{
      return res.status(404).json({message:"Products not found"})
    }
  } catch (error) {
    console.error(error);
    return res.json({message:"Server Error"});
  }
})

// @route GET /api/products/:id
// @desc Get a single product by id
// @access public
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.json(product);
    } else {
      return res.status(404).json("Product not found");
    }
  } catch (error) {
    console.error(error);
    return res.json({ message: "Server error" });
  }
});

module.exports = router;
