import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import auth from '../../../firebase/firebaseConfig';
import Spinner from '../../../components/shared/Spinner';
import { message } from 'antd';
import fetcher from '../../../api/axios';
import axios from 'axios';


const AddProduct = () => {
    const imageStorageKey = '4ae31085e7494be569a28241773ffa30';
    const [user, , error] = useAuthState(auth);
    const [loading, setLoading] = useState(false);
    const [imageURL, setImageURL] = useState({});
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async product => {
        setLoading(true);
        const formData = new FormData();
        formData.append('image', imageURL);

        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`
        if (imageURL.name) {
            const result = await axios.post(url, formData)
            if (result.data.success) {
                let productInfo = {
                    productName: product.productName,
                    productPrice: product.price,
                    availableQuantity: product.availableQuantity,
                    discount: product.discount,
                    rating: product.rating,
                    tags: product.tags,
                    productImage: result.data.data.url,
                    minimumOrder: product.minimumOrder,
                    productDesc: product.productDesc
                }
                const { data } = await fetcher.post(`/add-product?email=${user.email}`, productInfo)
                if (data.success) {
                    setLoading(false);
                    message.success('Information updated!');
                    reset();
                }
            }
        }
    };

    if (loading) {
        return (
            <div className='flex justify-center items-center h-[90vh]'><Spinner /></div>
        )
    }
    if (error) {
        message.success(error);
    }

    return (
        <div className='xl:w-8/12 mx-auto border p-2'>
            <h1 className='text-2xl mb-5'>Add Product</h1>
            <form className='flex flex-col p-5 rounded-lg' onSubmit={handleSubmit(onSubmit)}>
                <div className='flex justify-start flex-col xl:flex-row'>
                    <div className='w-11/12'>
                        <div>
                            <label htmlFor="product-name">Product Name</label>
                            <input
                                className='outline-0 w-full rounded-2xl border px-3 py-1 border-[#1890ff] my-1'
                                placeholder='Product name'
                                name="product-name" id='product-name' type="text" {...register("productName")} />
                        </div>

                        <div className='mt-5'>
                            <label htmlFor="price">Price</label>
                            <input
                                className='outline-0 w-full
                             rounded-2xl border px-3 mr-10 py-1 border-[#1890ff] my-1'
                                placeholder='Add price'
                                name="price" id='price' type="text" {...register("price")} />
                        </div>

                        <div className='mt-5'>
                            <label htmlFor="rating">Rating</label>
                            <input
                                className='outline-0 w-full rounded-2xl border px-3 py-1 border-[#1890ff] my-1'
                                name="rating" id='rating' type="text"
                                {...register("rating")} />
                        </div>

                        <div className='mt-5'>
                            <label htmlFor="availableQuantity">Quantity</label>
                            <input
                                className='outline-0 w-full rounded-2xl border px-3 py-1 border-[#1890ff] my-1'
                                name="availableQuantity" id='availableQuantity' type="text"
                                {...register("availableQuantity")} />
                        </div>

                        <div className='mt-5'>
                            <label htmlFor="minimumOrder">Minimum Order</label>
                            <input
                                className='outline-0 w-full rounded-2xl border px-3 py-1 border-[#1890ff] my-1'
                                name="minimumOrder" id='minimumOrder' type="text"
                                {...register("minimumOrder")} />
                        </div>

                        <div className='mt-5'>
                            <label htmlFor="tags">Color</label>
                            <select
                                className='outline-0 w-full rounded-2xl border px-3 py-1 border-[#1890ff] my-1'
                                name="tags" id="tags"
                                {...register("tags")}>
                                <option value="Black">Black</option>
                                <option value="Blue">Blue</option>
                                <option value="Yellow">Yellow</option>
                                <option value="Green">Green</option>
                                <option value="Red">Red</option>
                                <option value="Gray">Gray</option>
                                <option value="Pink">Pink</option>
                            </select>
                        </div>

                        <div className='mt-5'>
                            <label htmlFor="discount">Discount%</label>
                            <select
                                className='outline-0 w-full rounded-2xl border px-3 py-1 border-[#1890ff] my-1'
                                name="discount" id="discount"
                                {...register("discount")}>
                                <option value="10">10%</option>
                                <option value="20">20%</option>
                                <option value="30">30%</option>
                                <option value="40">40%</option>
                                <option value="50">50%</option>
                            </select>
                        </div>

                        <div className='mt-5'>
                            <textarea
                                {...register("productDesc")}
                                className='outline-0 w-full rounded-2xl border px-3 py-1 border-[#1890ff] my-1'
                                name="productDesc" id="productDesc" cols="30" rows="10" />
                        </div>

                        <div className='mt-5'>
                            <input
                                className='mt-5'
                                onChange={(e) => setImageURL(e.target.files[0])}
                                type="file" name="image" id="" />
                        </div>

                        <div className='text-right'>
                            <input type="submit" value="Add to Database"
                                className='btn w-44 my-3 cursor-pointer hover:bg-sky-400 bg-[#1890ff] rounded-3xl text-base-100' />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;