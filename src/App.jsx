import Header from './components/Header/Header'
import  { Card } from './components/Card/Card'
import { useCart } from './hooks/useCart';


function App() {

  const {data, cart, addToCart, removeFromCart, decrementQuantity, increaseQuantity, cleanCart, cardTotal} = useCart();
  
  return (
    <>

    <Header
      card={cart}
      removeFromCart={removeFromCart}
      increaseQuantity={increaseQuantity}
      decrementQuantity={decrementQuantity}
      cleanCart={cleanCart}
      cardTotal={cardTotal}
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
