import QueryBuilder from "../../builder/QueryBuilder";
import { TProduct } from "./products.interface";
import Product from "./products.model";

// Create a Medicine
const createProduct = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

// Get all Products
const getAllProducts = async (query: Record<string, unknown>) => {
  const ProductQuery = new QueryBuilder(Product.find(), query)
    .search(["name", "symptoms", "features"])
    .fields()
    .filter()
    .paginate()
    .priceRange()
    .sort()
    .prescriptionFilter();
  const result = await ProductQuery.queryModel;
  const meta = await ProductQuery.countTotal();
  return { result, meta };
};

// Get a Product by ID
const getProductById = async (productId: string) => {
  const result = await Product.findById(productId);

  return result;
};

// Update a Product
const updateProduct = async (productId: string, updates: Partial<TProduct>) => {
  const updatedProduct = await Product.findByIdAndUpdate(productId, updates, { new: true });
  return updatedProduct;
};

// Delete a Product
const deleteProduct = async (productId: string) => {
  const deletedProduct = await Product.findByIdAndDelete(productId);
  return deletedProduct;
};

export const ProductService = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
