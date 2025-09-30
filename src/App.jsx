import { useEffect, useState } from 'react';

import Header from './components/Header/Header'
import  { Card } from './components/Card/Card'
import { db } from './data/db';

function App() {

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

 // localStorage




  return (
    <>

    <Header
      card={cart}
      removeFromCart={removeFromCart}
      increaseQuantity={increaseQuantity}
      decrementQuantity={decrementQuantity}
      cleanCart={cleanCart}
    />

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">

            {
              data.map((card) => (
                  // <Card
                  //   key={card.id}
                  //   name={card.name}
                  //   img={`img/${card.image}.jpg`}
                  //   description={card.description}
                  //   price={card.price}
                  // />
                  <Card
                    key={card.id}
                    card={card}
                    setCart={setCart}
                    addToCart={addToCart}
                  />
              ))
            }

        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>


    </>
  )
}

export default App
