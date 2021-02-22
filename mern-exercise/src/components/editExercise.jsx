import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditExercise = (props) => {
  const [userName, setUserName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);
  const { id } = props.match.params;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/exercises/${id}`)
      .then(response => {
        setUserName(response.data.username);
        setDescription(response.data.description);
        setDuration(response.data.duration);
        setDate(new Date(response.data.date));
      })
      .catch(err => console.log(err));

    axios
      .get("http://localhost:5000/users/")
      .then(res => {
        if (res.data.length > 0) {
          setUsers(res.data.map(user => user.username));
        }
      })
      .catch(err => console.log(err));
  }, [id]);

  const onChangeUsername = (e) => {
    setUserName(e.target.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const onChangeDuration = (e) => {
    setDuration(e.target.value);
  };

  const onChangeDate = (date) => {
    setDate(new Date(date));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const exercise = {
      username: userName,
      description: description,
      duration: duration,
      date: date
    };

    axios
      .post(`http://localhost:5000/exercises/update/${id}`, exercise)
      .then(res => console.log(res.data));

      window.location = '/';

};

  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            required
            className="form-control"
            value={userName}
            onChange={onChangeUsername}
          >
            {users.map(user => {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            value={description}
            onChange={onChangeDescription}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            className="form-control"
            value={duration}
            onChange={onChangeDuration}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker selected={date} onChange={date => onChangeDate(date)} />
          </div>
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Edit Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

EditExercise.propTypes = {
    id: PropTypes.string,
}

export default EditExercise;
