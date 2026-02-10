/// <reference path="../.astro/types.d.ts" />

declare global {
  namespace App {
    interface Locals {
      locale: string;
      metadata: any;
    }
  }
}

export {};
