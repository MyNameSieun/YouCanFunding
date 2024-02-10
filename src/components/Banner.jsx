import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const BannerContainer = styled.div`
  & img {
    height: 550px;
    background-size: 100%;
    background-repeat: no-repeat;
    margin-left: 50px;
  }

  .swiper-button-prev,
  .swiper-button-next {
    color: var(--main-color);
  }

  /* .swiper-button-prev:hover,
  .swiper-button-next:hover {
    color: #000000;
  } */
`;

SwiperCore.use([Navigation, Pagination, Autoplay]);

function Banner() {
  return (
    <BannerContainer>
      <Swiper
        className="banner"
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        speed={1000}
      >
        <SwiperSlide>
          <img src="assets/images/banner/banner01.png" alt="Banner 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="assets/images/banner/banner02.png" alt="Banner 2" />
        </SwiperSlide>
      </Swiper>
    </BannerContainer>
  );
}

export default Banner;
