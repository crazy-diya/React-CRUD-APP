import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './search.css'
import firebase from '../firebase'

const Search = () => {

    const [data, setData] = useState({})

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery();
    let search = query.get('contact')

    console.log(search);

    const searchData = () => {
        firebase.child("employee").orderByChild('contact').equalTo(search).on("value", (snapshot) => {
            if (snapshot.val()) {
                setData(snapshot.val());
            }
        })
    }

    useEffect(() => {
        searchData(search)
    }, [search])

    return (
        <div style={{ marginTop: "50px" }}>
            <h1>Employee Search Records</h1>

            <Link to='/'>
                <button className='btn btn-edit'>Go Back</button>
            </Link>

            {Object.keys(data).length === 0 ? (
                <h2>No Search result found !</h2>
            ) :
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

                        </tr>
                    </thead>
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



                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            }
        </div>
    )
}

export default Search