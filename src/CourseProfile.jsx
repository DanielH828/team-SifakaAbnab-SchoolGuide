import './CourseProfile.css'
import CommentForCourseProfile from './CommentForCourseProfile.jsx';
import { useState } from 'react'

function CourseProfile({courseName, courseDesc, prereqs, subject, difficulty, hwTime, teachers}) {
    return(
        <div>
        <div id="theCourseProfileOne">
            <button id="backButton">Back</button>

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
            <CommentForCourseProfile 
                name="Danny He"
                reviewedDiff="1/10"
                reviewedWorkload="0 Mins"
                review="This was a very cool class. lksadjflsajflksajf"
            />
            <CommentForCourseProfile 
                name="Tyler Levoe"
                reviewedDiff="3/10"
                reviewedWorkload="0 Mins"
                review="this is like the bst class in the computer science classes its really good and i like that. i appreciate this class for being such a positive and good class. thankn fo making this class thanks"
            />
        </div>
    )
}

export default CourseProfile