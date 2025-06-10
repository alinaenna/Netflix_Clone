import CardList from '../components/CardList.jsx';
import Footer from '../components/Footer.jsx';
import Hero from '../components/Hero.jsx';

const Homepage = () => {
    return (
        <div className='p-5'>
            <Hero />
            <CardList title="Now Playing" category="now_playing" />
            <CardList title="Top Rated" category="top_rated" />
            <CardList title="Popular" category="popular" />
            <CardList title="Upcoming" category="upcoming" />
            <Footer />
        </div>
    );
};

export default Homepage; 