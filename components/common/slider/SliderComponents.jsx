import Slider from 'react-slick'
import style from './style.module.scss'
import classNames from 'classnames'
import { useRef } from 'react'

export default function SliderComponents({
  data,
  color,
  activeIndex,
  setActiveIndex,
}) {
  const sliderRef = useRef(null)

  const images = data[color].img

  const sliderSettings = {
    vertical: true, 
    infinite: true,
    slidesToShow: 6, 
    slidesToScroll: 1,
    beforeChange: (oldIndex, newIndex) => setActiveIndex(newIndex),
    arrows: false, 
  }

  return (
    <div className={style.slider}>
      <div className={style.sliderBlock}>
        <img
          src='/image/ArrowGray.svg'
          className={style.arrow}
          onClick={() => sliderRef.current.slickPrev()}
          alt="Previous"
        />
        <Slider ref={sliderRef} {...sliderSettings} className={style.slider_item}>
          {images.map((item, index) => (
            <img
              src={item}
              alt="Image"
              key={index}
              onClick={() => setActiveIndex(index)}
              className={classNames({ [style.activeImg]: activeIndex === index })}
            />
          ))}
        </Slider>
        <img
          src='/image/ArrowGray.svg'
          className={style.arrow}
          onClick={() => sliderRef.current.slickNext()}
          alt="Next"
        />
      </div>
      <div className={style.activeSlider}>
        {images.map((item, index) =>
          index === activeIndex ? <img src={item} alt="Image" key={index} /> : null
        )}
      </div>
    </div>
  )
}
