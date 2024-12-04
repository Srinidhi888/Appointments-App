// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {details, onStarred} = props
  const {id, title, date, isFavorite} = details
  const onStar = () => {
    onStarred(id)
  }
  const imgUrl = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <li className="item">
      <div className="grp">
        <p className="head">{title}</p>
        <button className="btn-star" data-testid="star" onClick={onStar}>
          <img src={imgUrl} alt="star" />
        </button>
      </div>
      <p className="para">Date: {date} </p>
    </li>
  )
}

export default AppointmentItem
