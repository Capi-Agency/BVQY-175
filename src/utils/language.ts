export const langs = ['vi', 'en', 'jp', 'fr', 'de'] as const;
export type LanguageCode = (typeof langs)[number];
export const defaultLanguage: LanguageCode = 'vi';

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
  close: {
    vi: 'Đóng',
    en: 'Close',
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
  'validate-mess-length': {
    vi: 'Vui lòng nhập không quá 1000 ký tự!',
    en: 'Please enter no more than 1000 characters!',
  },
  'validate-name-length': {
    vi: 'Vui lòng nhập không quá 50 ký tự!',
    en: 'Please enter no more than 50 characters!',
  },
  'validate-name-required': {
    vi: 'Vui lòng nhập tên của bạn!',
    en: 'Please enter your fullname!',
  },
  'validate-phone-length': {
    vi: 'Vui lòng nhập không quá 20 ký tự!',
    en: 'Please enter no more than 20 characters!',
  },
  'validate-phone-required': {
    vi: 'Vui lòng nhập số điện thoại!',
    en: 'Please enter your phone number!',
  },
  'validate-phone-format': {
    vi: 'Vui lòng nhập đúng định dạng số điện thoại!',
    en: 'Please enter correct phone number format!',
  },
  'validate-rating-required': {
    vi: 'Vui lòng chọn đánh giá!',
    en: 'Please select a rating!',
  },
  'name-placeholder': {
    vi: 'Họ và tên',
    en: 'Fullname',
  },
  'phone-placeholder': {
    vi: 'Số điện thoại',
    en: 'Phone number',
  },
  'email-placeholder': {
    vi: 'Email',
    en: 'Email',
  },
  'note-placeholder': {
    vi: 'Ghi chú',
    en: 'Note',
  },
  'noti-success-register': {
    vi: 'Cảm ơn bạn đã cung cấp thông tin!',
    en: 'Thanks for the information!',
  },
  'noti-error-contact': {
    vi: 'Xảy ra lỗi, xin vui lòng thử lại!',
    en: 'An error occurred, please try again!',
  },
  'noti-success-contact': {
    vi: 'Cảm ơn bạn đã liên hệ với chúng tôi!',
    en: 'Thank you for contacting us!',
  },
  'noti-success-review': {
    vi: 'Cảm ơn bạn đã đánh giá chất lượng!',
    en: 'Thank you for rating the review!',
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
  'no-data-available': {
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
  hotline: {
    vi: 'Hotline',
    en: 'Hotline',
  },
  'book-app': {
    vi: 'Đặt khám trên App',
    en: 'Book an examination on the App',
  },
  'schedule-demand': {
    vi: 'Đặt khám theo yêu cầu',
    en: 'Schedule an appointment on demand.',
  },
  fanpage: {
    vi: 'Fanpage',
    en: 'Fanpage',
  },
  email: {
    vi: 'Email',
    en: 'Email',
  },
  expand: {
    vi: 'Mở rộng',
    en: 'Expand',
  },
  collapse: {
    vi: 'Rút gọn',
    en: 'Collapse',
  },
  'verify-recapcha-error': {
    vi: 'Xác minh reCaptcha không thành công!',
    en: 'reCaptcha verification failed!',
  },
  'recapcha-not-ready': {
    vi: 'reCAPTCHA chưa sẵn sàng!',
    en: 'reCAPTCHA is not ready yet!',
  },
  all: {
    vi: 'Tất cả',
    en: 'All',
  },
  'search-results': {
    vi: 'Kết quả tìm kiếm',
    en: 'Search results',
  },
  'rating-very-good': {
    vi: '😍 Rất tốt',
    en: '😍 Very good',
  },
  'rating-good': {
    vi: '😊 Tốt',
    en: '😊 Good',
  },
  'rating-rather': {
    vi: '🙂 Khá',
    en: '🙂 Rather',
  },
  'rating-medium': {
    vi: '😐 Trung bình',
    en: '😐 Medium',
  },
  'rating-least': {
    vi: '😞 Chưa tốt',
    en: '😞 Least',
  },
  'send-now': {
    vi: 'Gửi ngay',
    en: 'Send now',
  },
  'phone-contact': {
    vi: 'Điện thoại',
    en: 'Hotline',
  },
  'book-via-zalo': {
    vi: 'Đặt lịch qua Zalo',
    en: 'Book an appointment via Zalo',
  },
  'book-via-app': {
    vi: 'Đặt lịch qua App',
    en: 'Book an appointment via the App',
  },
  'email-contact': {
    vi: 'Email',
    en: 'Email',
  },
  'address-contact': {
    vi: 'Địa chỉ',
    en: 'Address',
  },
  'view-more-process': {
    vi: 'Xem chi tiết quy trình',
    en: 'Address',
  },
};
