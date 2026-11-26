export const stages = ['Hangul','TOPIK 1','TOPIK 2','TOPIK 3','TOPIK 4','TOPIK 5','TOPIK 6'];
const lesson = (id, level, title, text, examples, question, choices, explanation) =>
  ({id, level, title, text, examples, question, choices, answer: choices[0], explanation});
export const lessons = [
lesson('vowels',0,'Nguyên âm cơ bản','Viết nguyên âm nét dọc bên phải phụ âm (ㅏ, ㅑ, ㅓ, ㅕ, ㅣ) và nguyên âm nét ngang bên dưới (ㅗ, ㅛ, ㅜ, ㅠ, ㅡ). Khi âm tiết bắt đầu bằng nguyên âm, thêm ㅇ câm. Phân biệt ㅗ và ㅜ bằng hướng nét ngắn.',[['아 · 야 · 어 · 여','a · ya · eo · yeo'],['오 · 요 · 우 · 유','o · yo · u · yu'],['으 · 이','eu · i']],'Chữ nào gồm ㅇ và ㅜ?',['우','오','어'],'ㅜ có nét ngắn hướng xuống, nằm dưới ㅇ.'),
lesson('consonants',0,'14 phụ âm cơ bản','Đọc phụ âm cùng nguyên âm để nghe rõ. ㅋ, ㅌ, ㅍ, ㅊ có bật hơi rõ hơn ㄱ, ㄷ, ㅂ, ㅈ. ㅇ câm ở đầu âm tiết. ㄹ giữa hai nguyên âm thường là âm vỗ đầu lưỡi.',[['가 나 다 라 마','ㄱ ㄴ ㄷ ㄹ ㅁ + ㅏ'],['바 사 아 자 하','ㅂ ㅅ ㅇ ㅈ ㅎ + ㅏ'],['차 카 타 파','ㅊ ㅋ ㅌ ㅍ bật hơi']],'Phụ âm nào là dạng bật hơi tương ứng với ㅂ?',['ㅍ','ㅁ','ㅃ'],'Đặt tay trước miệng khi đọc 파 để cảm nhận luồng hơi.'),
lesson('blocks',0,'Ghép khối âm tiết','Một khối Hangul có phụ âm đầu, nguyên âm và có thể có phụ âm cuối. Đặt nét theo loại nguyên âm trước khi thêm phụ âm cuối phía dưới cả khối.',[['한 = ㅎ + ㅏ + ㄴ','Khối có nguyên âm dọc và âm cuối'],['국 = ㄱ + ㅜ + ㄱ','Khối có nguyên âm ngang và âm cuối'],['한국','Hàn Quốc']],'ㄴ + ㅏ + ㅁ ghép thành chữ nào?',['남','난','맘'],'ㄴ ở trái, ㅏ ở phải, ㅁ ở dưới.'),
lesson('compound',0,'Nguyên âm mở rộng và phụ âm căng','Luyện nhóm ㅐ ㅒ ㅔ ㅖ và các tổ hợp ㅘ ㅙ ㅚ ㅝ ㅞ ㅟ ㅢ. Nhiều người nói hiện đại phát âm ㅐ và ㅔ gần như nhau. Đọc ㄲ ㄸ ㅃ ㅆ ㅉ với độ căng hơn, ít hơi hơn nhóm bật hơi.',[['왜 · 위 · 의','wae · wi · ui'],['과 · 워','ㅘ từ ㅗ + ㅏ, ㅝ từ ㅜ + ㅓ'],['달 · 딸 · 탈','Trăng · con gái · mặt nạ']],'Chữ nào chứa phụ âm căng?',['딸','달','탈'],'ㄸ là dạng căng, ㅌ là dạng bật hơi.'),
lesson('batchim',0,'Batchim · phụ âm cuối','Khi đứng cuối từ hoặc trước phụ âm, nhiều batchim quy về bảy âm cuối đại diện ㄱ, ㄴ, ㄷ, ㄹ, ㅁ, ㅂ, ㅇ. Các âm tắc cuối ㄱ, ㄷ, ㅂ dừng lại mà không bật hơi. Batchim kép cần học theo từng cụm và môi trường.',[['밖 [박]','Bên ngoài'],['옷 [옫]','Áo quần'],['잎 [입]','Lá cây'],['읽다 [익따]','Đọc']],'Trong 옷 khi đọc riêng, ㅅ nghe như âm cuối nào?',['ㄷ','ㅅ','ㅂ'],'ㅅ cuối âm tiết trong 옷 quy về âm cuối ㄷ.'),
lesson('sound',0,'Nối âm và biến âm','Khi tiểu từ hoặc đuôi bắt đầu bằng nguyên âm theo sau, nhiều batchim chuyển sang vị trí âm đầu (옷이). Trước ㄴ hoặc ㅁ, âm cuối ㄱ/ㄷ/ㅂ thường mũi hóa thành ㅇ/ㄴ/ㅁ. ㅎ có thể làm âm kế bên bật hơi. Đối chiếu cách viết với dạng đọc trong ngoặc vuông.',[['옷이 [오시]','Quần áo + tiểu từ chủ ngữ'],['국물 [궁물]','Nước dùng'],['좋다 [조타]','Tốt']],'Cách đọc của 국물 là gì?',['궁물','국물','굼물'],'ㄱ trước ㅁ mũi hóa thành ㅇ.'),
lesson('hello',1,'Chào hỏi và giới thiệu','Dùng 안녕하세요 khi chào lịch sự. Để giới thiệu tên, dùng 저는 …이에요 sau tên kết thúc bằng phụ âm và …예요 sau tên kết thúc bằng nguyên âm.',[['안녕하세요. 저는 민이에요.','Xin chào. Tôi là Min.'],['저는 유나예요. 만나서 반가워요.','Tôi là Yuna. Rất vui được gặp bạn.']],'Điền sau 유나: 저는 유나___.',['예요','이에요','있어요'],'나 kết thúc bằng nguyên âm ㅏ.'),
lesson('daily',1,'Một ngày của tôi','Dùng giờ thuần Hàn và phút Hán Hàn để nói giờ. Thêm 에 vào thời điểm cụ thể. Dùng đuôi -아요/-어요 để kể thói quen một cách lịch sự.',[['아침 일곱 시에 일어나요.','Tôi thức dậy lúc bảy giờ sáng.'],['저녁에 책을 읽어요.','Buổi tối tôi đọc sách.']],'Điền tiểu từ: 일곱 시___ 일어나요.',['에','에서','를'],'에 đánh dấu thời điểm.'),
lesson('cafe',2,'Gọi món và hỏi giá','Đặt số thuần Hàn trước đơn vị đếm. 하나, 둘, 셋, 넷 đổi thành 한, 두, 세, 네 trước đơn vị. Dùng 주세요 để gọi món lịch sự.',[['커피 두 잔 주세요.','Cho tôi hai ly cà phê.'],['이 빵은 얼마예요?','Bánh mì này bao nhiêu tiền?']],'Nói “hai ly” thế nào?',['두 잔','둘 잔','이 잔'],'둘 đổi thành 두 trước 잔.'),
lesson('directions',2,'Hỏi và chỉ đường','Dùng 어디에 있어요? để hỏi vị trí. Danh từ chỉ vị trí như 앞, 옆, 뒤 đặt sau địa điểm tham chiếu. Dùng -(으)세요 để chỉ dẫn lịch sự.',[['은행은 지하철역 옆에 있어요.','Ngân hàng ở cạnh ga tàu điện ngầm.'],['오른쪽으로 가세요.','Hãy đi về bên phải.']],'Điền: 은행은 역 ___에 있어요. (cạnh)',['옆','뒤','안'],'옆 nghĩa là bên cạnh.'),
lesson('travel',3,'Kể lại trải nghiệm','Dùng -아/어 본 적이 있다 để nói từng có trải nghiệm. Dùng 적이 없다 để nói chưa từng. -고 싶다 nói điều muốn làm.',[['제주도에 가 본 적이 있어요.','Tôi từng đi Jeju.'],['한복을 입어 본 적이 없어요.','Tôi chưa từng mặc hanbok.']],'Chọn câu diễn tả “từng thử ăn”.',['먹어 본 적이 있어요.','먹고 싶어요.','먹을 거예요.'],'-어 본 적이 있다 diễn tả trải nghiệm đã có.'),
lesson('notice',4,'Đọc thông báo và điều kiện','Khi đọc thông báo, tìm 대상 (đối tượng), 기간 (thời hạn) và phương thức. -에 한해 giới hạn đối tượng, -까지 chỉ mốc cuối.',[['신청은 금요일까지 받습니다.','Nhận đăng ký đến thứ Sáu.'],['회원에 한해 이용할 수 있습니다.','Chỉ thành viên mới có thể sử dụng.']],'Ai được sử dụng theo thông báo?',['Thành viên','Mọi người','Người đăng ký vào thứ Sáu'],'회원에 한해 giới hạn người dùng là thành viên.'),
lesson('argument',5,'Tổ chức đoạn văn nghị luận','Mở đầu bằng luận điểm, phát triển bằng lý do và ví dụ, rồi kết lại bằng hệ quả hoặc đề xuất. Dùng 반면에 để đối chiếu, 따라서 để suy ra kết luận.',[['온라인 학습은 편리하다. 반면에 집중하기 어려울 수 있다.','Học trực tuyến thuận tiện. Mặt khác, có thể khó tập trung.'],['따라서 학습 환경을 조성해야 한다.','Vì vậy cần tạo môi trường học tập.']],'Chọn từ nối để đưa ra kết luận.',['따라서','반면에','예를 들어'],'따라서 báo hiệu hệ quả hoặc kết luận.'),
lesson('critical',6,'Đọc lập luận và nhận diện sắc thái','Tách luận điểm của tác giả khỏi quan điểm được trích dẫn. Mẫu -다고 해서 반드시 … 것은 아니다 bác bỏ suy luận tuyệt đối từ một điều kiện.',[['기술이 발전한다고 해서 삶의 질이 반드시 높아지는 것은 아니다.','Công nghệ phát triển chưa chắc làm chất lượng cuộc sống tăng.'],['일률적인 기준보다는 상황에 맞는 접근이 필요하다.','Cần cách tiếp cận phù hợp hoàn cảnh hơn là một tiêu chuẩn đồng loạt.']],'Tác giả khẳng định điều gì về công nghệ?',['Tác động tích cực không tự động xảy ra.','Công nghệ luôn làm cuộc sống tốt hơn.','Công nghệ luôn làm cuộc sống xấu đi.'],'반드시 … 것은 아니다 phủ định tính tất yếu.')
];
export const grammar = [
lesson('topic',1,'은/는 và 이/가','은/는 nêu chủ đề hoặc tạo đối chiếu. 이/가 đánh dấu chủ ngữ, thường dùng khi xác định ai/cái gì hoặc giới thiệu thông tin mới. Sau phụ âm dùng 은 hoặc 이, sau nguyên âm dùng 는 hoặc 가.',[['저는 학생이에요.','Nói về tôi thì tôi là học sinh.'],['누가 왔어요? 민수가 왔어요.','Ai đến rồi? Minsu đến rồi.']],'Điền vào câu trả lời 누가 왔어요?: 유나___ 왔어요.',['가','이','를'],'유나 kết thúc bằng nguyên âm, dùng 가 để xác định người đến.'),
lesson('place',1,'에 và 에서','에 chỉ đích đến, vị trí tồn tại hoặc thời điểm. 에서 chỉ nơi hành động diễn ra. So sánh 있다 (tồn tại) với 공부하다 (hành động).',[['학교에 가요.','Tôi đi đến trường.'],['도서관에서 공부해요.','Tôi học ở thư viện.']],'Điền: 집___ 한국어를 공부해요.',['에서','에','를'],'공부하다 diễn ra tại một địa điểm nên dùng 에서.'),
lesson('past',2,'-았/었어요 và -고 있어요','-았/었어요 diễn tả việc quá khứ. Dùng -았 với nguyên âm thân từ ㅏ/ㅗ, -었 với nhóm còn lại, 했다 với 하다. -고 있어요 diễn tả hoạt động đang diễn ra.',[['어제 공부했어요.','Hôm qua tôi đã học.'],['지금 공부하고 있어요.','Bây giờ tôi đang học.']],'Điền vào 지금 책을 ___. (đang đọc)',['읽고 있어요','읽었어요','읽을 거예요'],'-고 있다 diễn tả hành động đang thực hiện.'),
lesson('reason',3,'-아/어서 và -(으)니까','Cả hai đều có thể nêu nguyên nhân. Khi nêu nguyên nhân dẫn đến lời đề nghị hay mệnh lệnh, dùng -(으)니까 tự nhiên hơn. -아/어서 thường nêu nguyên nhân của một kết quả.',[['비가 와서 길이 미끄러워요.','Trời mưa nên đường trơn.'],['비가 오니까 우산을 가져가세요.','Trời mưa nên hãy mang ô.']],'Chọn trước lời nhắc 우산을 가져가세요.',['비가 오니까','비가 오지만','비가 오려고'],'-(으)니까 phù hợp với lời nhắc dựa trên nguyên nhân.'),
lesson('despite',4,'-는데도 và -기 때문에','-는데도 diễn tả kết quả trái với kỳ vọng. -기 때문에 nêu nguyên nhân trực tiếp, phù hợp với giải thích trung tính trong văn viết.',[['열심히 준비했는데도 긴장했다.','Dù chuẩn bị kỹ, tôi vẫn căng thẳng.'],['눈이 오기 때문에 행사가 취소되었다.','Sự kiện bị hủy vì có tuyết.']],'Chọn đuôi để diễn tả “dù đã luyện nhiều”.',['연습했는데도','연습했기 때문에','연습하면'],'-는데도 đánh dấu sự trái kỳ vọng.'),
lesson('extent',5,'-을 뿐만 아니라 và -는 대신에','-을 뿐만 아니라 bổ sung một đặc điểm hoặc lợi ích. -는 대신에 thể hiện thay thế hoặc đánh đổi.',[['비용을 줄일 뿐만 아니라 시간을 절약한다.','Vừa giảm chi phí vừa tiết kiệm thời gian.'],['버스를 타는 대신에 걸어갔다.','Tôi đi bộ thay vì đi xe buýt.']],'Chọn cấu trúc để bổ sung một lợi ích.',['-을 뿐만 아니라','-는 대신에','-기 전에'],'-을 뿐만 아니라 liên kết hai thông tin bổ sung.'),
lesson('inference',6,'-기 마련이다 và -는 셈이다','-기 마련이다 diễn tả điều thường xảy ra theo lẽ tự nhiên. -는 셈이다 đưa ra đánh giá tương đương dựa trên dữ kiện.',[['처음에는 누구나 실수하기 마련이다.','Lúc đầu ai cũng thường mắc lỗi.'],['일주일에 다섯 번 가니 거의 매일 가는 셈이다.','Đi năm lần một tuần thì coi như đi gần mỗi ngày.']],'Chọn mẫu để nêu điều dễ xảy ra theo lẽ tự nhiên.',['-기 마련이다','-는 셈이다','-기 나름이다'],'-기 마련이다 diễn tả xu hướng thường được xem là tự nhiên.')
];
const words = [
[1,'Chào hỏi','안녕하세요','Xin chào','annyeonghaseyo','안녕하세요, 선생님.','Em chào thầy/cô.'],
[1,'Chào hỏi','감사합니다','Cảm ơn','gamsahamnida','도와주셔서 감사합니다.','Cảm ơn vì đã giúp tôi.'],
[1,'Chào hỏi','죄송합니다','Xin lỗi','joesonghamnida','늦어서 죄송합니다.','Xin lỗi vì đến muộn.'],
[1,'Sinh hoạt','학교','Trường học','hakgyo','학교에 가요.','Tôi đến trường.'],
[1,'Sinh hoạt','책','Sách','chaek','책을 읽어요.','Tôi đọc sách.'],
[1,'Sinh hoạt','친구','Bạn','chingu','친구를 만나요.','Tôi gặp bạn.'],
[1,'Sinh hoạt','집','Nhà','jip','집에 있어요.','Tôi ở nhà.'],
[1,'Sinh hoạt','공부하다','Học','gongbuhada','한국어를 공부해요.','Tôi học tiếng Hàn.'],
[1,'Ẩm thực','물','Nước','mul','물을 마셔요.','Tôi uống nước.'],
[1,'Ẩm thực','밥','Cơm','bap','밥을 먹어요.','Tôi ăn cơm.'],
[1,'Thời gian','오늘','Hôm nay','oneul','오늘 시간이 있어요?','Hôm nay bạn có thời gian không?'],
[1,'Thời gian','내일','Ngày mai','naeil','내일 봐요.','Hẹn gặp ngày mai.'],
[2,'Ẩm thực','계산','Thanh toán','gyesan','계산해 주세요.','Cho tôi thanh toán.'],
[2,'Địa điểm','지하철역','Ga tàu điện ngầm','jihacheolyeok','지하철역이 어디에 있어요?','Ga tàu điện ngầm ở đâu?'],
[2,'Địa điểm','오른쪽','Bên phải','oreunjjok','오른쪽으로 가세요.','Hãy đi về bên phải.'],
[2,'Thời gian','약속','Cuộc hẹn','yaksok','저녁에 약속이 있어요.','Tôi có hẹn buổi tối.'],
[3,'Sinh hoạt','경험','Kinh nghiệm','gyeongheom','좋은 경험이었어요.','Đó là một trải nghiệm tốt.'],
[3,'Địa điểm','숙소','Chỗ ở','sukso','숙소를 예약했어요.','Tôi đã đặt chỗ ở.'],
[4,'Văn viết','신청','Đăng ký','sincheong','신청은 금요일까지 가능합니다.','Có thể đăng ký đến thứ Sáu.'],
[4,'Văn viết','대상','Đối tượng','daesang','참가 대상을 확인하세요.','Hãy kiểm tra đối tượng tham gia.'],
[5,'Văn viết','근거','Căn cứ','geungeo','주장의 근거를 제시했다.','Tôi đã đưa ra căn cứ cho lập luận.'],
[5,'Văn viết','절약','Tiết kiệm','jeoryak','시간 절약이 중요하다.','Tiết kiệm thời gian là điều quan trọng.'],
[6,'Văn viết','타당성','Tính xác đáng','tadangseong','정책의 타당성을 검토한다.','Xem xét tính xác đáng của chính sách.'],
[6,'Văn viết','일률적','Đồng loạt','illyuljeok','일률적인 기준을 적용했다.','Đã áp dụng một tiêu chuẩn đồng loạt.']
];
export const vocabulary = words.map(([level, topic, ko, vi, roman, example, translation], i) =>
  ({id:'w'+i, level, topic, ko, vi, roman, example, translation}));

export const sentences = [
  {level:1, prompt:'Tôi đọc sách ở nhà.', parts:['저는','집에서','책을','읽어요.']},
  {level:1, prompt:'Ngày mai tôi gặp bạn.', parts:['내일','친구를','만나요.']},
  {level:2, prompt:'Cho tôi hai ly cà phê.', parts:['커피','두 잔','주세요.']},
  {level:3, prompt:'Tôi từng đi Jeju.', parts:['제주도에','가 본','적이','있어요.']},
  {level:4, prompt:'Chỉ thành viên mới có thể sử dụng.', parts:['회원에','한해','이용할','수 있습니다.']},
  {level:5, prompt:'Vì vậy cần tạo môi trường học tập.', parts:['따라서','학습 환경을','조성해야','한다.']},
  {level:6, prompt:'Cần cách tiếp cận phù hợp hoàn cảnh.', parts:['상황에','맞는','접근이','필요하다.']}
];
export const topik = [
  {level:1, prompt:'어디에 가요? 책을 빌리러 가요.', options:['도서관','은행','식당','병원'], explanation:'책을 빌리다 nghĩa là mượn sách, nên địa điểm phù hợp là thư viện.'},
  {level:2, prompt:'도서관 안내: 월요일은 쉽니다. 화요일부터 일요일까지 오전 9시에 문을 엽니다. 내용과 같은 것을 고르십시오.', options:['화요일 오전 9시에 문을 엽니다.','월요일에 책을 빌릴 수 있습니다.','일요일은 쉽니다.','오후 9시에 문을 엽니다.'], explanation:'Thư viện nghỉ thứ Hai và mở lúc 9 giờ sáng từ thứ Ba đến Chủ nhật.'},
  {level:3, prompt:'처음에는 자전거로 출퇴근하는 것이 힘들었다. 하지만 한 달쯤 지나자 체력이 좋아졌고 교통비도 줄었다. 글쓴이의 생각으로 알맞은 것을 고르십시오.', options:['자전거 출퇴근에는 좋은 점이 있다.','자전거 출퇴근은 처음부터 쉬웠다.','교통비가 더 많이 들었다.','한 달 만에 자전거를 그만두었다.'], explanation:'Người viết kể hai lợi ích sau một tháng là thể lực tốt hơn và giảm chi phí đi lại.'},
  {level:4, prompt:'자료를 공개하는 것만으로는 시민의 참여를 이끌어 내기 어렵다. 시민이 자료를 이해하고 활용할 수 있도록 쉬운 설명도 제공해야 한다. 글의 중심 생각은 무엇입니까?', options:['자료 공개와 함께 이해를 돕는 설명이 필요하다.','자료를 공개해서는 안 된다.','시민의 참여를 제한해야 한다.','쉬운 설명보다 자료의 양을 늘려야 한다.'], explanation:'Tác giả đề nghị cung cấp lời giải thích dễ hiểu cùng với việc công khai dữ liệu.'},
  {level:5, prompt:'회의를 줄이면 업무에 집중할 시간이 늘어난다. ( ㉠ ) 소통이 부족해져 같은 일을 반복할 수도 있다. 따라서 회의의 횟수뿐 아니라 목적도 점검해야 한다. ㉠에 알맞은 것을 고르십시오.', options:['그러나','따라서','예를 들어','다시 말해'], explanation:'Câu sau nêu bất lợi đối chiếu với lợi ích ở câu trước, nên dùng 그러나.'},
  {level:6, prompt:'평가 지표는 성과를 비교하는 데 유용하다. 그러나 지표 자체가 목표가 되면 수치로 드러나지 않는 성과가 소홀해지기 쉽다. 글쓴이의 태도로 가장 알맞은 것은?', options:['지표의 효용을 인정하면서 남용을 경계한다.','수치화 자체를 전면 부정한다.','지표에 나타난 성과만 인정해야 한다고 본다.','성과를 비교하는 일은 불가능하다고 단정한다.'], explanation:'Tác giả công nhận giá trị của chỉ số và cảnh báo việc biến chỉ số thành mục tiêu.'}
];

