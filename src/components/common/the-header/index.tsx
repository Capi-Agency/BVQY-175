'use client';
import NextImg from '@/src/components/common/next-img';
import {
  AccordionContent,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from '@/src/components/ui/accordion';
import {
  Dialog,
  DialogClose,
  DialogContentMenuMobile,
  DialogTitle,
  DialogTrigger,
} from '@/src/components/ui/dialog';
import { useScrollSmoother } from '@/src/providers/ScrollSmootherProvider';
import Link from 'next/link';
import React, { useMemo, useRef, useState } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function TheHeader() {
  return <header></header>;
}
