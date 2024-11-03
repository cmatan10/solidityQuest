'use client';

import { useState } from 'react';
import Slider from 'react-slick'; // Import react-slick
import { motion } from 'framer-motion';

import styles from '../styles';
import { GAMES } from '../constants';
import { staggerContainer } from '../utils/motion';
import { ExploreCard, TitleText } from '../components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Explore = () => {
  const [active, setActive] = useState(''); // Initialize active state as empty

  // Settings for the slider
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          adaptiveHeight: true,
        },
      },
    ],
  };

  return (
    <section className={`${styles.paddings}`} id="explore">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col`}
      >
        <TitleText
          title={<>Choose the world you want <br className="md:block hidden" /> to explore</>}
          textStyles="text-center"
        />

        {/* Slider for cards */}
        <Slider {...settings} className="mt-[50px]">
          {GAMES.map((world, index) => (
            <ExploreCard
              key={world.id}
              {...world}
              index={index}
              active={active}
              handleClick={setActive}
            />
          ))}
        </Slider>
      </motion.div>
    </section>
  );
};

export default Explore;
