'use client';
import React from 'react';

// The hamburger button. Shared by MenuMobile (as the dialog trigger) and LazyMenuMobile (shown
// before the menu module is loaded), so both render the same markup.
const MenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(function MenuButton(props, ref) {
  return (
    <button
      ref={ref}
      type="button"
      {...props}
      className="flex items-center justify-center md:h-9 md:w-[52px] md:rounded-[6px] md:bg-primary-600 xl:hidden 2xl:h-10 2xl:w-[60px]"
    >
      <div className="relative size-6 brightness-0 md:brightness-100 2xl:size-6">
        <img
          src="/assets/icons/ham_menu.svg"
          alt="menu icon"
          loading="eager"
          className="size-full"
        />
      </div>
    </button>
  );
});

export default MenuButton;
