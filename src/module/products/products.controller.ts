import catchAsYnc from "../../utilits/catchAsync";
import { ProductService } from "./products.service";

// Create a Product
const createProduct = catchAsYnc(async (req, res) => {
  const product = req.body;
  const result = await ProductService.createProduct(product);
  res.status(201).json({
    message: "Product created successfully",
    success: true,
    data: result,
  });
});

// Get all Product
const getAllProducts = catchAsYnc(async (req, res) => {
  const query = req.query;

  const Products = await ProductService.getAllProducts(query);
  res.status(200).json({
    message: "Products retrieved successfully",
    success: true,
    data: Products,
  });
});

// Get a Product by ID
const getProductById = catchAsYnc(async (req, res) => {
  const { productId } = req.params;
  const Product = await ProductService.getProductById(productId);
  if (!Product) {
    res.status(404).json({ message: "Product not found", success: false });
  }

  res
    .status(200)
    .json({ message: "Product retrieved successfully", success: true, data: Product });
});

// Update a Medicine
const updateProduct = catchAsYnc(async (req, res) => {
  const productId = req.params.productId;
  const updates = req.body;
  const updatedProduct = await ProductService.updateProduct(productId, updates);
  if (updatedProduct) {
    res.status(200).json({
      message: "Product updated successfully",
      success: true,
      data: updatedProduct,
    });
  } else {
    res.status(404).json({
      message: "Product not found",
      success: false,
    });
  }
});

// Delete a Product
const deleteProduct = catchAsYnc(async (req, res) => {
  const productId = req.params.productId;
  const deletedProduct = await ProductService.deleteProduct(productId);
  if (deletedProduct) {
    res.status(200).json({
      message: "Product deleted successfully",
      success: true,
      data: deletedProduct,
    });
  } else {
    res.status(404).json({
      message: "Product not found",
      success: false,
      data: null,
    });
  }
});

// Export the Medicine controller
export const productController = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
