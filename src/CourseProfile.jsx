import './CourseProfile.css'
import CommentForCourseProfile from './CommentForCourseProfile.jsx';
import { useState } from 'react';
import Reviewcard from './Reviewcard.jsx';

function CourseProfile({courseName, courseDesc, prereqs, subject, difficulty, hwTime, teachers, setPage}) {
    return(
        <div>
        <div id="theCourseProfileOne">
            <button id="backButton" onClick={() => setPage('courseList')}>Back</button>
            <h1>{courseName}</h1>

            <div className='boxForProfile' id='boxDesc'>
                <h3>Description:</h3>
                <p>{courseDesc}</p>
            </div>

            <div className='boxForProfile' id='boxPrereqs'>
                <h3>Prereqs:</h3>
                <p>{prereqs}</p>
            </div>

            <div className='boxForProfile' id='boxSubject'>
                <h3>Subject:</h3>
                <p>{subject}</p>
            </div>

            <div className='boxForProfile' id='boxTeachers'>
                <h3>Teachers:</h3>
                <p>{teachers}</p>
            </div>

            <div className='boxForProfile' id='boxDifficulty'>
                <h3>Difficulty:</h3>
                <p>{difficulty}</p>
            </div>

            <div className='boxForProfile' id='boxHWTime'>
                <h3>Avg HW Time:</h3>
                <p>{hwTime}</p>
            </div>

            <div id="whyCantIGethrToWork"></div>
            
            <h2>Reviews</h2>

            <p id="boxSubRating">Overall Ratings:</p>
            <p id="boxSubDifficulty">Diff: {difficulty}</p>
            <p id="boxSubWorkload">Workload: {hwTime}</p>
            <button id="boxSubReviews">Add Review</button>
        </div>
            <Reviewcard></Reviewcard>
        </div>
    )
}

export default CourseProfile