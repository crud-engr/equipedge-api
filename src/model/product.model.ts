import mongoose from 'mongoose';

import { IProduct } from '../interface/product.interface';

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        quantityStock: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        manufacturerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Manufacturer'
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

ProductSchema.pre(/^find/, function (next: any) {
    this.populate({
        path: 'manufacturerId',
        select: '-email -phone -role -level -isVerified -isDeleted',
    });
    next();
});

const Product = mongoose.model<IProduct>('product', ProductSchema);

export default Product;
