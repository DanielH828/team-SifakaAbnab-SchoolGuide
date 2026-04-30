import React, { useState, useMemo } from 'react';
// Import your firebase config
// import { db, auth } from './firebase'; 

const ReviewCard = () => {
  const [reviews, setReviews] = useState([
    { id: 1, user: 'danny he', text: 'cool clas very intertsing i lik it very much i think good', scores: { difficulty: 1, workload: 1.3, stress: 3.7, enjoyment: 9 }, votes: 37 },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ text: '', difficulty: 0, workload: 0, stress: 0, enjoyment: 0 });

  // Calculate Average Scores
  const averages = useMemo(() => {
    if (reviews.length === 0) return { difficulty: 0, workload: 0, stress: 0, enjoyment: 0 };
    const sums = reviews.reduce((acc, r) => ({
      difficulty: acc.difficulty + r.scores.difficulty,
      workload: acc.workload + r.scores.workload,
      stress: acc.stress + r.scores.stress,
      enjoyment: acc.enjoyment + r.scores.enjoyment,
    }), { difficulty: 0, workload: 0, stress: 0, enjoyment: 0 });

    return Object.fromEntries(Object.entries(sums).map(([k, v]) => [k, (v / reviews.length).toFixed(1)]));
  }, [reviews]);

  const handleVote = (id, delta) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, votes: r.votes + delta } : r));
  };

  const submitReview = () => {
    // Logic to push to Firebase: db.collection('reviews').add({ ...newReview, user: auth.currentUser.displayName })
    setReviews([...reviews, { id: Date.now(), user: 'Username', text: newReview.text, scores: { ...newReview }, votes: 0 }]);
    setShowForm(false);
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
        Add a review
      </button>

      {/* Review Input Box */}
      {showForm && (
        <div style={{ backgroundColor: '#f1f3f5', padding: '20px', marginTop: '15px', borderRadius: '8px' }}>
          <textarea 
            placeholder="Insert text here... Please be respectful." 
            onChange={(e) => setNewReview({...newReview, text: e.target.value})}
            style={{ width: '100%', marginBottom: '10px', padding: '10px' }}
          />
          <div style={{ display: 'flex', gap: '10px' }}>
            {['difficulty', 'workload', 'stress', 'enjoyment'].map(attr => (
              <label key={attr}>{attr}: <input type="number" max="10" style={{ width: '40px' }} onChange={(e) => setNewReview({...newReview, [attr]: parseFloat(e.target.value)})} />/10</label>
            ))}
          </div>
          <button onClick={submitReview} style={{ marginTop: '10px' }}>Submit</button>
        </div>
      )}

      {/* Reviews List */}
      {reviews.map(rev => (
        <div key={rev.id} style={{ backgroundColor: '#f8fff0', padding: '20px', marginTop: '20px', borderRadius: '8px' }}>
          <div style={{ fontWeight: 'bold', color: '#ff0055' }}>{rev.user}</div>
          <p>{rev.text}</p>
          <div style={{ fontSize: '0.9em', color: '#555' }}>
            Difficulty: {rev.scores.difficulty}/10 | Workload: {rev.scores.workload}/10 | Stress: {rev.scores.stress}/10 | Enjoyment: {rev.scores.enjoyment}/10
          </div>
          <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button onClick={() => handleVote(rev.id, 1)}>👍 {rev.votes}</button>
            <button onClick={() => handleVote(rev.id, -1)}>👎</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewCard;