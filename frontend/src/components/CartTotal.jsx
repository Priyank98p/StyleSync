import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const CartTotal = () => {
    const {currency, getCartAmount, delivery_fee} = useContext(ShopContext)
  return (
    <div className='border border-gray-300 rounded-2xl p-4 mt-3'>
        
            <h2 className='text-2xl font-bold'>Order Summary</h2>
            <div className='flex justify-between items-center'>
                <p>Subtotal</p>
                <p>{currency} {getCartAmount()}.00</p>
            </div>
            <div className='flex justify-between items-center'>
                <p>Shipping fee</p>
                <p>{currency} {delivery_fee}.00</p>
            </div>
            <hr className='border-gray-300 my-4'/>
            <div className='flex justify-between items-center'>
                <b>Total</b>
                <b>{currency}{getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee }.00</b>

            </div>
        

    </div>
  )
}

export default CartTotal