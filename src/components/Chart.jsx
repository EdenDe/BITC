import React from 'react'
import { Sparklines, SparklinesLine } from 'react-sparklines';

export default function Chart({data,color}) {
  
  return (
    <Sparklines data={data} >
      <SparklinesLine color={color} />
    </Sparklines>
  )
}
