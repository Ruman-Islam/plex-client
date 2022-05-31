import { useQuery } from 'react-query';
import fetcher from '../../api/axios';
import Spinner from '../../components/shared/Spinner';
import ProductCard from './ProductCard';

const Products = () => {

  const { data, isLoading } = useQuery('products', async () => {
    const { data } = await fetcher.get('/products')
    return data
  })

  if (isLoading) {
    return <div className='py-44 mx-auto'>
      <Spinner />
    </div>
  }

  return (
    <div className='text-center my-20 2xl:my-28 px-10 xl:px-56'>
      <h1 className='text-4xl xl:text-6xl font-extrabold'>Manufacturing Automation</h1>
      <div>
        <p className='text-sm xl:text-xl leading-none text-slate-500'>
          Rely on the Plex Smart Manufacturing Platform to connect, automate, track,</p>
        <p className='text-sm xl:text-xl leading-none text-slate-500'>and analyze your operations.</p>
      </div>


      <div className='grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-x-6 justify-center items-center 2xl:px-44 justify-items-center'>
        {data.map(product => <ProductCard key={product._id} product={product} />)}
      </div>
    </div>
  );
};

export default Products;