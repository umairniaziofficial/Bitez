import mongoose from "mongoose";

interface IProduct {
    _id: mongoose.ObjectId;
    name: string;
    description: string;
    price: number;
    category: string;
    ImgUrl: string;
}

const ProductSchema = new mongoose.Schema<IProduct>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    ImgUrl: { type: String, required: true },
}, { timestamps: true });

const ProductModel = mongoose.model<IProduct>("Product", ProductSchema);

export default ProductModel;