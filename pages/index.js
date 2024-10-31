import { data } from '@/pages/api/api'
import HomePage from "@/components/pages/HomePage"
import Basket from '@/components/common/basket/Basket'
import { useEffect, useRef, useState } from 'react'

export default function Home() {
   const [basket, setBasket] = useState([])
   const [openBasket, setOpenBasket] = useState(false)
   const basketRef = useRef(null)


   const addProduct = (item) => {
      const newArray = [...basket]
      const index = newArray.findIndex(({ article: itemArticle }) => itemArticle === item.article)

      if (index !== -1) {
         newArray.splice(index, 1, {
            ...newArray[index], 
            qty: newArray[index].qty + 1
         })
      } else {
         newArray.push(item)
      }

      setBasket(newArray)
      setOpenBasket(true)
   }


   const globalEvent = ({ target }) => {
      if (
        !basketRef?.current?.contains(target) 
      ) {
         setOpenBasket(false)
      }
    };


    useEffect(() => {
      if (openBasket) {
        document.onmouseup = globalEvent;
      } else {
        document.onmouseup = null;
      }
  
      return () => {
        document.onmouseup = null;
      };
    }, [openBasket]);

   return (
      <>
         <Basket forwardRef={basketRef} data={basket} setBasket={setBasket} openBasket={openBasket} setOpenBasket={setOpenBasket} />
         <div className="container">
            <HomePage {...data} addProduct={addProduct} />
         </div>
      </>
   )
}
