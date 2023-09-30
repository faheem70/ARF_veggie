import React, { useEffect, useRef } from 'react'
import bike from "../assest/bike.png"
import HomeCart from '../components/HomeCart'
import { useSelector } from 'react-redux';
import CardFeature from '../components/CardFeature';
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import AllProduct from '../components/AllProduct';
import { useNavigate } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ban from "../assest/banner.png"

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = localStorage.getItem('token');
    if (userInfo) {
      navigate('/');
    }
  }, [navigate])


  const productData = useSelector((state) => state.product.productList);
  const homeProductCartList = productData.slice(1, 5);
  const homeProductCartListVegetables = productData.filter(
    (el) => el.category === "vegetables",
    []
  );
  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);
  const slideProductRef = useRef();
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };
  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };
  const Orderhandle = () => {
    navigate('/menu/646a6c20d2cbd5c7764a20e9');
  }
  return (
    <div className='p-2, md:p-4'>
      <div className='md:flex gap-4 py-2'>
        <div className='md:w-1/2'>
          <div className='flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full'>
            <p className='text-sm text-slate font-medium'>Bike Delivery</p>
            <img src={bike} alt='bike' className='h-7' />
          </div>
          <h2 className='text-4xl md:text-7xl font-bold py-3'>Veggies to <span className='text-green-600 '>doorsteps</span></h2>
          <Box maxW="400px" mx="">
            <Carousel
              showThumbs={false}
              showStatus={false}
              infiniteLoop={true}
              autoPlay={true}
              width="100%"
            >
              <div>
                <img
                  src="https://www.bigbasket.com/media/uploads/p/l/10000349_20-fresho-custard-apple.jpg?tr=w-640,q=80"
                  alt="Image 1"
                />
              </div>
              <div>
                <img
                  src="https://www.bigbasket.com/media/uploads/p/l/40033819_29-fresho-apple-shimla.jpg?tr=w-640,q=80"
                  alt="Image 2"
                />
              </div>
              <div>
                <img
                  src="https://www.bigbasket.com/media/uploads/p/l/10000269_32-fresho-pomegranate.jpg?tr=w-640,q=80"
                  alt="Image 3"
                />
              </div>
              {/* Add more images as needed */}
            </Carousel>
          </Box>
          <button className='bg-green-500 hover:bg-green-700 font-medium rounded-full px-4 py-2' onClick={Orderhandle}>Order Now</button>
        </div>
        <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center">
          {homeProductCartList[0]
            ? homeProductCartList.map((el) => {
              return (
                <HomeCart
                  key={el._id}
                  id={el._id}
                  image={el.image}
                  name={el.name}
                  price={el.price}
                  category={el.category}
                />
              );
            })
            : loadingArray.map((el, index) => {
              return <HomeCart key={index + "loading"} loading={"Loading..."} />;
            })}
        </div>
      </div>

      <div className="">
        <div className="flex w-full items-center">
          <h2 className="font-bold text-2xl text-slate-800 mb-4">
            Fresh Vegetables
          </h2>
          <div className="ml-auto flex gap-4">
            <button
              onClick={preveProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg  p-1 rounded"
            >
              <GrPrevious />
            </button>
            <button
              onClick={nextProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded "
            >
              <GrNext />
            </button>
          </div>
        </div>

        <div
          className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
          ref={slideProductRef}
        >
          {homeProductCartListVegetables[0]
            ? homeProductCartListVegetables.map((el) => {
              return (
                <CardFeature
                  key={el._id + "vegetable"}
                  id={el._id}
                  name={el.name}
                  category={el.category}
                  price={el.price}
                  image={el.image}
                />
              );
            })
            : loadingArrayFeature.map((el, index) => (
              <CardFeature loading="Loading..." key={index + "cartLoading"} />
            ))}
        </div>
      </div>

      <AllProduct heading={"Your Product"} />
      <div class="container-fluid"><img class="style_img__Ig9Nc" src={ban} alt="Banner" /></div>

    </div>

  )
}

export default Home