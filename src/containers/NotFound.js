import React from "react";
import { Link } from 'react-router-dom'

export default function NotFound(props) {
    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-4'>
                    <img src='/images/404.svg' alt='Not Found' />
                    <p className='text-center fw-bold'>Requested Page is not found.</p>
                    <div className='text-center'>
                        <Link to='/' className='text-capitalize'>Go to home</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}