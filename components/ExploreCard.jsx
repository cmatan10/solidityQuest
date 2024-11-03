'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import styles from '../styles';
import { fadeIn } from '../utils/motion';

const ExploreCard = ({ id, imgUrl, title, index, active, handleClick }) => {
  const router = useRouter();

  const handleCardClick = () => {
    if (active === id) {
      router.push(`/games/Game${index + 1}`);
    } else {
      handleClick(id);
    }
  };

  return (
    <motion.div
      variants={fadeIn('right', 'spring', index * 0.25, 2.75)}
      className={`relative ${
        active === id
          ? 'h-[360px] rounded-[12px]' // Ensure active card has rounded corners
          : 'h-[220px] sm:h-[320px] rounded-[12px]' // Add rounded corners to inactive cards as well
      } flex items-center justify-center transition-[flex] duration-[0.5s] ease-out cursor-pointer m-3`}
      onClick={handleCardClick}
    >
      <img
        src={imgUrl}
        alt={title}
        className="absolute w-full h-full object-cover rounded-[12px]"
      />
      {active !== id ? (
        <div className="absolute bottom-0 p-4 flex justify-start w-full flex-col rounded-b-[12px]">
          <h2 className="mt-[12px] font-semibold sm:text-[16px] text-[18px] text-white whitespace-nowrap">
            {title}
          </h2>
        </div>
      ) : (
        <div className="absolute bottom-0 p-4 flex justify-start w-full flex-col bg-[rgba(0,0,0,0.5)] rounded-[12px]"> {/* Changed rounded-[32px] to rounded-[12px] */}
          <div className={`${styles.flexCenter} w-[50px] h-[50px] rounded-[12px] glassmorphism mb-[8px]`}>
            <img
              src="/game.png"
              alt="headset"
              className="object-contain"
            />
          </div>
          <p className="font-normal text-[14px] leading-[16px] text-white uppercase">
            Play Now!
          </p>
          <h2 className="mt-[12px] font-semibold sm:text-[16px] text-[18px] text-white whitespace-nowrap">
            {title}
          </h2>
        </div>
      )}
    </motion.div>
  );
};

export default ExploreCard;
