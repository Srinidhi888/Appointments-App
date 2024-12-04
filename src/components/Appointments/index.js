// Write your code here
import './index.css'

import {v4 as uuidv4} from 'uuid'

import {Component} from 'react'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {titleInput: '', dateInput: '', appointmentsList: [], isActive: false}

  onAdd = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: uuidv4(),
      title: titleInput,
      date: formattedDate,
      isFavorite: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onDate = event => {
    this.setState({dateInput: event.target.value})
  }

  onTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(each => {
        if (each.id === id) {
          return {...each, isFavorite: !each.isFavorite}
        }
        return each
      }),
    }))
  }

  onlyStar = () => {
    this.setState(prevState => ({isActive: !prevState.isActive}))
  }

  render() {
    const {appointmentsList, titleInput, dateInput, isActive} = this.state
    const extra = isActive ? 'reverse' : ''
    let filterList = appointmentsList
    if (isActive === true) {
      filterList = appointmentsList.filter(each => each.isFavorite === true)
    }
    return (
      <div className="bg">
        <div className="card">
          <div className="inner-card">
            <form className="lft-card" onSubmit={this.onAdd}>
              <h1>Add Appointment</h1>
              <label htmlFor="title">TITLE</label>
              <input
                value={titleInput}
                onChange={this.onTitle}
                className="ipt"
                type="text"
                placeholder="Title"
                id="title"
              />
              <label htmlFor="time">DATE</label>
              <input
                value={dateInput}
                className="ipt"
                type="date"
                id="time"
                onChange={this.onDate}
              />
              <button className="btn" type="submit">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr className="line" />
          <div className="rgt-card">
            <div className="inner-card">
              <h1>Appointments</h1>
              <button className={`star-btn ${extra}`} onClick={this.onlyStar}>
                Starred
              </button>
            </div>

            <ul className="lists">
              {filterList.map(each => (
                <AppointmentItem
                  details={each}
                  key={each.id}
                  onStarred={this.onStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
