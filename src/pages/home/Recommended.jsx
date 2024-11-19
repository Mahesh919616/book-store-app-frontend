import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import BookCard from '../books/BookCard';
import { useFetchAllBooksQuery } from '../../redux/feature/books/booksApi';
import Loading from '../../components/Loading';

const Recommended = () => {

    // const [books, setBooks] = useState([]);

    // useEffect(() => {
    //     fetch('books.json')
    //     .then((res) => res.json())
    //     .then((data) => setBooks(data))
    // } , [])

    const {data: books = [], isLoading} = useFetchAllBooksQuery();

    if(isLoading) return <Loading />

  return (
    <div className='py-16'>
        <h1 className='text-3xl font-semibold mb-12'>Recommended for you</h1>
        <Swiper
            slidesPerView={1}
            spaceBetween={30}
            navigation={true}
            breakpoints={{
            640: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 40,
            },
            1180: {
                slidesPerView: 3,
                spaceBetween: 50,
            },
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper">
                {
                    books.length > 0 && books.slice(8, 18).map((book, index) => 
                        <SwiperSlide key={index}>
                            <BookCard book={book} />
                        </SwiperSlide>
                    )
                }
        </Swiper>
    </div>
  )
}

export default Recommended