import './CourseList.css';
import ListCard from './ListCard.jsx';
import { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';



function CourseList({setPage}){
    const [classes, setClasses] = useState([])

    useEffect(() => {
        const getClasses = async () => {
            // reference collection
            const classesCollection = collection(db, "placeholderID")
            // get the stuff from the collection
            const data = await getDocs(classesCollection)
            //array
            setClasses(data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            })))
        }

        getClasses()
    }, [])

    return(
        <>
            <div className="createClassList">
                {classes.map((item) => (
                    <ClassCard 
                        key={item.id}
                        courseName2={item.name}
                    />
             ))}
            </div>

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
             <ListCard courseName2='Filler Course Name' courseDescription='get from firebase'
             difficulty='1/10' workload='0min' onClick={() => setPage("courseProfile")}/>
            </div>
        </>



    )
}

export default CourseList