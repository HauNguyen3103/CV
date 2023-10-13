import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ProductDetailComponent from './../../components/ProductDetailComponent/index'

const ProductDetailPage = () => {
  const { id } = useParams
  const navigate = useNavigate()

  return (
    <div style={{ background: '#eff0f5', height: '100vh' }}>
      <div style={{ width: '1450px', height: '100%', margin: '0 auto' }}>
        <h5 className='pt-3'>
          <span
            style={{ cursor: 'pointer', fontWeight: 'bold' }}
            onClick={() => {
              navigate('/')
            }}
          >
            Trang chủ
          </span>
          <span
            style={{ cursor: 'pointer', fontWeight: 'bold' }}
            onClick={() => {
              navigate('/type')
            }}
          >
            - Loại Sản Phẩm
          </span>{' '}
          - Chi tiết sản phẩm
        </h5>
        <ProductDetailComponent id Product={id} />
      </div>
    </div>
  )
}

export default ProductDetailPage
