/* pages/Home.js */
import { Footer, Navbar } from '../components';
import { Explore, Feedback, GetStarted, WhatsNew } from '../sections';

const Home = () => (
  <div className="bg-primary-black overflow-hidden">
    <Navbar />
    <div>
      <WhatsNew />
    </div>
    <div className="relative">
      <Explore />
    </div>
    <div className="relative">
      <GetStarted />
    </div>
    <div className="relative">
      <div className="gradient-04 z-0" />
      <Feedback />
    </div>
    <Footer />
  </div>
);

export default Home;
