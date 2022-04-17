/* Iida Peltonen 2022 */

const Notification = ({ message, message2 }) => {
  if (message === null) {
    return null
  }

  return <div>
    <div className='success'>{message}</div>
    <div className='error'>{message2}</div>
    </div>
}

export default Notification


