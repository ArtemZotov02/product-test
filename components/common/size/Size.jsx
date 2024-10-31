import React from 'react'
import style from './style.module.scss'
import classNames from 'classnames'
export default function Size({
  data,
  size,
  setSize
}) {
  return (
    <div className={style.size}>
      <p className={style.size_title}>{data.title}</p>
      {data.size.map((item, index) => (
        <span
          key={index}
          className={classNames(style.size_item, { [style.activeSize]: !size.index ? index === 0 : size.index === index }
          )}
          onClick={() => setSize({ item, index })}
        >
          {item}
        </span>
      ))}
    </div>
  )
}
