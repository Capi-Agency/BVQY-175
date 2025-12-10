import { CommonSection } from '@/src/types/pageBuilder';
import { getAssetUrlById } from '@/src/utils/image';
import React from 'react';

export default function PDFViewer({ data }: CommonSection) {
  const url = getAssetUrlById(data?.cover?.[0]?.id);
  return (
    <section className="container py-[60px] md:py-[80px] xl:py-[120px]">
      <div style={{ height: '90vh', width: '100%' }}>
        <iframe
          src={`${url}#toolbar=1&navpanes=0&scrollbar=0`}
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      </div>
    </section>
  );
}
