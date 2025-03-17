import React from 'react';
import Head from 'next/head';
import Hero from '@components/home/Hero';
import FeaturedStories from '@components/home/FeaturedStories';
import HowItWorks from '@components/home/HowItWorks';
import TokenEconomy from '@components/home/TokenEconomy';
import CreatorShowcase from '@components/home/CreatorShowcase';
import CallToAction from '@components/home/CallToAction';

const HomePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Lumen Tales | Interactive Stories Powered by AI & Blockchain</title>
        <meta name="description" content="A tokenized interactive narrative platform where stories become digital assets." />
      </Head>
      
      <main>
        <Hero />
        <FeaturedStories />
        <HowItWorks />
        <TokenEconomy />
        <CreatorShowcase />
        <CallToAction />
      </main>
    </>
  );
};

export default HomePage; 