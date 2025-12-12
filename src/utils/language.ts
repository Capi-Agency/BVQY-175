export const updateSlugLanguage = (
  slug: string,
  newLanguage: string,
): string => {
  const slugParts = slug.split('-');
  const lastPart = slugParts[slugParts.length - 1];

  if (lastPart === 'en' || lastPart === 'vi') {
    if (newLanguage === 'vi') {
      slugParts.pop();
    } else {
      slugParts[slugParts.length - 1] = 'en';
    }
  }
  return slugParts.join('-');
};

export const locales: any = {
  'register-form-title': {
    vi: 'Theo dõi tin tức và dịch vụ mới nhất của chúng tôi',
    en: 'Follow our latest news and services',
  },
  'register-form-des': {
    vi: 'Đăng ký nhận thêm các hướng dẫn giao dịch tuyệt vời từ bệnh viện 175 qua email của bạn',
    en: 'Sign up to receive more great trading guides from 175 hospital via your email',
  },
  'register-label': {
    vi: 'Đăng ký',
    en: 'Register',
  },
  'register-placeholder': {
    vi: 'Địa chỉ email',
    en: 'Email address',
  },
  'contact-label': {
    vi: 'Liên hệ',
    en: 'Contact',
  },
  'site-map-label': {
    vi: 'Đường dẫn',
    en: 'Site map',
  },
  'introduce-label': {
    vi: 'Giới thiệu',
    en: 'Introduce',
  },
  'social-network-label': {
    vi: 'Mạng xã hội',
    en: 'Social network',
  },
  'policy-label': {
    vi: 'Chính sách và bảo mật',
    en: 'Policy and privacy',
  },
  'terms-services-label': {
    vi: 'Điều khoản và dịch vụ',
    en: 'Terms and Services',
  },
  'copy-right-label': {
    vi: 'Bản quyền thuộc về Bệnh viện Quân y 175 © 2025',
    en: 'Copyright belongs to Military Hospital 175 © 2025',
  },
  'validate-email-required': {
    vi: 'Vui lòng nhập email!',
    en: 'Please enter email!',
  },
  'validate-email-length': {
    vi: 'Vui lòng nhập không quá 50 ký tự!',
    en: 'Please enter no more than 50 characters!',
  },
  'validate-email-format': {
    vi: 'Vui lòng nhập đúng định dạng email!',
    en: 'Please enter correct email format!',
  },
  'noti-success-contact': {
    vi: 'Cảm ơn bạn đã cung cấp thông tin!',
    en: 'Thanks for the information!',
  },
  'noti-error-contact': {
    vi: 'Xảy ra lỗi, xin vui lòng thử lại!',
    en: 'An error occurred, please try again!',
  },
  'search-placeholder': {
    vi: 'Tìm kiếm',
    en: 'Search',
  },
  'empty-page': {
    vi: 'Trang không tồn tại!',
    en: 'Page not found!',
  },
  'doctor-education-label': {
    vi: 'Học vấn & Quá trình công tác',
    en: 'Education & Work History',
  },
  'doctor-activity-label': {
    vi: 'Hình ảnh hoạt động',
    en: 'Activity images',
  },
  'doctor-awards-label': {
    vi: 'Giải thưởng & Danh hiệu',
    en: 'Awards & Honors',
  },
  'view-more-label': {
    vi: 'Xem chi tiết',
    en: 'View more',
  },
  'no-data-label': {
    vi: 'Không có dữ liệu',
    en: 'No data available',
  },
  'make-an-appointment-title': {
    vi: 'Đặt lịch <br/> khám ngay',
    en: 'Make an <br/> appointment now',
  },
  'make-an-appointment-des': {
    vi: 'Liên hệ ngay chúng tôi để được phục vụ và sử dụng các dịch vụ khám, chữa bệnh hiện đại & cao cấp nhất.',
    en: 'Contact us now to be served and use the most modern and high-quality medical examination and treatment services.',
  },
  'make-an-appointment-btn': {
    vi: 'Liên hệ ngay',
    en: 'Contact now',
  },
  'return-menu': {
    vi: 'Quay lại menu chính',
    en: 'Return to the main menu',
  },
};
