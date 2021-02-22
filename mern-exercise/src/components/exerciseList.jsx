import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ExerciseList = () => {
    const [ exercises, setExercises ] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/exercises/')
            .then(res => setExercises(res.data))
            .catch(err => console.log(err));
    }, []);

    const deleteExercise = (id) => {
        axios.delete(`http://localhost:5000/exercises/${id}`)
            .then(res => console.log(res.data))
        setExercises(exercises.filter(el => el._id !== id));
    }

    return (
        <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {exercises.map(eachEx => {
                const { _id, username, description, duration, date} = eachEx;
                return (
                    <tr key={_id}>
                        <td>{username}</td>
                        <td>{description}</td>
                        <td>{duration}</td>
                        <td>{date.substring(0,10)}</td>
                        <td>
                            <Link className="btn btn-warning" to={`/edit/${_id}`}>Edit</Link>
                            <button className="btn btn-danger" onClick={() => deleteExercise(_id)} style={{marginLeft: '10px'}}>Delete</button>
                        </td>
                    </tr>
                )
            })}
          </tbody>
        </table>
      </div>
    )
}

export default ExerciseList;