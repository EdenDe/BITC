import React from 'react'

export default function MovesList({moves,title}) {

  if(!moves.length){
    return <></>
  }

  return (
    <section className="moves-list">
      <h1>{title}</h1>
      <section className="flex wrap justify-center">
      {
        moves.map((move,idx)=> 
          <div className="move-item" key={idx}>
           {move.to && <p>To: {move.to}</p>}
            <p>At: {new Date(move.at).toLocaleString()}</p>
            <p>Amount: {move.amount} $</p>
         </div>
        )
      }
      </section>
    </section>
  )
}
