'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import MenuButton from './MenuButton';

type Props = {
  handleSearch: (key: string, value: string) => void;
};

const load = () => import('./MenuMobile');

// The mobile menu (Radix Dialog + Accordion + the whole menu tree) was in the initial bundle of
// every page. Until the first tap only the button is rendered; hovering / touching it starts
// loading the menu, and the tap mounts it already open.
const MenuMobile = dynamic(load, {
  ssr: false,
  loading: () => <MenuButton aria-busy="true" />,
});

export default function LazyMenuMobile({ handleSearch }: Props) {
  const [mounted, setMounted] = useState(false);

  if (mounted) return <MenuMobile handleSearch={handleSearch} defaultOpen />;

  return (
    <MenuButton
      aria-haspopup="dialog"
      onPointerEnter={() => void load()}
      onTouchStart={() => void load()}
      onFocus={() => void load()}
      onClick={() => setMounted(true)}
    />
  );
}
