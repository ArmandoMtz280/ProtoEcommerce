import { useEffect, useState } from 'react';
import { db } from '../data/db';


export const useCart = () => {

    console.log('desde useCart')

     // Persistencia en el cart
  const initialCart = () => {
     const localStorageCart = localStorage.getItem('cart');
     return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  // State
  const [data] = useState(db)
 // State para el cart
  const [cart, setCart] = useState(initialCart)


  const MAX_QUANTITY = 5
  const MIN_QUANTITY = 1

  useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])
 // Agregar al cart
function addToCart(item) {

    const itemExist = cart.findIndex(card => card.id === item.id)
          
           if(itemExist >= 0 && itemExist){ // Existe el item en el cart
               console.log('Existe el Item') 
               const updateCart = [...cart]; // Se hace una copia de cart para no mutarlo
               updateCart[itemExist].quantity++ // Se actualiza la propiedad de quantity en la copia
               setCart(updateCart) // Se actualiza la copia steandola en setCart
           }else{
               console.log('No existe agregando.....')
               item.quantity = 1
               setCart(prevCart => [...prevCart, item]) // hace una copia del state y agrega item al final
           } 

  
}

// Eliminar del Carrito 
function removeFromCart(id) {
  setCart(prevCart => prevCart.filter(card => card.id !== id))
}

// incrementar cantidad 
function increaseQuantity(id) {
    const updateCart = cart.map(item => {
      if(item.id === id && item.quantity < MAX_QUANTITY){
        return {
        ...item,
        quantity: item.quantity + 1
        }
      }
      return item
    })
    setCart(updateCart)
}

// Decrementar cantidad
function decrementQuantity(id) {
  const updateCart = cart.map(item => {
     if(item.id === id && item.quantity > MIN_QUANTITY){

      return {
    ...item,
    quantity: item.quantity - 1
    }
  }
  return item
})
setCart(updateCart)
}

// Limpiar Carrito
 function cleanCart() {
    setCart([]);
 }

   // State derivado
   const cardTotal = cart.reduce((total, item) => total + (item.quantity * item.price), 0 )

 // Todas las funciones del Hook se colocan en el return para que puedan ser utilizadas 

    return{

        data,
        cart,
        addToCart,
        removeFromCart,
        decrementQuantity,
        increaseQuantity,
        cleanCart, 
        cardTotal
        
    }
}