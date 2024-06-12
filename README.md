# 🖼️ Website xóa nền ảnh sử dụng API remove.bg
Bài tập lớn: Thiết kế Web (Học kì 1 - Năm 3 - Học viện Ngân hàng)

## Mục lục
* [Thông tin cơ bản](#thông-tin-cơ-bản)
* [Techstack](#techstack)
* [Yêu cầu](#yêu-cầu)
* [Hướng dẫn sử dụng](#hướng-dẫn-sử-dụng)

## Thông tin cơ bản
Bố cục website xóa nền ảnh sử dụng API remove.bg bao gồm các trang
- Landing (hay Homepage): trang chủ của website
- Background Remove: xóa nền ảnh sử dụng API *[remove.bg](https://remove.bg/)*
- How to use?: hướng dẫn sử dụng
- Pricing: thông tin chi tiết các gói subscription đối với những khách hàng quyết định gắn bó lâu dài với dịch vụ
- Contact us: liên lạc với đội ngũ quản trị hoặc đăng ký newsletter
- Login/ Logout: sử dụng một trong hai phương thức xác thực e-mail hoặc thông qua tài khoản Google
- Dashboard: nơi lưu trữ những hình ảnh đã xóa nền của người dùng

**Website tham khảo**
- [remove.bg](https://www.remove.bg/)
- [removal.ai](https://removal.ai/)
- [PhotoRoom](https://www.photoroom.com/tools/background-remover)

**Tác giả**
- [Nguyễn Hoàng Tâm](https://github.com/nghtamm2003)
	
## Techstack
- HTML + CSS
- Ngôn ngữ lập trình JavaScript
- TailwindCSS cùng một số library như [daisyUI](https://daisyui.com/), [Preline](https://preline.co/), [Lucide](https://lucide.dev/)
- NodeJS
- Webpack
- EmailJS
- Google Firebase
	
## Yêu cầu
- Cài đặt [NodeJS](https://nodejs.org/en/download)

## Hướng dẫn sử dụng
Cài đặt các dependencies
```
npm install
```
Build và run project NodeJS
```
npm start
```

**Một số script**
```
// Build 'tailwind.css'
npm css

// Bundle các file .js (trong src/scripts/unbundle) sử dụng Webpack
npm build
```