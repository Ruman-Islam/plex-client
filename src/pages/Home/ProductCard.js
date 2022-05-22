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
        <div md={6} lg={4} className="my-3">
            <div style={background} className="service">
                <div className="main">
                    <h3 className='text-primary text-xl font-bold'>{productName}</h3>
                    <h3 className='text-primary text-xl font-bold'>Price P/U: {productPrice} $</h3>
                    <h3 className='text-primary text-xl font-bold'>Minimum Order: {minimumOrder}</h3>
                    <h3 className='text-primary text-xl font-bold'>Available: {availableQuantity}</h3>
                    <button className="btn button">
                        <Link className="btn__link" to={`/admin/book/${_id}`}>
                            <span className='text-secondary font-bold'>ORDER</span>
                        </Link>
                    </button>
                </div>
                <div className="overlay text-center">
                    <div className="icon mb-2">
                        <img src={Icon} alt="" />
                    </div>
                    <h3>{productName}</h3>
                    <p>{productDesc}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;