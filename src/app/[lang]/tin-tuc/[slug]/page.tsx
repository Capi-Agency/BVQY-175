import NextImg from '@/src/components/common/next-img';
import RelatedPosts from '@/src/components/sections/post-grid/RelatedPost';
import { getNewsDetail } from '@/src/services/news';
import Link from 'next/link';
import React, { Fragment } from 'react';

type Props = {
  params: {
    slug: string;
  };
};

const NewsDetailPage = async ({ params }: Props) => {
  const { slug } = await params;
  const post = await getNewsDetail({ collection: 'posts', slug });
  return (
    <div className="padding-top-body">
      <Breadcrumb />

      <div className="container my-10 lg:my-12 2xl:my-[72px] 3xl:my-20">
        {/* Cover */}
        <div className="relative h-[200px] w-full md:h-[230px] lg:h-[360px] 2xl:h-[386px] 3xl:h-[426px] 4xl:h-[480px]">
          <NextImg
            src="/assets/images/demo-image.png"
            alt="demo image"
            objectFit="cover"
          />
        </div>

        <div className="mt-6 flex flex-col gap-6 md:grid md:grid-cols-[auto,260px] md:flex-row lg:mx-auto lg:mt-10 lg:max-w-[902px] lg:gap-11 xl:max-w-[960px] 2xl:gap-12 3xl:max-w-[1120px] 3xl:gap-[60px] 4xl:mt-[60px]">
          {/* Main content */}
          <div className="space-y-4 md:space-y-6">
            <div className="space-y-2 lg:space-y-3">
              {/* Date published */}
              <p className="flex items-center gap-1 text-sm text-black lg:text-base 2xl:text-lg">
                <div className="relative size-3.5">
                  <NextImg
                    src="/assets/icons/calendar_black.svg"
                    alt="calendar"
                  />
                </div>
                7/11/2025
              </p>

              {/* title */}
              <h1 className="mb-5 text-lg font-bold !leading-normal text-primary-600 lg:mb-6 lg:text-2xl xl:mb-7 xl:text-[28px] 3xl:mb-8 3xl:text-[30px] 4xl:text-[32px]">
                BỘ QUỐC PHÒNG KIỂM TRA, ĐÁNH GIÁ CÔNG TÁC CHUYỂN ĐỔI SỐ TẠI BV
                QUÂN Y 175
              </h1>
            </div>

            {/* Blurb */}
            <p className="text-sm font-bold text-gray-950 lg:text-base 3xl:text-lg">
              Chiều ngày 29/10, Bệnh viện Quân y 175 đã tiếp đoàn kiểm tra của
              Bộ Quốc phòng về công tác chuyển đổi số và tổ chức thành công Hội
              nghị kiểm tra công tác chuyển đổi số nhằm đánh giá công tác chuyển
              đổi số tại Bệnh viện và rút kinh nghiệm để tổ chức thực hiện hiệu
              quả nhiệm vụ chuyển đổi số trong thời gian tới.
            </p>

            {/* content */}
            <p className="text-sm font-normal text-gray-950 lg:text-base 3xl:text-lg">
              Dự và chỉ đạo Hội nghị có Thượng tướng Lê Huy Vịnh, Ủy viên Trung
              ương Đảng, Ủy viên Quân ủy Trung ương, Thứ trưởng Bộ Quốc phòng,
              Phó Trưởng ban Thường trực Ban Chỉ đạo của Bộ Quốc phòng về phát
              triển khoa học, công nghệ đổi mới sáng tạo, chuyển đổi số, thực
              hiện Đề án 06 và cải cách hành chính. Về phía Bệnh viện Quân y 175
              có sự tham dự của Thiếu tướng Trần Quốc Việt – Giám đốc Bệnh viện;
              Thiếu tướng Lê Quang Trí – Phó Giám đốc Bệnh viện; Đại tá Nguyễn
              Văn Ba – Phó Giám đốc Bệnh viện. Dự và chỉ đạo Hội nghị có Thượng
              tướng Lê Huy Vịnh, Ủy viên Trung ương Đảng, Ủy viên Quân ủy Trung
              ương, Thứ trưởng Bộ Quốc phòng, Phó Trưởng ban Thường trực Ban Chỉ
              đạo của Bộ Quốc phòng về phát triển khoa học, công nghệ đổi mới
              sáng tạo, chuyển đổi số, thực hiện Đề án 06 và cải cách hành
              chính. Về phía Bệnh viện Quân y 175 có sự tham dự của Thiếu tướng
              Trần Quốc Việt – Giám đốc Bệnh viện; Thiếu tướng Lê Quang Trí –
              Phó Giám đốc Bệnh viện; Đại tá Nguyễn Văn Ba – Phó Giám đốc Bệnh
              viện. Dự và chỉ đạo Hội nghị có Thượng tướng Lê Huy Vịnh, Ủy viên
              Trung ương Đảng, Ủy viên Quân ủy Trung ương, Thứ trưởng Bộ Quốc
              phòng, Phó Trưởng ban Thường trực Ban Chỉ đạo của Bộ Quốc phòng về
              phát triển khoa học, công nghệ đổi mới sáng tạo, chuyển đổi số,
              thực hiện Đề án 06 và cải cách hành chính. Về phía Bệnh viện Quân
              y 175 có sự tham dự của Thiếu tướng Trần Quốc Việt – Giám đốc Bệnh
              viện; Thiếu tướng Lê Quang Trí – Phó Giám đốc Bệnh viện; Đại tá
              Nguyễn Văn Ba – Phó Giám đốc Bệnh viện.
            </p>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 lg:space-y-8 3xl:space-y-10">
            {/*  Tags  */}
            <div>
              <h3 className="mb-2 text-base font-semibold text-gray-950 lg:mb-4 lg:text-lg 3xl:mb-5">
                Thẻ bài viết
              </h3>
              <p className="border-b border-gray-200 py-2.5 text-sm font-medium text-gray-700 lg:py-3 lg:text-base">
                Tin nổi bật
              </p>
              <p className="border-b border-gray-200 py-2.5 text-sm font-medium text-gray-700 lg:py-3 lg:text-base">
                Tin nổi bật
              </p>
            </div>

            {/* Form */}
            <div className="rounded-[6px] border border-primary-700 bg-primary-100 p-4 xl:rounded-xl">
              <p className="mb-2 text-base font-semibold text-black">
                Theo dõi tin tức và dịch vụ mới nhất của chúng tôi
              </p>
              <p className="text-sm font-normal text-black">
                Đăng ký nhận thêm các hướng dẫn giao dịch tuyệt vời từ bệnh viện
                175 qua email của bạn
              </p>
              <input
                type="email"
                placeholder="email@example.com"
                id="email"
                className="my-4 w-full rounded-[6px] px-2.5 py-3 text-sm text-black placeholder:text-gray-600"
              />
              <button className="flex items-center gap-2 rounded-[6px] bg-primary-600 px-4 py-2 text-sm text-white">
                Đăng ký
                <img
                  src={'/assets/icons/arrow_right_white.svg'}
                  alt="arrow white"
                />
              </button>
            </div>

            {/* Banner */}
            <div className="flex flex-col items-center gap-3 rounded-[6px] border-[.5px] border-primary-600 px-3 py-5 xl:gap-4 xl:rounded-xl xl:px-4 xl:py-6">
              <p className="mx-auto w-full max-w-[220px] text-center text-sm font-semibold text-black">
                Bệnh viện sẽ phát triển theo mô hình các quần thể y tế hiện đại
                tại các nước phát triển, cụ thể như Bệnh viện đa khoa Quốc gia
                Singapore
              </p>
              <div className="relative aspect-[2/3] w-full">
                <NextImg src="/assets/images/doctor.png" alt="doctor" />
              </div>
              <div className="text-center">
                <p className="text-xs font-normal text-gray-700 2xl:text-sm 3xl:text-base">
                  Thiếu tướng, TS. TTND
                </p>
                <p className="text-lg font-bold text-primary-500 2xl:text-xl 3xl:text-2xl">
                  Trần Quốc Việt
                </p>
                <p className="text-xs font-medium text-gray-700 2xl:text-sm 3xl:text-base">
                  Giám đốc Bệnh viện
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Other posts */}
      <RelatedPosts data={{}} />
    </div>
  );
};

export default NewsDetailPage;

const Breadcrumb = () => (
  <div className="bg-primary-50">
    <div className="container flex items-center gap-1 py-1.5 text-sm lg:py-2 lg:text-lg 2xl:py-2.5 4xl:text-xl">
      <Link href={'/'} className="font-normal text-[#71717A]">
        Trang chủ
      </Link>

      <div className="relative size-4 -rotate-90">
        <NextImg src="/assets/icons/arrow_down_gray.svg" alt="arrow icon" />
      </div>

      <Link href={'/'} className="font-normal text-[#71717A]">
        Tin tức
      </Link>

      <div className="relative size-4 -rotate-90">
        <NextImg src="/assets/icons/arrow_down_gray.svg" alt="arrow icon" />
      </div>

      <div className="font-semibold text-primary-600">Tin nổi bật</div>
    </div>
  </div>
);
