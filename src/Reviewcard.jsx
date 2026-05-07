import React, { useState, useMemo, useEffect } from 'react';
import { db } from './firebase';
import { collection, addDoc, onSnapshot, query, orderBy, updateDoc, doc } from 'firebase/firestore';
import { auth } from './firebase';

// Asset Imports
import DifficultyIcon from './assets/DifficultyIcon.png';
import EnjoymentIcon from './assets/Enjoyment.png'; 
import StressIcon from './assets/StressIcon.png'; 
import WorkloadIcon from './assets/WorkloadIcon.png';

const ReviewCard = ({ selectedCourse }) => {
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ text: '', difficulty: '', workload: '', stress: '', enjoyment: '' });
  const [userVotes, setUserVotes] = useState({});
  const courseId = selectedCourse?.id || selectedCourse;

  useEffect(() => {
    const savedVotes = JSON.parse(localStorage.getItem('userVotesMap') || '{}');
    setUserVotes(savedVotes);
    
    const q = query(collection(db, "reviews", courseId, "items"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setReviews(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [selectedCourse]);

  // Helper: Relative "X time ago"
  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const seconds = Math.floor((new Date() - date) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return `${interval}y ago`;
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return `${interval}mo ago`;
    interval = Math.floor(seconds / 604800);
    if (interval >= 1) return `${interval}w ago`;
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return `${interval}d ago`;
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return `${interval}h ago`;
    interval = Math.floor(seconds / 60);
    if (interval >= 1) return `${interval}m ago`;
    return 'Just now';
  };

  // Helper: Exact Date/Time for Tooltip
  const formatExactDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString(undefined, { dateStyle: 'full', timeStyle: 'short' });
  };

  const averages = useMemo(() => {
    if (reviews.length === 0) return { difficulty: 0, workload: 0, stress: 0, enjoyment: 0 };
    const sums = reviews.reduce((acc, r) => ({
      difficulty: acc.difficulty + (Number(r.scores?.difficulty) || 0),
      workload: acc.workload + (Number(r.scores?.workload) || 0),
      stress: acc.stress + (Number(r.scores?.stress) || 0),
      enjoyment: acc.enjoyment + (Number(r.scores?.enjoyment) || 0),
    }), { difficulty: 0, workload: 0, stress: 0, enjoyment: 0 });
    return Object.fromEntries(Object.entries(sums).map(([k, v]) => [k, (v / reviews.length).toFixed(1)]));
  }, [reviews]);

  const getPillColor = (label, score) => {
    const s = parseFloat(score);
    return (label === 'enjoyment' ? s >= 7 : s <= 3.5) ? '#DCFCE7' : s <= 6.5 ? '#FEF9C3' : '#FEE2E2';
  };

  const iconMap = { difficulty: DifficultyIcon, workload: WorkloadIcon, stress: StressIcon, enjoyment: EnjoymentIcon };

  const handleVote = async (reviewId, voteType) => {
    const reviewRef = doc(db, "reviews", courseId, "items", reviewId);
    const review = reviews.find(r => r.id === reviewId);
    const currentVote = userVotes[reviewId];
    let voteChange = currentVote === voteType ? (voteType === 'up' ? -1 : 1) : (currentVote ? (voteType === 'up' ? 2 : -2) : (voteType === 'up' ? 1 : -1));
    let newUserVotes = { ...userVotes };
    if (currentVote === voteType) delete newUserVotes[reviewId]; else newUserVotes[reviewId] = voteType;

    try {
      await updateDoc(reviewRef, { votes: (review.votes || 0) + voteChange });
      setUserVotes(newUserVotes);
      localStorage.setItem('userVotesMap', JSON.stringify(newUserVotes));
    } catch (e) { console.error(e); }
  };

  const submitReview = async () => {
    try {
      await addDoc(collection(db, "reviews", courseId, "items"), {
        user: auth.currentUser?.displayName || 'temporaryguestuserthing',
        text: newReview.text,
        scores: { difficulty: Number(newReview.difficulty), workload: Number(newReview.workload), stress: Number(newReview.stress), enjoyment: Number(newReview.enjoyment) },
        votes: 0, createdAt: new Date()
      });
      setShowForm(false);
      setNewReview({ text: '', difficulty: '', workload: '', stress: '', enjoyment: '' });
    } catch (e) { console.error(e); }
  };

  const isFormValid = newReview.text.trim() !== '' && newReview.difficulty !== '' && newReview.workload !== '' && newReview.stress !== '' && newReview.enjoyment !== '';

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      
      {/* Average Stat Pills */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        {Object.entries(averages).map(([label, score]) => (
          <div key={label} style={{ padding: '15px 45px', borderRadius: '50px', backgroundColor: getPillColor(label, score), textAlign: 'center', minWidth: '160px', display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '1 1 auto' }}>
            <img src={iconMap[label]} alt={label} style={{ width: '28px', height: '28px', marginBottom: '4px' }} />
            <div style={{ fontWeight: 'bold', fontSize: '13px', textTransform: 'capitalize' }}>{label}</div>
            <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{score}/10</div>
          </div>
        ))}
      </div>

      <button onClick={() => setShowForm(!showForm)} style={{ backgroundColor: '#134E4A', color: 'white', padding: '12px 24px', borderRadius: '25px', border: 'none', cursor: 'pointer', fontWeight: 'bold', marginBottom: '20px' }}>
        {showForm ? 'Cancel' : 'Add a review'}
      </button>

      {/* Form Section */}
      {showForm && (
        <div style={{ backgroundColor: '#F3F4F6', padding: '25px', borderRadius: '12px', marginBottom: '30px', border: '1px solid #E5E7EB' }}>
          <textarea placeholder="Insert text here..." value={newReview.text} onChange={(e) => setNewReview({...newReview, text: e.target.value})} style={{ width: '100%', border: 'none', background: 'transparent', fontSize: '16px', outline: 'none', minHeight: '60px', marginBottom: '20px', resize: 'none' }} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', borderTop: '1px solid #E5E7EB', paddingTop: '15px' }}>
            {['difficulty', 'workload', 'stress', 'enjoyment'].map(attr => (
              <label key={attr} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 'bold' }}>
                <span style={{ textTransform: 'capitalize' }}>{attr}:</span>
                <input type="number" placeholder="__" value={newReview[attr]} style={{ width: '35px', border: 'none', borderBottom: '2px solid #000', background: 'transparent', textAlign: 'center', outline: 'none' }} 
                  onChange={(e) => {
                    let val = e.target.value;
                    if (val !== '') {
                      val = parseFloat(val);
                      if (val > 10) val = 10;
                      if (val < 0) val = 0;
                    }
                    setNewReview({ ...newReview, [attr]: val });
                  }} 
                />
                <span>/10</span>
              </label>
            ))}
          </div>
          <button disabled={!isFormValid} onClick={submitReview} style={{ marginTop: '20px', padding: '10px 24px', backgroundColor: '#134E4A', color: 'white', border: 'none', borderRadius: '8px', opacity: isFormValid ? 1 : 0.5 }}>Submit Review</button>
        </div>
      )}

      {/* Reviews List */}
      {reviews.map(rev => (
        <div key={rev.id} style={{ backgroundColor: '#F9FAFB', padding: '20px', borderRadius: '12px', marginBottom: '20px', border: '1px solid #F3F4F6', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
             <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#000' }} />
             <span style={{ fontWeight: 'bold' }}>{rev.user}</span>
          </div>
          <p style={{ margin: '10px 0' }}>{rev.text}</p>
          <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '15px' }}>
            Difficulty: {rev.scores?.difficulty}/10 Workload: {rev.scores?.workload}/10 Stress: {rev.scores?.stress}/10 Enjoyment: {rev.scores?.enjoyment}/10
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => handleVote(rev.id, 'up')} style={{ border: '1px solid #E5E7EB', padding: '6px 14px', borderRadius: '20px', backgroundColor: userVotes[rev.id] === 'up' ? '#DCFCE7' : '#fff' }}>👍 {rev.votes || 0}</button>
            <button onClick={() => handleVote(rev.id, 'down')} style={{ border: '1px solid #E5E7EB', padding: '6px 14px', borderRadius: '20px', backgroundColor: userVotes[rev.id] === 'down' ? '#FEE2E2' : '#fff' }}>👎</button>
          </div>

          {/* Updated Timestamp with Hover Tooltip */}
          <div 
            title={formatExactDate(rev.createdAt)} 
            style={{ position: 'absolute', bottom: '15px', right: '20px', fontSize: '12px', color: '#999', cursor: 'help' }}
          >
            {formatTimeAgo(rev.createdAt)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewCard;
