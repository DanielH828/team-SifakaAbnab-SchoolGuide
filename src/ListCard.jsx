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

function ListCard({courseId, difficulty, workload}){
    const [data, setData] = useState([]);

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

    // Find the document with ID provided
    const theSpeficClass = data.find((doc) => doc.id === courseId);
    
    return(
        <div>
            <h2>{theSpeficClass ? ( <p>{theSpeficClass.class}</p> ) : ( <p>Loading or document not found...</p> )}</h2>
            <p>{theSpeficClass ? ( <p>{theSpeficClass.desc}</p> ) : ( <p>Loading or document not found...</p> )}</p>
            {/*make workload and difficulty receive user responses later...*/}
            <p className='load'>{workload}</p>
            <p className='diffic'>{difficulty}</p>
        </div>
    )
}

export default ListCard