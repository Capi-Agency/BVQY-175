import React from 'react';
import NextImg from '../../common/next-img';
import Link from 'next/link';

export default function NewsCard() {
  return (
    <Link
      href={'/'}
      className="group relative cursor-pointer space-y-4 bg-primary-50 p-3 text-start transition-all duration-200 hover:bg-primary-600 xl:p-4"
    >
      {/* cover */}
      <div className="relative aspect-video">
        <NextImg
          src="/assets/images/unavailable.png"
          alt="post cover"
          objectFit="cover"
        />
      </div>
      <div className="space-y-1">
        <h4 className="line-clamp-2 text-lg font-semibold text-primary-1000 duration-200 group-hover:text-primary-50 xl:text-xl 3xl:text-[22px] 4xl:text-2xl">
          HAI PHẪU THUẬT NỘI SOI LẤY TẠNG GHÉP ĐƯỢC TIẾN HÀNH ĐỒNG THỜI TRONG
          CHƯƠNG TRÌNH PHẪU THUẬT THỊ PHẠM GHÉP THẬN, GHÉP GAN CỦA HỘI NGHỊ KHOA
          HỌC VSOT LẦN THỨ 10 – 2025 ĐƯỢC TỔ CHỨC TẠI BỆNH VIỆN QUÂN Y 175
        </h4>
        <p className="line-clamp-3 text-sm font-thin text-[#03110899] duration-200 group-hover:text-primary-100">
          Ngày 04/11/2025, tại Bệnh viện Quân y 175 đã chính thức khai mạc Tuần
          lễ Hiến và Ghép mô, tạng Việt Nam 2025. Trong khuôn khổ Tuần lễ chương
          trình tiền hội nghị được diễn ra từ ngày 4 – 6/11/2025 với ba chương
          trình đào tạo liên tục cấp CME gồm: Đào tạo điều phối viên hiến mô,
          tạng; Đào tạo chẩn đoán và hồi sức chết não và đào tạo điều phối viên
          ghép tạng.
        </p>
      </div>

      {/* date published */}
      <div className="flex justify-between">
        <div className="flex items-center gap-1.5">
          <div className="relative size-5 transition-all duration-200 group-hover:brightness-0 group-hover:invert 2xl:size-6">
            <NextImg
              src="/assets/icons/calendar_gray.svg"
              alt="calendar icon"
            />
          </div>

          <p className="text-sm font-medium text-gray-700 duration-200 group-hover:text-primary-50 2xl:text-base">
            5/11/2025
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-medium text-gray-950 duration-200 group-hover:text-primary-50 2xl:text-base 3xl:text-lg">
            Xem chi tiết
          </span>
          <div className="relative size-5 transition-all duration-200 group-hover:brightness-0 group-hover:invert 2xl:size-6">
            <NextImg
              src="/assets/icons/arrow_right_black.svg"
              alt="arrow icon"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
