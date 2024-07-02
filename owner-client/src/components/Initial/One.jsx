import React from 'react'
import first from '../../assets/IntialHome/first.webp'
import { FaCheck } from "react-icons/fa";

const One = () => {
    const documents = [
        'FSSAI license copy',
        'PAN card copy',
        'Regular GSTIN',
        'BANK account details',
        'Your restaurant menu',
        'Dish images for top 5 items'
    ]

    return (
        <div className='min-h-screen flex flex-col'>
            <div className="relative h-2/3 w-full bg-cover bg-center flex flex-col justify-between text-white"
                style={{ backgroundImage: `url(${first})` }}>
                <div className='flex justify-between items-center px-10 py-3'>
                    <div>
                        <h1 className='font-extrabold text-2xl italic'>Zomato</h1>
                        <p className='font-bold italic'>for business</p>
                    </div>
                    <div className='flex'>
                        <p className='py-1 font-light text-lg'>Advertise</p>
                        <button className='border px-5 py-1 rounded-md ml-5'>Login</button>
                    </div>
                </div>

                <div className='max-w-screen-lg mx-auto mb-10'>
                    <div className='my-5'>
                        <p className='text-4xl'>Partner with Zomato</p>
                        <p className='text-3xl'>at 0% commission for the 1st month!</p>
                    </div>
                    <div className='my-5'>
                        <p>And get ads worth INR 1500. Valid for new restaurant partner in select calls</p>
                    </div>
                    <div className='mt-5'>
                        <button className='bg-blue-500 rounded-md py-2 text-xl px-5 hover:drop-shadow-xl'>Register your restaurant</button>
                        <button className='text-black bg-slate-200 ml-5 px-5 rounded-md py-2 text-xl hover:drop-shadow-xl'>Login to view your existing restaurants</button>
                    </div>
                    <div className='my-3'>
                        <p>Need help? Contact +91 1234567890</p>
                    </div>
                </div>
            </div>

            <div className='flex-1 max-w-screen-lg mx-auto bg-white text-black drop-shadow-2xl shadow-slate-600 rounded-lg mt-10'>
                <div className='pt-8'>
                    <h1 className='text-center text-3xl'>Get started with online ordering</h1>
                    <p className='text-center text-lg text-gray-500'>Please keep the document ready for a smooth signup</p>
                </div>
                <div className='w-5/6 mx-auto py-10'>
                    <ul className='flex flex-wrap'>
                        {documents.map((document, index) => (
                            <li key={index} className='w-1/2 p-3 flex text-xl items-center'>
                                <FaCheck className='bg-green-600 text-white rounded-full text-xl p-1 mx-2' />
                                {document}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default One
