import './CourseProfile.css'
import Reviewcard from './Reviewcard.jsx';

function CourseProfile({courseName, courseDesc, prereqs, subject, difficulty, hwTime, teachers, setPage}) {
    return(
        <div>
            <div id="theCourseProfileOne">
                <button id="backButton" onClick={() => setPage('CourseList')}>Back</button>
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

                

                <div id="whyCantIGethrToWork"></div>
                
            </div>
        </div>
    )
}

export default CourseProfile