import Carousel from 'react-bootstrap/Carousel';
import './style.css'
// import ExampleCarouselImage from 'components/ExampleCarouselImage';

function SliderComponent() {
  return (
    <Carousel className='d-flex align-items-center justify-content-center w-75'>
      <Carousel.Item className='text-bg-primary' interval={1500} >
      <img
          className="w-100 h-75 "
          src="https://lzd-img-global.slatic.net/g/icms/images/ims-web/8b253240-989f-45e2-8c72-1a69aac12aef.jpg_2200x2200q90.jpg_.webp"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item  interval={1500}>
      <img
          className="w-100 h-75"
          src="https://icms-image.slatic.net/images/ims-web/d2c830e8-03cf-49a6-9267-3c2853b99a13.jpg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item interval={1500} >
      <img
          className="w-100 h-75"
          src="https://lzd-img-global.slatic.net/g/icms/images/ims-web/e52e0db2-319b-46b5-9466-074ee2c625c9.jpg_2200x2200q90.jpg_.webp"
          alt="First slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default SliderComponent;