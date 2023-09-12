
import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setDataProduct } from './redux/productSlice';
import { ChakraProvider } from '@chakra-ui/react'
import Footer from './components/Footer';
function App() {

  const dispatch = useDispatch()
  const productData = useSelector((state) => state.product)

  useEffect(() => {
    (async () => {
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/product`)
      const resData = await res.json()
      //console.log(resData);
      dispatch(setDataProduct(resData))
    })()
  }, [])
  return (
    <>
      <ChakraProvider>
      <Toaster />
      <div>
        <Header />
        <main className="pt-16 bg-slate-100 min-h-[calc(100vh)]">
          <Outlet />
        </main>
    </div>
        <Footer />
      </ChakraProvider>
    </>
  );
}

export default App;
