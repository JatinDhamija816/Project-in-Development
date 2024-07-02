import React from 'react'
import { FaEarthAsia } from "react-icons/fa6";
import { CiShop } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";

const Two = () => {
    const datas = [
        {
            heading: '1000+ cities',
            text: 'in India',
            icons: <FaEarthAsia />
        },
        {
            heading: '3 lakh+',
            text: 'restaurant listings',
            icons: <CiShop />
        },
        {
            heading: '5.0 crore+',
            text: 'monthly orders',
            icons: <SlCalender />
        },
    ]
    return (
        <div className='my-10 bg-white drop-shadow-lg'>
            <div className='max-w-screen-lg mx-auto py-10'>
                <h1 className='text-center text-4xl mb-5'>Why should you partner with Zomato?</h1>
                <p className='text-center text-gray-400 text-xl tracking-wider mb-5'>Zomato enables you to get 60% more revenue, 10x new customers and boost your brand visibility by providing insights to improve your business.</p>
                <ul className='flex justify-between mt-10 py-10 rounded-xl'>
                    {
                        datas.map((data) => (
                            <li className='bg-white drop-shadow-lg rounded px-10 py-5 flex justify-evenly items-center'>
                                <p className='text-2xl text-blue-500 mr-5'>{data.icons}</p>
                                <div className=''>
                                    <p className='text-blue-500 text-2xl'>{data.heading}</p>
                                    <p className='text-gray-400 text-xl'>{data.text}</p>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Two