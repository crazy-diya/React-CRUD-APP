import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import firebase from '../firebase'
import './view.css'

const View = () => {
    const [employee, setEmployee] = useState({})

    const { id } = useParams()

    useEffect(() => {
        firebase.child(`employee/${id}`).get().then((snapshot) => {
            if (snapshot.exists()) {
                setEmployee({ ...snapshot.val() })
            } else {
                setEmployee({})
            }
        })
    }, [id])

    console.log(employee);

    return (
        <div style={{ marginTop: "50px" }}>
            <div className='card'>
                <div className="card-header">
                    <p>Employee Details</p>
                </div>
                <div className='container'>
                    <strong>ID:</strong>
                    <span>{id}</span>
                    <br />
                    <br />

                    <strong>Name:</strong>
                    <span>{employee.name}</span>
                    <br />
                    <br />

                    <strong>Email:</strong>
                    <span>{employee.email}</span>
                    <br />
                    <br />

                    <strong>Contact:</strong>
                    <span>{employee.contact}</span>
                    <br />
                    <br />

                    <strong>Salary:</strong>
                    <span>{employee.fees}</span>
                    <br />
                    <br />
                    
                    <strong>Status:</strong>
                    <span>{employee.status}</span>
                    <br />
                    <br />

                    <Link to='/'>
                        <button className='btn btn-edit'>Go Back</button>
                    </Link>
                </div>


            </div>
        </div>
    )
}

export default View