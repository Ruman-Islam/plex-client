import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../assets/images/machine.png';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { _id, productName, productPrice, productImage, productDesc, minimumOrder, availableQuantity } = product;
    const background = {
        background: `url(${productImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        borderRadius: '5px',
    };
    return (
        <>
            <div className="my-3">
                <div style={background} className="product">
                    <div className="main">
                        <h3 className='text-base-100 text-lg italic font-bold'>{productName.slice(0, 15)}...</h3>
                        <h3 className='text-base-100 text-lg italic font-bold'>Price P/U: {productPrice} $</h3>
                        <h3 className='text-base-100 text-lg italic font-bold'>Minimum Order: {minimumOrder}</h3>
                        <h3 className='text-base-100 text-lg italic font-bold'>Available: {availableQuantity}</h3>
                        <Link
                            to={`/product-details/${_id}`}
                            className="btn btn-primary px-12 rounded">
                            <span className='text-base-100 text-lg font-semibold'>DETAIL</span>
                        </Link>
                    </div>
                    <div className="overlay text-center overflow-hidden">
                        <div className="icon mb-2">
                            <img src={Icon} alt="" />
                        </div>
                        <h3>{productName.slice(0, 15)}</h3>
                        <p>{productDesc.slice(0, 100)}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductCard;