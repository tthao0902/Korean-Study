# Haru · 하루

Website học tiếng Hàn cá nhân bằng tiếng Việt. Bắt đầu với Hangul, luyện giao tiếp sơ cấp, rồi khám phá các chủ điểm đến TOPIK 6.

## Chạy trên máy

Từ thư mục repository, chạy:

```sh
python3 -m http.server 8765
```

Mở `http://localhost:8765`. Trình duyệt cần HTTP để tải các mô-đun JavaScript. Website dùng HTML, CSS và JavaScript thuần, không cần cài gói hay chạy lệnh build.

## Triển khai bằng GitHub Pages

1. Sau khi hợp nhất pull request, mở **Settings → Pages** của repository.
2. Trong **Build and deployment**, chọn **Deploy from a branch**.
3. Chọn nhánh **main** và thư mục **/(root)**, rồi chọn **Save**.
4. Khi quá trình triển khai hoàn tất, mở **Visit site** trong trang **Pages**. Với tên repository hiện tại, đường dẫn mặc định là `https://tthao0902.github.io/Korean-Study/`.

Nếu **Pages** không xuất hiện, hãy kiểm tra quyền quản trị và giới hạn GitHub Pages của repository hoặc tổ chức.

## Nội dung và cách lưu tiến độ

- **Lộ trình** có sáu bài Hangul, các bài giao tiếp sơ cấp và chủ điểm mẫu đến TOPIK 6. Hoàn thành bài bằng cách trả lời đúng câu hỏi cuối bài.
- **Từ vựng và Flashcards** cho phép thêm từ riêng, lọc theo chủ đề/cấp độ, lưu yêu thích, lật thẻ và tự đánh giá. Lịch SRS bắt đầu từ 10 phút khi quên, 6 giờ khi còn khó và tăng theo các mốc 1, 3, 7, 14, 30, 60 ngày khi nhớ.
- **Luyện tập** có ghép nghĩa, nghe, sắp xếp câu, điền từ, kiểm tra từ vựng/ngữ pháp và câu hỏi đọc mô phỏng TOPIK. Các bài cấp cao và câu hỏi TOPIK là bộ nội dung khởi đầu, chưa đủ khối lượng cho một giáo trình luyện thi hoặc một đề thi đầy đủ.
- **Tổng quan** hiển thị tiến độ, XP, số từ đã thuộc, thời gian học, mục tiêu và chuỗi ngày học. Bộ đếm chạy khi trang đang hiển thị và có tương tác trong hai phút gần nhất. Một ngày có XP hoặc ít nhất một phút hoạt động được tính vào streak.
- **Tiến độ** lưu trong `localStorage` theo địa chỉ website và hồ sơ trình duyệt. Dữ liệu giữa localhost và GitHub Pages được lưu riêng. Xóa dữ liệu trang web sẽ xóa tiến độ trên trình duyệt đó.
- **Phát âm** dựa vào Web Speech API. Cài hoặc bật giọng tiếng Hàn trên thiết bị để dùng bài nghe. Website báo khi trình duyệt không phát được âm thanh.