export const cloze = [
  {level:1, question:'아침 일곱 시___ 일어나요.', answer:'에', explanation:'에 đánh dấu thời điểm thức dậy.'},
  {level:1, question:'저는 유나___. (Tôi là Yuna.)', answer:'예요', explanation:'유나 kết thúc bằng nguyên âm nên dùng 예요.'},
  {level:2, question:'커피 ___ 잔 주세요. (hai ly)', answer:'두', explanation:'둘 đổi thành 두 trước danh từ chỉ đơn vị 잔.'},
  {level:3, question:'제주도에 가 본 ___ 있어요. (Tôi từng đi Jeju.)', answer:'적이', explanation:'-아/어 본 적이 있다 diễn tả trải nghiệm đã có.'},
  {level:4, question:'회원에 ___ 이용할 수 있습니다. (Chỉ thành viên mới dùng được.)', answer:'한해', explanation:'-에 한해 giới hạn đối tượng được sử dụng.'},
  {level:5, question:'온라인 학습은 편리하다. ___, 집중하기 어려울 수 있다. (Mặt khác)', answer:'반면에', explanation:'반면에 đưa ra mặt đối chiếu.'},
  {level:6, question:'누구나 처음에는 실수하기 ___. (Lúc đầu ai cũng thường mắc lỗi.)', answer:'마련이다', explanation:'-기 마련이다 nói đến điều thường xảy ra.'}
];
