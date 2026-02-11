import { CommonSection } from '@/src/types/pageBuilder';
import React from 'react';
import Posts3ColClient from './Posts3Col.client';

const Posts3Col = ({ data }: CommonSection) => {
  return (
    <section className="py-10 text-center xl:py-11 2xl:py-12 3xl:py-[52px] 4xl:py-[60px]">
      <div className="section-sub-title">{data?.subtitle}</div>
      {data?.title && <h1 className="section-title">{data?.title}</h1>}

      <div className="lg:container">
        <Posts3ColClient data={data} />
      </div>
    </section>
  );
};

export default Posts3Col;
