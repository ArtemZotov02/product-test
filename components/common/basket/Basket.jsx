import React, { useEffect, useState } from 'react'
import style from './style.module.scss'

export default function Basket({
  forwardRef,
  data,
  setBasket,
  openBasket,
  setOpenBasket
}) {
  const [totalBasket, setTotalBasket] = useState(data)
  const [totalPrice, setTotalPrice] = useState(0)

  const handleChangeItem = (article, qty) => {
    const newArray = [...totalBasket]
    const index = newArray.findIndex(({ article: itemArticle }) => itemArticle === article)

    if (index !== -1) {
      newArray.splice(index, 1, {
        ...newArray[index], qty
      })
    }
    setBasket(newArray)
  }

  const handleRemoveItem = (article) => {
    const newArray = [...totalBasket]
    const index = newArray.findIndex(({ article: itemArticle }) => itemArticle === article)

    if (index !== -1) {
      newArray.splice(index, 1)
    }
    setBasket(newArray)
  }

  const renderItems = ({
    img,
    name,
    size,
    article,
    price,
    qty
  }) => (
    <div key={article} className={style.basketRow_item}>
      <img src='/image/close.svg' alt='Delete' className={style.close} onClick={() => handleRemoveItem(article)} />
      <div className={style.product}>
        <img src={img} alt="Product" className={style.product_img} />
        <div className={style.product_info}>
          <p className={style.product_info__name}>{name}</p>
          <div className={style.product_info__descr}>
            <span>Розмір: {size}</span>
            <span>{article}</span>
          </div>
          <p className={style.product_info__price}>{price} грн.</p>

          <div className={style.quantity}>
            <div className={style.quantityBlock}>
              <p className={style.quantityBlock__btn} onClick={() => qty > 1 && handleChangeItem(article, qty - 1)}>-</p>
              <input className={style.quantityBlock__input} type="number" name="quantity" value={qty} readOnly />
              <p className={style.quantityBlock__btn} onClick={() => handleChangeItem(article, qty + 1)}>+</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  useEffect(() => {
    const total = data.reduce((acc, item) => acc + (item.price * item.qty), 0)

    setTotalPrice(total)
    setTotalBasket(data)

  }, [data])

  return (
    <div className={style.shop} ref={forwardRef}>
      <div className={style.img}>
        <img src='/image/shop.svg' onClick={() => setOpenBasket(!openBasket)} />
        <p>{totalBasket.length}</p>
      </div>

      {openBasket && (
        <div className={style.basket} ref={forwardRef}>
          <div className={style.basket_title}>
            <p>Кошик ({totalBasket.length})</p>
            <img src='/image/close.svg' alt='Close' onClick={() => setOpenBasket(false)} />
          </div>

          <div className={style.basketSection}>
            {!!totalBasket.length && (
              <div className={style.basketRow}>
                {totalBasket.map(renderItems)}
              </div>
            )}

            {!totalBasket.length && <p className={style.empty}>Ваш кошик порожній!</p>}
          </div>
          {!!totalBasket.length && (
            <div className={style.orderBasket}>
              <p className={style.orderBasket_total}>Разом: <span>{totalPrice} грн.</span></p>
              <button className={style.orderBasket_order}>Оформити замовлення</button>
              <button className={style.orderBasket_back} onClick={() => setOpenBasket(false)}>Продовжити покупки</button>
            </div>

          )}
        </div>
      )}
    </div>
  )
}
