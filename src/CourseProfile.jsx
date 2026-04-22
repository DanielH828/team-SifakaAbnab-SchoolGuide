import './CourseProfile.css'
import { useState } from 'react'

function CourseProfile({courseName, courseDesc, prereqs, subject, difficulty, hwTime}) {
    return(
        <div id="theCourseProfileOne">
            <button>Back</button>
            <h1>{courseName}</h1>
            <div className='boxForProfile' id='box1'>
                <h3>Description:</h3>
                <p>{courseDesc}</p>
            </div>
            <div className='boxForProfile'>
                <h3>Prereqs:</h3>
                <p>{prereqs}</p>
            </div>
            <div className='boxForProfile'>
                <h3>Subject:</h3>
                <p>{subject}</p>
            </div>
            <div className='boxForProfile'>
                <h3>Difficulty:</h3>
                <p>{difficulty}</p>
            </div>
            <div className='boxForProfile'>
                <h3>Average time on HW:</h3>
                <p>{hwTime}</p>
            </div>
        </div>
    )
}

export default CourseProfile