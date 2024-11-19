import React from 'react'
import { getImgUrl } from '../../utils/getImgUrl'
import { useParams } from 'react-router-dom'
import { useFetchBookByIdQuery } from '../../redux/feature/books/booksApi';
import { FiShoppingCart } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/feature/cart/cartSlice';
import Loading from '../../components/Loading';

const SingleBook = () => {

    const {id} = useParams();
    const {data: book, isLoading, isError} = useFetchBookByIdQuery(id);

    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }

    if(isLoading) return <Loading />
    if(isError) return <div className='min-h-screen flex items-center justify-center'>Error happenning to load book info</div>

  return (
    <div className='min-h-screen flex items-center justify-center'>
        <div className='max-w-lg shadow-md bg-slate-200 p-5'>
            <h1 className='text-2xl font-bold mb-6'>{book.title}</h1>
            <div>
                <div>
                    <img src={`${getImgUrl(book.coverImage)}`} alt={book.title} className='mb-8 '/>
                </div>
                <div className='mb-8'>
                    <p className='mb-2 text-gray-700'><strong>Author: </strong>{book.author || 'admin'}</p>
                    <p className='mb-4 text-gray-700'><strong>Published: </strong>{new Date(book?.createdAt).toLocaleDateString()}</p>
                    <p className='mb-4 text-gray-700 capitalize'><strong>Category: </strong>{book?.category}</p>
                    <p className='mb-4 text-gray-700'><strong>Description: </strong>{book?.description}</p>
                </div>
                <button onClick={ () => (handleAddToCart(book))}
                    className="btn-primary px-1 flex items-center gap-1 ">
                    <FiShoppingCart className="" />
                    <span>Add to Cart</span> 
                </button>
            </div>
        </div>
    </div>
  )
}

export default SingleBook