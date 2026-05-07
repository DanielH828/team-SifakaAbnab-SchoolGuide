import React, { useState, useMemo, useEffect } from 'react';
// 1. Import Firestore methods and your DB config
import { db } from './firebase'; 
import { collection, addDoc, onSnapshot, query, orderBy, updateDoc, doc } from 'firebase/firestore';
import './Reviewcard.css'

const ReviewCard = () => {
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ text: '', difficulty: 0, workload: 0, stress: 0, enjoyment: 0 });

  // 2. Real-time Sync: Fetch reviews from Firestore on mount
  useEffect(() => {
    const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reviewData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReviews(reviewData);
    });
    return () => unsubscribe();
  }, []);

  const averages = useMemo(() => {
    if (reviews.length === 0) return { difficulty: 0, workload: 0, stress: 0, enjoyment: 0 };
    const sums = reviews.reduce((acc, r) => ({
      difficulty: acc.difficulty + (r.scores?.difficulty || 0),
      workload: acc.workload + (r.scores?.workload || 0),
      stress: acc.stress + (r.scores?.stress || 0),
      enjoyment: acc.enjoyment + (r.scores?.enjoyment || 0),
    }), { difficulty: 0, workload: 0, stress: 0, enjoyment: 0 });

    return Object.fromEntries(Object.entries(sums).map(([k, v]) => [k, (v / reviews.length).toFixed(1)]));
  }, [reviews]);

  // 3. Update Firestore for Voting
  const handleVote = async (id, delta) => {
    const reviewRef = doc(db, "reviews", id);
    const review = reviews.find(r => r.id === id);
    await updateDoc(reviewRef, {
      votes: (review.votes || 0) + delta
    });
  };

  // 4. Submit to Firestore
  const submitReview = async () => {
    const scores = {
      difficulty: Number(newReview.difficulty) || 0,
      workload: Number(newReview.workload) || 0,
      stress: Number(newReview.stress) || 0,
      enjoyment: Number(newReview.enjoyment) || 0,
    };

    try {
      await addDoc(collection(db, "reviews"), {
        user: 'Username',
        text: newReview.text,
        scores: scores,
        votes: 0,
        createdAt: new Date()
      });

      setShowForm(false);
      setNewReview({ text: '', difficulty: 0, workload: 0, stress: 0, enjoyment: 0 });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#fdfdfd' }}>
      {/* Average Score Header */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
        {Object.entries(averages).map(([label, score]) => (
          <div key={label} style={{ padding: '15px', borderRadius: '40px', backgroundColor: label === 'enjoyment' ? '#b2f2bb' : '#d8f5a2', textAlign: 'center', minWidth: '100px' }}>
            <div style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>{label}</div>
            <div>{score}/10</div>
          </div>
        ))}
      </div>

      <button onClick={() => setShowForm(!showForm)} style={{ backgroundColor: '#1b4332', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>
        {showForm ? 'Cancel' : 'Add a review'}
      </button>

      {/* Review Input Box */}
      {showForm && (
        <div style={{ backgroundColor: '#f1f3f5', padding: '20px', marginTop: '15px', borderRadius: '8px' }}>
          <textarea 
            placeholder="Insert text here... Please be respectful." 
            value={newReview.text} 
            onChange={(e) => setNewReview({...newReview, text: e.target.value})} 
            style={{ width: '100%', marginBottom: '10px', padding: '10px' }} 
          />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            {['difficulty', 'workload', 'stress', 'enjoyment'].map(attr => (
              <label key={attr} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ textTransform: 'capitalize' }}>{attr}:</span>
                <input 
                  type="number" 
                  value={newReview[attr]} 
                  style={{ width: '60px', padding: '5px' }} 
                  onChange={(e) => {
                    const rawValue = e.target.value;
                    if (rawValue === '') {
                      setNewReview({ ...newReview, [attr]: '' });
                      return;
                    }
                    let val = parseFloat(rawValue);
                    if (val < 0) val = 0;
                    if (val > 10) val = 10;
                    setNewReview({ ...newReview, [attr]: isNaN(val) ? 0 : val });
                  }} 
                />
                <span style={{ color: '#666' }}>/10</span>
              </label>
            ))}
          </div>
          <button onClick={submitReview} style={{ marginTop: '15px', padding: '8px 16px', cursor: 'pointer', backgroundColor: '#1b4332', color: 'white', border: 'none', borderRadius: '4px' }}>
            Submit Review
          </button>
        </div>
      )}

      {/* Reviews List */}
      {reviews.map(rev => (
        <div key={rev.id} style={{ backgroundColor: '#f8fff0', padding: '20px', marginTop: '20px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
          <div style={{ fontWeight: 'bold', color: '#ff0055' }}>{rev.user}</div>
          <p>{rev.text}</p>
          <div style={{ fontSize: '0.9em', color: '#555' }}>
            Difficulty: {rev.scores?.difficulty}/10 | Workload: {rev.scores?.workload}/10 | Stress: {rev.scores?.stress}/10 | Enjoyment: {rev.scores?.enjoyment}/10
          </div>
          <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button onClick={() => handleVote(rev.id, 1)}>👍 {rev.votes || 0}</button>
            <button onClick={() => handleVote(rev.id, -1)}>👎</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewCard;
