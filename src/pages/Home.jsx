import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import firebase from '../firebase'
import './home.css'

const Home = () => {


  const [data, setData] = useState({})
  const [sort, setSort] = useState(false)
  const [sortedData, setSortedData] = useState([])


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

  const onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete employee data!")) {
      firebase.child(`employee/${id}`).remove((err) => {
        if (err) {
          toast.error(err)
        } else {
          toast.success('Employee record delete Successfully!')
        }
      })
    }
  }


  const handleChange = (e) => {
    setSort(true);
    firebase.child('employee').orderByChild(`${e.target.value}`).on('value', (snapshot) => {
      let sortedData = [];
      snapshot.forEach((snap) => {
        sortedData.push(snap.val());
      })
      setSortedData(sortedData)
    })
  }
  const handleReset = () => {
    setSort(false)
  }

  console.log("data", data);



  return (
    <div style={{ marginTop: "50px" }}>
      <h1>Employee Records</h1>
      <label htmlFor="sort">Sort By:</label>
      <select name='colValue' id='' className='dropdown' onChange={handleChange}>
        <option value="">Select Option</option>
        <option value="name">Name</option>
        <option value="email">Email</option>
        <option value="contact">Contact</option>
        <option value="fees">Salary</option>
        <option value="status">Status</option>
      </select>
      <button className='btn btn-reset' onClick={handleReset}>Reset</button>
      <table className='table-stayled'>
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>
              No.
            </th>
            <th style={{ textAlign: "center" }}>
              Name
            </th>
            <th style={{ textAlign: "center" }}>
              Email
            </th>
            <th style={{ textAlign: "center" }}>
              Contact
            </th>
            <th style={{ textAlign: "center" }}>
            Salary
            </th>
            <th style={{ textAlign: "center" }}>
              Status
            </th>
            {!sort && <th style={{ textAlign: "center" }}>
              Action
            </th>}
          </tr>
        </thead>
        {!sort && (
          <tbody>
            {
              Object.keys(data).map((id, index) => {
                return (
                  <tr key={id}>
                    <th>{index + 1}</th>
                    <td>{data[id].name}</td>
                    <td>{data[id].email}</td>
                    <td>{data[id].contact}</td>
                    <td>{data[id].fees}</td>
                    <td>{data[id].status}</td>

                    <td>
                      <Link to={`/update/${id}`}>
                        <button className='btn btn-edit'>Edit</button>

                      </Link>
                      <button className='btn btn-delete' onClick={() => onDelete(id)}>Delete</button>
                      <Link to={`/view/${id}`}>
                        <button className='btn btn-view'>View</button>
                      </Link>
                    </td>

                  </tr>
                );
              })
            }
          </tbody>
        )}

        {sort && (
          <tbody>
            {sortedData.map((item, index) => {
              return (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.contact}</td>
                  <td>{item.fees}</td>
                  <td>{item.status}</td>
                </tr>
              )
            })}
          </tbody>
        )}


      </table>

    </div>
  )
}

export default Home