import { useForm } from '../customHooks/useForm'


const ContactFilter =({filter,onChangeFilter})=>{
  const [register] = useForm(filter,onChangeFilter)

    return (
      <section className="contact-filter flex">
          <input {...register('filter')} placeholder='Search'/>
      </section>
    )
  
}

export default ContactFilter