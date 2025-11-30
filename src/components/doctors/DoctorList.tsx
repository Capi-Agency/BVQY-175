'use client';
import NextImg from '@/src/components/common/next-img';
import ThePagination from '@/src/components/common/the-pagination';
import { getDoctorsCount, getListDoctors } from '@/src/services/doctors';
import { getAssetUrlById } from '@/src/utils/image';
import { getDoctorTitles } from '@/src/utils/render-doctor-title';
import clsx from 'clsx';
import Link from 'next/link';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

type Props = {
  data: any;
  departmentGroups: any;
};

const DoctorList = ({ data, departmentGroups }: Props) => {
  // Quản lý filter
  const [searchText, setSearchText] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('');
  const [searchMethod, setSearchMethod] = useState<
    'by_name' | 'by_department' | null
  >(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const parentGroups = departmentGroups?.filter(
    (d: any) => d.parent_group === null,
  );
  const [activeParentGroup, setActiveParentGroup] = useState(null);
  const currentParentGroup = useMemo(() => {
    return departmentGroups.find((d: any) => d.slug === activeParentGroup);
  }, [activeParentGroup, departmentGroups]);
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null);
  const panelRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false); // đóng panel
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Quản lý fetching
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItem, setTotalItem] = useState(0);
  const [totalPage, setTotalPage] = useState(1);

  const resetFilter = () => {
    setSearchText('');
    setSelectedLetter('');
    setSelectedDepartment(null);
    setSearchMethod(null);
    setCurrentPage(1);
  };

  // Hàm gọi API dựa trên search/filter
  const fetchDoctors = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getListDoctors({
        limit: 6,
        page: currentPage,
        keyword: searchText ? searchText.trim() : undefined,
        letter:
          searchMethod === 'by_name' && selectedLetter
            ? selectedLetter
            : undefined,
        departmentId:
          searchMethod === 'by_department' && selectedDepartment
            ? selectedDepartment?.slug
            : undefined,
      });
      setDoctors(res || []);
    } catch (err) {
      console.error(err);
      setDoctors([]);
      setTotalPage(1);
    } finally {
      setLoading(false);
    }
  }, [
    selectedDepartment,
    selectedLetter,
    searchMethod,
    searchText,
    currentPage,
  ]);

  const fetchDoctorCount = useCallback(async () => {
    try {
      const res = await getDoctorsCount({
        keyword: searchText ? searchText.trim() : undefined,
        letter:
          searchMethod === 'by_name' && selectedLetter
            ? selectedLetter
            : undefined,
        departmentId:
          searchMethod === 'by_department' && selectedDepartment
            ? selectedDepartment?.slug
            : undefined,
      });
      setTotalItem(res);
      setTotalPage(Math.ceil(res / 6));
    } catch (err) {
      console.error(err);
      setDoctors([]);
      setTotalPage(1);
    }
  }, [
    selectedDepartment?.slug,
    selectedLetter,
    searchMethod,
    searchText,
    currentPage,
  ]);

  // Gọi lại khi search/filter thay đổi
  useEffect(() => {
    fetchDoctorCount();
    fetchDoctors();
  }, [selectedLetter, selectedDepartment?.slug, searchMethod, currentPage]);

  useEffect(() => {
    if (searchText === '') {
      fetchDoctorCount();
      fetchDoctors();
    }
  }, [searchText]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedLetter, selectedDepartment?.slug, searchMethod]);

  return (
    <div className="bg-primary-50">
      {/* Breadcrumb */}

      {/* Banner + Search box */}
      <div className="md:relative">
        <div
          className="flex h-full flex-col items-center gap-1 py-40 text-center md:py-[100px] lg:gap-2 lg:py-[120px] 2xl:gap-4 2xl:py-[140px] 3xl:py-40"
          style={{
            background: ` linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), url("${getAssetUrlById(data?.cover.id)}") lightgray 50% / cover no-repeat`,
          }}
        >
          {/* title */}
          <h1 className="text-[28px] font-bold text-white md:text-[40px] lg:text-[44px] 2xl:text-[48px] 3xl:text-[60px] 4xl:text-[72px]">
            {data?.title}
          </h1>
          {/* subtitle */}
          <p className="text-base font-normal text-gray-200 md:text-lg lg:text-xl">
            {data?.subtitle}
          </p>
        </div>

        {/* Search form */}
        <div className="mx-auto w-full max-w-[320px] -translate-y-1/2 bg-transparent md:bottom-0 md:max-w-[600px] md:px-0 md:py-0 lg:max-w-[800px] xl:max-w-[1000px]">
          <form
            className="flex items-center justify-between rounded-[6px] bg-white px-3 py-2 shadow-md 3xl:p-6"
            onSubmit={(e) => {
              e.preventDefault();
              fetchDoctorCount();
              fetchDoctors();
            }}
          >
            <div className="flex flex-1 flex-col text-start">
              <label
                htmlFor="searchText"
                className="text-sm font-normal text-gray-500 lg:text-base"
              >
                Tìm kiếm bác sĩ
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  setSearchMethod(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    fetchDoctorCount();
                    fetchDoctors();
                  }
                }}
                placeholder="Nhập tên, chuyên khoa"
                className="text-base font-normal placeholder:text-[#0F2F64] focus:border-none focus:outline-none md:text-lg"
              />
            </div>
            <button
              type="submit"
              className="flex size-10 items-center justify-center rounded-[4px] bg-primary-600 p-3 text-white md:size-auto md:gap-4 3xl:px-8 3xl:py-4"
            >
              <span className="hidden md:block">Tìm kiếm</span>
              <img
                src="/assets/icons/arrow_right_white.svg"
                alt="arrow right"
              />
            </button>
          </form>
        </div>
      </div>

      {/* Danh sách bác sĩ */}
      <div className="container space-y-8 pb-20 md:space-y-10 lg:pb-16 xl:pb-[72px] 2xl:pb-20 3xl:pb-[100px] 4xl:pb-[120px]">
        {/* Nút chuyển tabs */}
        <div className="flex flex-col gap-4 md:flex-row md:gap-6">
          {/* Tim theo ten */}
          <div
            className={clsx(
              'relative flex h-[100px] w-full cursor-pointer flex-col justify-center px-5 py-4 shadow-lg md:h-[120px] md:flex-1 lg:h-[140px] xl:h-[160px]',
              searchMethod === 'by_name'
                ? 'bg-primary-600 *:!text-gray-50'
                : 'bg-white',
            )}
            onClick={() => setSearchMethod('by_name')}
          >
            <div className="mb-2 flex items-center gap-2.5 text-lg font-semibold text-gray-500 lg:text-xl">
              {/* icon */}
              <div className="flex items-center justify-center rounded-[6px] bg-primary-50 p-2">
                <img
                  src={'/assets/icons/search_by_name.svg'}
                  alt="search by name"
                  className="size-5"
                />
              </div>
              Lọc theo Tên
            </div>
            <p className="text-sm font-medium text-gray-500">
              Tìm nhanh bác sĩ theo tên
            </p>

            <img
              src="/assets/images/arrow_bg.png"
              alt="bg"
              className="absolute right-[20%] top-1/2 -translate-y-1/2"
            />
          </div>

          {/* Tim theo khoa */}
          <div
            className={clsx(
              'relative flex h-[100px] w-full cursor-pointer flex-col justify-center px-5 py-4 shadow-lg md:h-[120px] md:flex-1 lg:h-[140px] xl:h-[160px]',
              searchMethod === 'by_department'
                ? 'bg-primary-600 *:!text-gray-50'
                : 'bg-white',
            )}
            onClick={() => setSearchMethod('by_department')}
          >
            <div className="mb-2 flex items-center gap-2.5 text-lg font-semibold text-gray-500 lg:text-xl">
              {/* icon */}
              <div className="flex items-center justify-center rounded-[6px] bg-primary-50 p-2">
                <img
                  src={'/assets/icons/search_by_department.svg'}
                  alt="search by department"
                  className="size-5"
                />
              </div>
              Lọc theo Chuyên khoa
            </div>
            <p className="text-sm font-medium text-gray-500">
              Tìm bác sĩ theo đúng chuyên khoa
            </p>
            <img
              src="/assets/images/arrow_bg.png"
              alt="bg"
              className="absolute right-[20%] top-1/2 -translate-y-1/2"
            />
          </div>
        </div>

        <div className="bg-white p-6 lg:p-10">
          {/* Bàn phím */}
          {searchMethod === 'by_name' ? (
            <div className="space-y-6 py-6">
              <h3 className="text-center text-base font-semibold text-black xl:text-lg 2xl:text-xl">
                Tìm kiếm bác sĩ theo tên
              </h3>
              <div className="mx-auto flex flex-wrap justify-center gap-6 md:max-w-[456px] lg:max-w-[564px] xl:max-w-[648px] 2xl:max-w-[732px] 3xl:max-w-[900px]">
                {letters.map((letter: string, index: number) => {
                  return (
                    <button
                      className={clsx(
                        'flex size-10 cursor-pointer items-center justify-center rounded-xl text-xl font-semibold hover:bg-primary-300 hover:text-primary-50 md:size-[56px] md:text-2xl lg:size-[60px] lg:text-[28px]',
                        selectedLetter === letter
                          ? 'bg-primary-600 text-primary-50'
                          : 'text-gray-500',
                      )}
                      key={index}
                      onClick={() => setSelectedLetter(letter)}
                    >
                      {letter}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          {/* Dropdown chuyen khoa */}
          {searchMethod === 'by_department' ? (
            <div className="space-y-6 py-6">
              <h3 className="text-center text-base font-semibold text-black xl:text-lg 2xl:text-xl">
                Tìm kiếm bác sĩ theo chuyên khoa
              </h3>

              <div className="mx-auto w-full bg-transparent md:max-w-[600px] md:px-0 md:py-0 lg:max-w-[800px] 3xl:block">
                <form
                  ref={panelRef}
                  className="relative flex items-center justify-between rounded-[6px] bg-white px-3 py-2 shadow-md 3xl:p-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                    fetchDoctorCount();
                    fetchDoctors();
                  }}
                >
                  <div
                    className="flex flex-1 cursor-pointer items-center gap-6 text-[#0F2F64]"
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                  >
                    {selectedDepartment
                      ? selectedDepartment.title
                      : 'Chọn chuyên khoa'}
                    <img
                      src="/assets/icons/chevron_down_gray.svg"
                      alt="chevron down"
                      className={clsx(
                        'size-4 transition-all',
                        isDropdownOpen ? 'rotate-180' : 'rotate-0',
                      )}
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex size-10 items-center justify-center rounded-[4px] bg-primary-600 p-3 text-white md:size-auto md:gap-4 3xl:px-8 3xl:py-4"
                  >
                    <span className="hidden md:block">Tìm kiếm</span>
                    <img
                      src="/assets/icons/arrow_right_white.svg"
                      alt="arrow right"
                    />
                  </button>
                  <div
                    className={clsx(
                      'absolute left-1/2 top-[calc(100%+16px)] z-[20] w-full -translate-x-1/2 rounded-[6px] bg-white p-6 shadow-xl transition-all',
                      isDropdownOpen
                        ? 'max-h-[4000px] opacity-100'
                        : 'hidden max-h-0 opacity-0',
                    )}
                  >
                    <div className="h-full md:hidden">
                      {parentGroups.map((pGroup: any) => {
                        return (
                          <DepartmentDropdownItem
                            pGroup={pGroup}
                            isOpen={activeParentGroup === pGroup.slug}
                            key={pGroup.slug}
                            onClick={() => setActiveParentGroup(pGroup.slug)}
                            setSelectedDepartment={setSelectedDepartment}
                            setIsDropdownOpen={setIsDropdownOpen}
                          />
                        );
                      })}
                    </div>

                    <div className="hidden md:flex md:gap-8">
                      {/* Parent Group - left */}
                      <div className="space-y-2">
                        {parentGroups.map((pGroup: any) => {
                          const isOpen = activeParentGroup === pGroup.slug;
                          return (
                            <div
                              onClick={() => setActiveParentGroup(pGroup.slug)}
                              className={clsx(
                                'flex cursor-pointer items-center justify-between rounded-[4px] p-2 font-bold uppercase',
                                isOpen
                                  ? 'bg-primary-600 text-primary-50'
                                  : 'bg-white text-black',
                              )}
                              key={pGroup.slug}
                            >
                              <span>{pGroup.title}</span>
                              <img
                                src={'/assets/icons/chevron_down_gray.svg'}
                                className={clsx(
                                  'ml-2 h-4 w-4 transition-transform duration-200',
                                  isOpen
                                    ? 'rotate-180 brightness-0 invert'
                                    : 'rotate-0',
                                )}
                              />
                            </div>
                          );
                        })}
                      </div>

                      {/* Child Department - right */}
                      <div className="flex flex-1 flex-wrap gap-x-4">
                        {currentParentGroup?.departments &&
                          currentParentGroup?.departments?.map((dep: any) => (
                            <div
                              key={dep.slug}
                              className="w-[calc(50%-16px)] cursor-pointer py-2.5 text-sm font-semibold text-primary-1000"
                              onClick={() => {
                                setSelectedDepartment(dep);
                                setIsDropdownOpen(false);
                              }}
                            >
                              {dep.title}
                            </div>
                          ))}

                        {currentParentGroup?.children_groups &&
                          currentParentGroup?.children_groups?.map(
                            (childGroup: any) => (
                              <div
                                key={childGroup.slug}
                                className='text-primary-1000" w-[calc(50%-16px)] py-2.5 text-sm font-semibold'
                              >
                                <h4 className="font-bold uppercase text-gray-400">
                                  {childGroup.title}
                                </h4>
                                {childGroup?.departments?.map((dep: any) => (
                                  <div
                                    key={'child_dep_' + dep.slug}
                                    onClick={() => {
                                      setSelectedDepartment(dep);
                                      setIsDropdownOpen(false);
                                    }}
                                    className="cursor-pointer py-2.5 text-sm font-semibold text-primary-1000"
                                  >
                                    {dep.title}
                                  </div>
                                ))}
                              </div>
                            ),
                          )}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          ) : null}

          {/* Hiển thị kết quả */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="flex items-center gap-1.5 text-base font-medium text-gray-700">
              <span className="text-xl font-semibold text-primary-600">
                {totalItem}{' '}
              </span>
              kết quả phù hợp
              {(searchText || selectedLetter) && (
                <div>
                  với tìm kiếm{' '}
                  <span className="font-semibold text-primary-600">
                    {' '}
                    “{searchText || selectedLetter}”
                  </span>
                </div>
              )}
            </div>

            {(!!searchText || !!searchMethod) && (
              <>
                <div className="hidden h-4 w-[1px] bg-gray-300 md:block"></div>

                <div
                  onClick={resetFilter}
                  className="flex cursor-pointer items-center justify-end gap-1.5 align-middle font-medium text-[#ED5252] lg:text-lg"
                >
                  Xóa bộ lọc
                  <img src="/assets/icons/close_red.svg" alt="close_red" />
                </div>
              </>
            )}
          </div>

          {/* Danh sách */}
          {doctors && doctors.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 lg:gap-10 xl:grid-cols-2">
              {doctors.map((doctor: any, index: number) => (
                <DoctorCard key={index} doctor={doctor} />
              ))}
            </div>
          ) : (
            <div className="flex h-[300px] items-center justify-center text-center">
              <div>
                <p className="text-xl text-black">Không tìm thấy kết quả</p>
                <p className="text-base text-[#6C6C71]">
                  Không có bác sĩ phù hợp với tìm kiếm của bạn. Vui lòng thử lại
                </p>
              </div>
            </div>
          )}

          <ThePagination
            currentPage={currentPage}
            totalPage={totalPage}
            setPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default DoctorList;

const DepartmentDropdownItem = ({
  pGroup,
  isOpen,
  onClick,
  setSelectedDepartment,
  setIsDropdownOpen,
}: {
  pGroup: any;
  isOpen: boolean;
  onClick: () => void;
  setSelectedDepartment: (d: any) => void;
  setIsDropdownOpen: (v: boolean) => void;
}) => {
  const [open, setOpen] = useState(isOpen);
  return (
    <div onClick={onClick}>
      <div
        onClick={() => setOpen(!isOpen)}
        className={clsx(
          'flex items-center justify-between rounded-[4px] p-2 font-bold uppercase',
          isOpen ? 'bg-primary-600 text-primary-50' : 'bg-white text-black',
        )}
        key={pGroup.slug}
      >
        {pGroup.title}
        <img
          src={'/assets/icons/chevron_down_gray.svg'}
          className={clsx(
            'ml-2 h-4 w-4 transition-transform duration-200',
            isOpen ? 'rotate-180 brightness-0 invert' : 'rotate-0',
          )}
        />
      </div>
      {open && (
        <div
          className={clsx(
            'p-3',
            isOpen ? 'max-h-[4000px] opacity-100' : 'hidden max-h-0 opacity-0',
          )}
        >
          {pGroup?.departments &&
            pGroup?.departments?.map((dep: any) => (
              <div
                key={dep.slug}
                className="py-2.5 text-sm font-semibold text-primary-1000"
                onClick={() => {
                  setSelectedDepartment(dep);
                  setIsDropdownOpen(false);
                }}
              >
                {dep.title}
              </div>
            ))}

          <div className="space-y-4">
            {pGroup?.children_groups &&
              pGroup?.children_groups?.map((childGroup: any) => (
                <div key={childGroup.slug}>
                  <h4 className="font-bold uppercase text-gray-400">
                    {childGroup.title}
                  </h4>
                  {childGroup?.departments?.map((dep: any) => (
                    <div
                      key={'child_dep_' + dep.slug}
                      className="py-2.5 text-sm font-semibold text-primary-1000"
                      onClick={() => {
                        setSelectedDepartment(dep);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {dep.title}
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

const letters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'G',
  'H',
  'I',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'X',
  'Y',
];

const DoctorCard = ({ doctor }: { doctor: any }) => {
  const [render, setRender] = useState(false);
  const department = doctor?.departments[0]?.department;
  const titles = getDoctorTitles(doctor);
  console.log('🚀 ~ DoctorCard ~ titles:', titles);

  useEffect(() => {
    setRender(true);
  }, []);
  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-white p-5 shadow-lg md:flex-row md:p-4 lg:p-6 xl:gap-10 xl:p-4 2xl:p-5">
      <div className="relative aspect-[2/3] max-h-[280px] w-full overflow-hidden rounded-[10px] bg-gray-100 md:w-[192px] lg:w-[224px] xl:w-[192px] 2xl:w-[224px]">
        <NextImg
          src={getAssetUrlById(doctor?.avatar)}
          alt="cover"
          objectFit="cover"
          className="object-top"
        />
      </div>

      <div className="flex flex-1 flex-col justify-center md:px-5 lg:justify-between xl:justify-center xl:px-0 2xl:justify-between">
        <div>
          <div className="text-sm font-normal text-gray-500 lg:text-base xl:text-sm 2xl:text-base">
            {doctor?.full_title}
          </div>
          <div className="text-xl font-bold text-primary-1000 lg:text-2xl xl:text-xl 2xl:text-2xl">
            {doctor?.full_name}
          </div>
          <div className="mb-4">
            {titles.map((title, index) => (
              <div className="text-sm font-medium text-primary-500" key={index}>
                {title}
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <img
                src="/assets/icons/first_aid_black.svg"
                alt="first aid"
                className="size-5"
              />
              <p className="gray-700 text-base font-normal lg:text-lg xl:text-base 2xl:text-lg">
                {doctor?.specialty}
              </p>
            </div>

            {render && department && (
              <div className="flex items-center gap-1.5">
                <img
                  src="/assets/icons/hospital_location_black.svg"
                  alt="first aid"
                  className="size-5"
                />
                <p className="gray-700 text-base font-normal lg:text-lg xl:text-base 2xl:text-lg">
                  {department?.title} ({department?.code})
                </p>
              </div>
            )}
          </div>
        </div>

        <Link
          href={'/vi/doi-ngu-bac-si/' + doctor.slug}
          locale={'vi'}
          className="mt-6 flex items-center gap-2 font-medium text-gray-950 group-hover:text-primary-50 lg:mt-0 lg:text-lg xl:mt-6"
        >
          Xem chi tiết
          <img
            src="/assets/icons/arrow_right_black.svg"
            alt="arrow right"
            className="size-6 group-hover:brightness-0 group-hover:invert"
          />
        </Link>
      </div>
    </div>
  );
};
