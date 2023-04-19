import React,{useState} from 'react'

export function TransferFund({contactName,maxAmount,transferAmount}) {
  const [input,setInput] = useState('')

  const onSubmitAmount= (ev) =>{
    ev.preventDefault();
    if(0 < input && input < 100){
      transferAmount(+input)
      setInput('')
    }
  }

  return (
    <section className='transfer-fund'> 
      <div>Transfer coins to {contactName}</div>
      <form onSubmit={onSubmitAmount}>
        <div>
          <label>Amount</label>
          <input value={input} max={maxAmount} min="0" onChange={(ev)=>setInput(ev.target.value)} type="number"/> 
        </div>
        
        <button>Transfer</button>
      </form>
    </section>
  )
}
