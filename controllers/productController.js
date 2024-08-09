import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

export const createProduct = asyncHandler(async (req, res) => {
  const newProduct = await Product.create(req.body);

  return res.status(201).json({
    message: "Data created successfully!",
    data: newProduct,
  });
});

export const allProduct = asyncHandler(async (req, res) => {
  // Menyalin query parameters dari request
  const queryObj = { ...req.query };

  // Mendefinisikan field yang harus dihapus dari query parameters
  const excludeFields = ["page", "limit", "name"];
  excludeFields.forEach((element) => delete queryObj[element]);

  // Inisialisasi variabel query
  let query;

  // Jika ada parameter nama dalam query, tambahkan regex pencarian ke query
  if (req.query.name) {
    query = Product.find({
      name: { $regex: req.query.name, $options: "i" }, // $options: "i" untuk case-insensitive
    });
  } else {
    // Jika tidak ada parameter nama, gunakan queryObj untuk mencari produk
    query = Product.find(queryObj);
  }

  // Pagination: menentukan halaman, batas data per halaman, dan data yang dilewati
  const page = req.query.page * 1 || 1;
  const limitData = req.query.limit * 1 || 30;
  const skipData = (page - 1) * limitData;

  // Menambahkan pagination ke query
  query = query.skip(skipData).limit(limitData);

  // Mendapatkan jumlah total dokumen produk
  const countProduct = await Product.countDocuments();

  // Mengecek jika halaman yang diminta melebihi jumlah produk yang tersedia
  if (req.query.page) {
    if (skipData >= countProduct) {
      res.status(404);
      throw new Error(`This page doesn't exist`);
    }
  }

  // Menjalankan query dan mendapatkan data produk
  const data = await query;

  // Mengembalikan respon sukses dengan data produk dan jumlah total produk
  return res.status(200).json({
    data,
    count: countProduct,
  });
});

export const detailProduct = asyncHandler(async (req, res) => {
  const paramsId = req.params.id;
  const detailProduct = await Product.findById(paramsId);

  if (detailProduct) {
    return res.status(200).json({
      data: detailProduct,
    });
  } else {
    res.status(404);
    throw new Error("Data not found!");
  }
});

export const updateProduct = asyncHandler(async (req, res) => {
  const paramsId = req.params.id;
  const updateProduct = await Product.findByIdAndUpdate(paramsId, req.body, {
    runValidators: false,
    new: true,
  });
  return res.status(201).json({
    message: `Product updated successfully`,
    data: updateProduct,
  });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const paramsId = req.params.id;
  await Product.findByIdAndDelete(paramsId);

  return res.status(200).json({
    message: "Data deleted successfully",
  });
});

export const fileUploadProduct = asyncHandler(async (req, res) => {
  const file = req.file;
  if (!file) {
    res.status(400);
    throw new Error(`No file selected. Please choose a file to upload.`);
  }

  const imageFileName = file.filename;
  const pathImageFile = `/uploads/${imageFileName}`;

  res.status(200).json({
    message: "Success! Your file has been uploaded.",
    image: pathImageFile,
  });
});
