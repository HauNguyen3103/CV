import React, { useState } from 'react'
import TypeProduct from '../../components/TypeProduct'
import SliderComponent from '../../components/SliderComponent'
import CardComponent from '../../components/CardComponent'
import { useAuth } from "../../context/AuthContext"


const HomePage = () => {
  const arr = ['Categories ( Televisions | Laptops | Watches )'];
  const [auth, setAuth] = useAuth();
  return (
    <div
      style={{ height: '100%', padding: '25px 110px', backgroundColor: '#eff0f5'}}
    >
    {/* <pre>{JSON.stringify(auth,null, 4)}</pre> */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'start',
          gap: '10px',
        }}
      >
        {arr.map(item => {
          return <TypeProduct name={item} key={item} />
        })}
      </div>
      <div className='d-flex align-items-center gap-1'>
        <SliderComponent />
        <img
          src='https://lzd-img-global.slatic.net/g/icms/images/ims-web/54bdd7a5-1640-4c8f-b868-011d84774f4c.jpg_2200x2200q90.jpg_.webp'
          alt=''
          className='w-25 img-fluid ' 
          style={{ height: '380px', objectFit: "fill" }}
        />
      </div>
    
    
    <CardComponent></CardComponent>
 
    </div>
  )
}

export default HomePage
