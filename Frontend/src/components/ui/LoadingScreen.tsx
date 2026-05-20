export default function LoadingScreen() {
    return (
        <div className="loading-screen">
            <div className="loading-screen__card">
                <div className="loading-screen__brand">Dhia's Portfolio</div>
                <div className="loading-screen__spinner">
                    <span className="loading-screen__dot" />
                    <span className="loading-screen__dot" />
                    <span className="loading-screen__dot" />
                </div>
                <p className="loading-screen__text">Loading...</p>
            </div>
        </div>
    );
}
