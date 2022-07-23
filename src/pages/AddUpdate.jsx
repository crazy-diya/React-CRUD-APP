import React, { useEffect, useState } from 'react'
import './addupdate.css'
import { toast } from 'react-toastify'
import firebase from '../firebase'
import { useNavigate, useParams } from 'react-router-dom'



const initialState = {
  name: '',
  email: '',
  contact: '',
  fees: '24500',
  status: '',
}
const AddUpdate = () => {

  const navigate = useNavigate();
  const [state, setState] = useState(initialState)
  const [data, setData] = useState(initialState);
  const { name, email, contact, fees, status } = state;
  const { id } = useParams();

  useEffect(() => {
    firebase.child('employee').on("value", (snapshot) => {
      if (snapshot.val() != null) {
        setData({ ...snapshot.val() })
      } else {
        setData()
      }
    })
    return () => {
      setData({})
    }
  }, [])

  useEffect(() => {
    if (id) {
      setState({ ...data[id] })
    } else {
      setState({ ...initialState })
    }
  }, [id, data])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!id) {
      if (!name || !email || !contact || !fees || !status) {
        toast.error("All Fields are required!");
      } else {
        firebase.child('employee').push(state, (err) => {
          if (err) {
            toast.error(err)
          }
          else {
            toast.success("Successfully Data Stored!")
          }
        })

      }
    } else {
      firebase.child(`employee/${id}`).set(state, (err) => {
        if (err) {
          toast.error(err)
        } else {
          toast.success("Employee record Update successfully!")
        }
      })
    }
    setTimeout(() => navigate('/'), 500)


  }

  return (
    <div style={{ marginTop: "50px" }}>
      <form style={{
        margin: "auto",
        padding: "1rem",
        maxWidth: "450px",
        alignContent: 'center'
      }}
        onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" placeholder='Name...' id='name' value={name || ""} name='name' onChange={handleInputChange} />

        <label htmlFor="email">Email</label>
        <input type="email" placeholder='Email...' id='email' value={email || ""} name='email' onChange={handleInputChange} />

        <label htmlFor="contact">Contact</label>
        <input type="text" placeholder='Contact...' id='contact' value={contact || ""} name='contact' onChange={handleInputChange} />

        <label htmlFor="fees">Salary</label>
        <input type="text" placeholder='Fees...' id='fees' value={fees || ""} name='fees' onChange={handleInputChange} />

        <label htmlFor="status">Status</label>
        <input type="text" placeholder='Status...' id='status' value={status || ""} name='status' onChange={handleInputChange} />

        <input type="submit" value={id ? "Update" : "Save"} />
      </form>

    </div>
  )

}

export default AddUpdate