const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  console.log(message)
  return (
    <div className='error'>
      
    </div>
  )
}
export default Notification