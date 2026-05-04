import GoogleLogin from "./GoogleAuth";

function Navbar() {
    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#174A43'}}>
            <div className="logo" style={{color: 'white', fontWeight: 'bold' }}>logo</div>
            <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none', margin: 0, padding: 0}}>
                <GoogleLogin></GoogleLogin>
            </ul>
        </nav>
    );
}

export default Navbar