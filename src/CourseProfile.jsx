import './CourseProfile.css'
import CommentForCourseProfile from './CommentForCourseProfile.jsx';
import { useState, useEffect } from 'react';
import {db} from "./firebase";
import {
    doc,
    collection,
    addDoc,
    getDoc,
    getDocs,
    serverTimestamp,
    getFirestore
} from "firebase/firestore"

function CourseProfile({courseId, courseName, courseDesc, prereqs, subject, difficulty, hwTime, teachers, setPage}) {
    const [data, setData] = useState([]);
    const askdjf = courseId;

    useEffect(() => {
        const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db, "placeholderID"));
        // Map docs with id
        const loaded = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setData(loaded);
        };

        fetchData();
    }, []);

    // Find the document with ID "2"
    const theSpeficClass = data.find((doc) => doc.id === askdjf);

    return(
        <div>
        <div id="theCourseProfileOne">
            <button id="backButton" onClick={() => setPage('courseList')}>Back</button>
            <h1>{theSpeficClass ? ( <p>{theSpeficClass.class}</p> ) : ( <p>Loading or document not found...</p> )}</h1>

            <div className='boxForProfile' id='boxDesc'>
                <h3>Description:</h3>
                <p>{theSpeficClass ? ( <p>{theSpeficClass.desc}</p> ) : ( <p>Loading or document not found...</p> )}</p>
            </div>

            <div className='boxForProfile' id='boxPrereqs'>
                <h3>Prereqs:</h3>
                <p>{theSpeficClass ? ( <p>{theSpeficClass.prereq}</p> ) : ( <p>Loading or document not found...</p> )}</p>
            </div>

            <div className='boxForProfile' id='boxSubject'>
                <h3>Subject:</h3>
                <p>{theSpeficClass ? ( <p>{theSpeficClass.subject}</p> ) : ( <p>Loading or document not found...</p> )}</p>
            </div>

            <div className='boxForProfile' id='boxTeachers'>
                <h3>Teachers:</h3>
                <p>{theSpeficClass ? ( <p>{theSpeficClass.teachers}</p> ) : ( <p>Loading or document not found...</p> )}</p>
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