import React from 'react'
import style from './style.module.scss'
import classNames from 'classnames'
export default function Colors({
  data,
  color,
  setColor
}) {
  
  return (
    <div className={style.colorComponents}>
      <p className={style.colorComponents_title}>{data.title}</p>
      <div className={style.colorComponents_colors}>
        {data.colors.map((item, index) => (
          <div
            key={index}
            className={classNames(style.colorComponents_colors__border, { [style.activeColor]: color === index }
            )}
            onClick={() => setColor(index)}
          >
            <span style={{ backgroundColor: item }} />
          </div>
        ))}
      </div>
    </div>

  )
}
