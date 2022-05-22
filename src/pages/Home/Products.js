import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('fakedata.json')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])
  return (
    <div className='text-center my-28 px-10 xl:px-56'>
      <h1 className='text-6xl font-extrabold'>Manufacturing Automation</h1>
      <div>
        <p className='text-xl leading-none text-slate-500'>
          Rely on the Plex Smart Manufacturing Platform to connect, automate, track,</p>
        <p className='text-xl leading-none text-slate-500'>and analyze your operations.</p>
      </div>

      <div className='grid grid-cols-3 gap-x-6 justify-center items-center xl:px-44 justify-items-center'>
        {products.map(product => <ProductCard product={product} />)}
      </div>

    </div>
  );
};

export default Products;