import React, { useState } from 'react'
import style from './style.module.scss'
import SliderComponents from '../common/slider/SliderComponents'
import Colors from '../common/colors/Colors'
import Size from '../common/size/Size'
import Info from '../common/info/Info'
import Basket from '../common/basket/Basket'
export default function HomePage({
  colorChange,
  dimensions,
  products,
  btn,
  addProduct
}) {

  const [activeIndex, setActiveIndex] = useState(0)
  const [color, setColor] = useState(0)
  const [size, setSize] = useState(dimensions.size[0])


  const product = {
    img: products[color].img[0],
    name: products[color].name,
    size: size.item || size,
    article: `${products[color].article.children}${!size.item ? size.split('-').join('') : size.item.split('-').join('')}`,
    price: Number(products[color].price),
    qty: 1 
  }

  return (
    <div className={style.sliderSection}>
      {products && <SliderComponents data={products} color={color} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />}

      <div className={style.sliderInfoSide}>
        <h1 className={style.sliderInfoSide_name}>{products[color].name}</h1>
        <div className={style.article}>
          <p className={style.article_title}>{products[color].article.label}</p>
          <span>{products[color].article.children}{!size.item ? size.split('-') : size.item.split('-')}</span>
        </div>
        <div className={style.price}>
          <p>{products[color].price} грн</p>
        </div>

        {colorChange && <Colors data={colorChange} color={color} setColor={setColor}/>}

        {dimensions &&  <Size data={dimensions} size={size} setSize={setSize}/>}

        <button onClick={() => addProduct(product)} className={style.btn}>{btn}</button>

        {products[color] && <Info data={products[color]}/>}
      </div>
    </div>
  )
}
