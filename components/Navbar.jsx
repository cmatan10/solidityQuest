/* eslint-disable react/button-has-type */
import { motion } from 'framer-motion';
import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Web3Context } from '../web3/Web3provider';
import styles from '../styles';
import { navVariants } from '../utils/motion';
import { GAMES } from '../constants';

const Navbar = () => {
  const { walletAddress, requestAccount } = useContext(Web3Context);
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen((prevState) => !prevState);
    console.log('Dropdown Open State:', !isMenuOpen);
  };

  // Close menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsMenuOpen(false);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
      <motion.nav
        variants={navVariants}
        initial="hidden"
        whileInView="show"
        className={`${styles.xPaddings} py-8 relative z-10`}
      >
        <div className={`${styles.innerWidth} mx-auto flex justify-between gap-8`}>
          <Link href="/" passHref>
            <h2 className="font-extrabold text-[24px] leading-[30.24px] text-white">
              Solidity Quest
            </h2>
          </Link>
          <div className="flex items-center">
            <button
              onClick={requestAccount}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              disabled={!requestAccount}
            >
              {walletAddress ? 'Connected' : 'Connect Wallet'}
            </button>
            <img
              src="/menu.svg"
              alt="menu"
              className="w-[24px] h-[24px] object-contain ml-4 cursor-pointer"
              onClick={handleMenuClick}
            />
          </div>
        </div>
      </motion.nav>
      {isMenuOpen && (
        <div className="absolute top-20 right-0 bg-gray-800 rounded-lg shadow-lg p-4 z-50">
          {GAMES.map((game, index) => (
            <div
              key={game.id}
              className="cursor-pointer text-white hover:text-gray-300 mb-2"
              onClick={() => {
                router.push(`/games/Game${index + 1}`);
                setIsMenuOpen(false);
              }}
            >
              <p className="small-title">{game.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
