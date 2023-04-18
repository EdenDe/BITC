import React,{useState} from 'react'
import { authService } from '../services/auth.service';

export function TransferFund({contact,maxAmount}) {

  const [input,setInput] = useState('')

  const onSubmitAmount= (ev) =>{
    ev.preventDefault();
    if(0 < input && input < 100){
      authService.addMove(contact,+input)
      setInput('')
    }
  }

  return (
    <section className='transfer-fund'> 
      <div>Transfer coins to {contact.name}</div>
      <form onSubmit={onSubmitAmount}>
        <label>Amount</label>
        <input value={input} max={maxAmount} min="0" onChange={(ev)=>setInput(ev.target.value)} type="number"/> 
        <button>Transfer</button>
      </form>
    </section>
  )
}
