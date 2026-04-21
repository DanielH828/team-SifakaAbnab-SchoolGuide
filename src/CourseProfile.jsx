import './CourseProfile.css'
import { useState } from 'react'

function CourseProfile() {
    return(
        <div>
            <button>Back</button>
            <h1>{courseName}</h1>
            <div>
                <h3>Description</h3>
                <p>{desc}</p>
            </div>
            <div>
                <h3>
                    <h3>Prereqs</h3>
                    <p>{prereqs}</p>
                </h3>
            </div>
            <div>
                <h3>Subject</h3>
                <p>{subject}</p>
            </div>
        </div>
    )
}

export default CourseProfile