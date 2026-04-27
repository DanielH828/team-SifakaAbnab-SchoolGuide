import './CourseList.css';
import ListCard from './ListCard.jsx';
import { useState } from 'react';



function CourseList({setPage}){
    return(
        <>
        <StrictMode>
            <ListCard courseName='Filler Course Name' courseDescription='get from firebase'
            difficulty='1/10' workload='0min' onClick={() => setPage("courseProfile")}/>
        </StrictMode>
        </>



    )
}

export default CourseList