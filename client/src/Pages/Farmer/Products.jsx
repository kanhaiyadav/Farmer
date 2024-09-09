import { useState } from 'react';
import ProductModalForm from "../../componenets/ProductModalForm";
import ProductCard from "./ProductCard"
// import { products } from "./data"
import Header from "../../componenets/DashboardHeader"
import { IoMdAdd } from "react-icons/io";
import { AnimatePresence } from "framer-motion";
import { useSelector, useDispatch,  } from 'react-redux';
import { selectProducts } from '../../redux/product/product.selector';

const Products = () => {
    const [clicked, setClicked] = useState(false);
    const products = useSelector(selectProducts);
    return (
        <>
            <div className={`flex-1 flex flex-col `}>
                <Header title={'Products'} />
                <main className={`flex-1 ${products.length > 0 ? 'columns-1 sm:columns-2 md:columns-3 lg:columns-4' : 'flex items-center justify-center'} overflow-auto p-4 gap-4 space-y-6`}>
                    {
                        products.length > 0?
                        products.map((product, index) => <ProductCard key={index} product={product} />)
                            : 
                        <div className='w-full h-full flex flex-col items-center justify-center mt-[-200px] relative'>
                                <img src="/no_data.png" alt="" className='w-[300px] h-[300px]' />
                                <p className='text-[#a2a2a2] text-md  mt-[-50px]'>You have not added any products yet</p>
                                <p className='text-[#a2a2a2] text-lg font-semibold '>Click on the '+' button to add a new product</p>
                                <img src="/arrow.svg" alt="" className='w-[300px] h-[300px] absolute bottom-[-70px] right-[100px] rotate-[-15deg]'/>
                                {/* <img src="/arrow.svg" alt="" /> */}
                        </div>
                    }
                </main>
                <div className={`h-[60px] w-[60px] absolute right-[42px] bottom-[42px] rounded-full bg-secondary animate-ping`} />
                <div className={`h-[80px] w-[80px] absolute right-8 bottom-8 text-6xl flex 
            items-center justify-center rounded-full bg-secondary text-white hover:bg-orange-500 hover:rotate-90 transition-all
            `}
                    onClick={() => setClicked(true)}
                >
                    <IoMdAdd />
                </div>
            </div>
            <AnimatePresence>
                {clicked && (
                    <ProductModalForm
                        key="modal" // Optional: Add a unique key if needed
                        product={{ name: '', price: '', image: '', stocks: '' }}
                        close={() => setClicked(false)}
                        type={'create'}
                    />
                )}
            </AnimatePresence>
        </>
    )
}

export default Products