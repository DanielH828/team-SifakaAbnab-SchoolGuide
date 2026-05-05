import './CourseList.css';
import ListCard from './ListCard.jsx';
import { useState } from 'react';



function CourseList({setPage}){
    return(
        <>
            <div className='filterThing'>
             <li>Math</li>
             <li>English</li>
             <li>Science</li>
             <li>Phys Ed</li>
             <li>Practical Arts</li>
             <li>Social Studies</li>
             <li>Arts</li>
             <li>Languages</li>
            </div>
            <div className='listCard'>
             <ListCard courseId="4" courseName2='Filler Course Name' courseDescription='get from firebase'
             difficulty='1/10' workload='0min' onClick={() => setPage("courseProfile")}/>
            </div>
        </>



    )
}

export default CourseList