import React, { useState } from 'react'
import style from './style.module.scss'
import classNames from 'classnames'
export default function Info({
  data
}) {
  const [openDescription, setOpenDescription] = useState(false)
  const [openDetails, setOpenDetails] = useState(false)
  return (
    <div className={style.info}>
      <div className={style.info_block}>
        <p
          className={classNames(style.info_block__title, { [style.activeDescr]: openDescription })}
          onClick={() => setOpenDescription(!openDescription)}
        >
          {data.description.lable}
        </p>
        {openDescription && <span className={style.info_block__subtitle} >{data.description.children}</span>}
      </div>
      <div className={style.info_block}>
        <p
          className={classNames(style.info_block__title, { [style.activeDescr]: openDetails })}
          onClick={() => setOpenDetails(!openDetails)}
        >
          {data.productDetails.label}
        </p>
        {openDetails && (
          <ul className={style.info_block__list} >
            {data.productDetails.children.map((item, index) => (
              <li key={index}>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
