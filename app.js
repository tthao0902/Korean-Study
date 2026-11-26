import { stages, lessons, grammar, vocabulary, sentences, topik, cloze } from './content.js';

const icons = {
  home:'M3 10l9-7 9 7v10H3z M9 20v-7h6v7',
  roadmap:'M5 4h4v4H5z M15 16h4v4h-4z M9 6h7a3 3 0 010 6H8a3 3 0 000 6h7',
  vocab:'M3 5h6a3 3 0 013 3v13a3 3 0 00-3-3H3z M21 5h-6a3 3 0 00-3 3v13a3 3 0 013-3h6z',
  review:'M3 7h15v13H3z M7 7V4h14v12h-3 M7 12h7 M7 16h4',
  grammar:'M5 3h14v18H5z M8 8h8 M8 12h8 M8 16h5',
  practice:'M13 2L4 14h7l-1 8 10-12h-7z',
  settings:'M12 3v3m0 12v3M3 12h3m12 0h3M6 6l2 2m8 8 2 2m0-12-2 2m-8 8-2 2 M16 12a4 4 0 11-8 0 4 4 0 018 0',
  moon:'M20 15a8.5 8.5 0 01-11-11 8.5 8.5 0 1011 11z',
  sun:'M12 2v2m0 16v2M2 12h2m16 0h2M5 5l2 2m10 10 2 2m0-14-2 2M7 17l-2 2m11-5a4 4 0 11-8 0 4 4 0 018 0',
  fire:'M12 3c1 5 6 6 6 11a6 6 0 11-12 0c0-2 1-4 3-6 0 3 1 3 1 3 2-2 2-5 2-8z',
  clock:'M21 12a9 9 0 11-18 0 9 9 0 0118 0 M12 7v5l3 2',
  arrow:'M4 12h15m-6-6 6 6-6 6',
  sound:'M3 9h4l5-4v14l-5-4H3z M16 9a4 4 0 010 6 M19 6a8 8 0 010 12',
  star:'M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9z',
  check:'M5 12l4 4L19 6',
  menu:'M4 6h16M4 12h16M4 18h16'
};
const icon = name => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${icons[name]}"/></svg>`;
const nav = {home:'Tổng quan', roadmap:'Lộ trình học', vocab:'Từ vựng', review:'Flashcards', grammar:'Ngữ pháp', practice:'Luyện tập', settings:'Mục tiêu học tập'};
const $ = selector => document.querySelector(selector);
const safe = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const shuffle = values => {
  const result = [...values];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};
const key = 'haru-study-v1';
const dayKey = (offset = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-');
};
const state = {goal:15, target:1, theme:'light', xp:0, days:{}, completed:{}, mistakes:{}, cards:{}, favorites:{}, custom:[]};
let storageFailed = false;
try { Object.assign(state, JSON.parse(localStorage.getItem(key)) ?? {}); }
catch { storageFailed = true; }
let noticeTimer;
function notice(message) {
  $('#notice').textContent = message;
  clearTimeout(noticeTimer);
  noticeTimer = setTimeout(() => { $('#notice').textContent = ''; }, 4500);
}
function save() {
  try { localStorage.setItem(key, JSON.stringify(state)); }
  catch {
    if (!storageFailed) notice('Không thể lưu vào trình duyệt. Tiến độ chỉ giữ trong phiên này.');
    storageFailed = true;
  }
}
function gain(xp) {
  state.xp += xp;
  const today = state.days[dayKey()] ??= {seconds:0, xp:0};
  today.xp += xp;
  save();
}
const words = () => vocabulary.concat(state.custom);
const mastered = () => words().filter(w => state.cards[w.id]?.box >= 3).length;
const isDue = w => !state.cards[w.id] || state.cards[w.id].due <= Date.now();
const dueWords = () => words().filter(isDue).sort((a,b) => (state.cards[a.id]?.due ?? Infinity) - (state.cards[b.id]?.due ?? Infinity));
const level = () => Math.floor(state.xp / 100) + 1;
const secondsToday = () => state.days[dayKey()]?.seconds ?? 0;
function streak() {
  const active = offset => {
    const day = state.days[dayKey(offset)];
    return day && (day.xp > 0 || day.seconds >= 60);
  };
  let offset = active(0) ? 0 : -1;
  const start = offset;
  while (active(offset)) offset--;
  return start - offset;
}
const badge = (name, warm = false) => `<span class="badge-icon${warm?' warm':''}">${icon(name)}</span>`;
const title = (head, desc) => `<div class="page-head"><div class="eyebrow">Haru · 하루</div><h1>${head}</h1><p>${desc}</p></div>`;
const sound = text => `<button class="icon-button" data-sound="${safe(text)}" aria-label="Nghe phát âm ${safe(text)}">${icon('sound')}</button>`;
const targetLevel = (selected, all = false) => (all ? '<option value="">Mọi cấp độ</option>' : '') +
  stages.slice(1).map((stage, i) => `<option value="${i+1}" ${String(selected) === String(i+1)?'selected':''}>${stage}</option>`).join('');
const progress = (value,max,label) => `<progress class="progress" value="${value}" max="${max}" aria-label="${label}"></progress>`;

let page = 'home';
let detail = '';
let quiz;
let flashId;
let flipped = false;
let practiceMode = 'match';
let practiceLevel = 1;
let practiceScore = {answered:0, correct:0};
const modes = {match:'Ghép từ và nghĩa', listen:'Nghe và chọn', order:'Sắp xếp câu', fill:'Điền từ', vocab:'Kiểm tra từ vựng', grammar:'Kiểm tra ngữ pháp', topik:'Đọc kiểu TOPIK'};
const filters = {search:'',topic:'',level:'',status:''};

function updateHeader() {
  $('#header-streak').innerHTML = icon('fire') + ' ' + streak() + ' ngày';
  const dark = state.theme === 'dark';
  document.documentElement.dataset.theme = state.theme;
  $('#theme').innerHTML = icon(dark?'sun':'moon') + (dark?'Chế độ sáng':'Chế độ tối');
  $('#theme').setAttribute('aria-pressed', String(dark));
}
function recommendation() {
  const pending = lessons.filter(item => item.level <= state.target && !state.completed[item.id]);
  const hangul = pending.find(item => item.level === 0);
  const weak = [...lessons, ...grammar].filter(item => item.level <= state.target && state.mistakes[item.id] > 0)
    .sort((a,b) => state.mistakes[b.id] - state.mistakes[a.id])[0];
  return hangul ?? weak ?? pending[0];
}
function home() {
  const item = recommendation();
  const itemRoute = item ? (grammar.includes(item) ? 'grammar' : 'roadmap') + '/' + item.id : 'review';
  const eligible = lessons.filter(l => l.level <= state.target);
  const done = eligible.filter(l => state.completed[l.id]).length;
  const mins = Math.floor(secondsToday()/60);
  const stats = [
    ['vocab',mastered(),'Từ đã thuộc',false],
    ['clock',mins+' phút','Học hôm nay',false],
    ['practice',state.xp+' XP','Tổng điểm kinh nghiệm',true],
    ['star','Level '+level(),'Mỗi 100 XP lên một cấp',false]
  ];
  const bars = Array.from({length:7}, (_,i) => {
    const date = new Date();
    date.setDate(date.getDate()+i-6);
    return {minutes:Math.round((state.days[dayKey(i-6)]?.seconds ?? 0)/60), label:date.toLocaleDateString('vi-VN',{weekday:'short'})};
  });
  const max = Math.max(state.goal,...bars.map(b => b.minutes));
  return title('Chào bạn, 안녕하세요!', 'Bắt đầu từ Hangul và tiến từng bước đến mục tiêu tiếng Hàn của bạn.') +
    `<section class="hero"><div class="hero-copy"><div class="eyebrow">${item ? 'Bài học đề xuất · '+stages[item.level] : 'Ôn tập hôm nay'}</div>
    <h2>${item?.title ?? 'Củng cố từ vựng'}</h2><p>${item ? (state.mistakes[item.id] ? 'Ôn lại nội dung bạn từng trả lời sai.' : 'Đọc giải thích, nghe ví dụ và thử một câu hỏi ngắn.') : 'Mở flashcards để ôn những từ đã đến hạn.'}</p>
    <a class="btn primary" href="#${itemRoute}">${item ? (state.completed[item.id]?'Ôn lại bài':'Vào bài học') : 'Mở flashcards'} ${icon('arrow')}</a></div>
    <div class="hero-art" aria-hidden="true"><span class="orbit"></span><span class="orbit"></span><span class="tile tile-a" lang="ko">한</span><span class="tile tile-b" lang="ko">글</span><span class="spark">✦</span></div></section>
    <div class="section-head"><h2>Tiến độ của bạn</h2><a class="text-link" href="#roadmap">Xem lộ trình →</a></div><div class="stats">
    ${stats.map(([name,value,label,warm]) => `<div class="card stat">${badge(name,warm)}<strong ${name==='clock'?'id="stat-today"':''}>${value}</strong><small>${label}</small></div>`).join('')}</div>
    <div class="grid spaced"><section class="card"><div class="row between"><h3>Mục tiêu hằng ngày</h3><a class="text-link" href="#settings">Chỉnh sửa</a></div>
    <p><strong id="today-minutes">${mins}</strong> / ${state.goal} phút hôm nay</p><div class="spaced" id="daily-progress">${progress(Math.min(mins,state.goal),state.goal,'Mục tiêu hằng ngày')}</div>
    <p class="spaced">${done}/${eligible.length} bài trong lộ trình đến ${stages[state.target]}</p>${progress(done,eligible.length,'Tiến độ lộ trình')}</section>
    <section class="card"><h3>Thời gian học · 7 ngày</h3><div class="bars">${bars.map((b,i) => `<div ${i===6?'id="today-bar"':''} aria-label="${b.label}, ${b.minutes} phút"><small>${b.minutes}p</small><div class="bar"><i style="height:${b.minutes/max*100}%"></i></div><small>${b.label}</small></div>`).join('')}</div></section></div>
    <div class="section-head"><h2>Học nhanh</h2></div><div class="shortcuts">
    ${[['review','Flashcards',dueWords().length+' thẻ khả dụng'],['vocab','Từ vựng','Khám phá theo chủ đề'],['practice','Luyện tập','Nghe, đọc và làm bài']].map(([route,label,desc]) => `<a class="card action-card" href="#${route}">${badge(route)}<span><strong>${label}</strong><small class="subtle">${desc}</small></span><span class="arrow">${icon('arrow')}</span></a>`).join('')}</div>`;
}
function listLessons() {
  const source = page === 'grammar' ? grammar : lessons;
  return title(nav[page], page === 'grammar' ? 'So sánh cấu trúc, đọc ví dụ và làm bài sau mỗi chủ điểm.' : 'Học Hangul, giao tiếp sơ cấp, rồi luyện kỹ năng theo các cấp TOPIK.') +
    stages.map((stage,index) => {
      const items = source.filter(item => item.level === index);
      if (!items.length) return '';
      const count = items.filter(item => state.completed[item.id]).length;
      return `<section class="stage"><div class="section-head"><h2>${stage}${index? ' · TOPIK '+(index<=2?'I':'II'):''}</h2><span class="pill">${count}/${items.length} hoàn thành</span></div><div class="stack">${items.map(item => `<a class="card lesson" href="#${page}/${item.id}">${badge(state.completed[item.id]?'check':page)}<div><h3>${item.title}</h3><small class="subtle">${state.mistakes[item.id]?'Nên ôn lại':'Giải thích · Ví dụ · Bài tập'}</small></div>${icon('arrow')}</a>`).join('')}</div></section>`;
    }).join('');
}
function lessonPage(item) {
  const source = page === 'grammar' ? grammar : lessons;
  const next = source[source.indexOf(item)+1];
  return `<a class="text-link" href="#${page}">← ${nav[page]}</a>` +
    title(item.title, stages[item.level]) +
    `<article class="card content-card stack"><h2>Giải thích</h2><p>${item.text}</p><h3>Ví dụ</h3><ul class="examples">${item.examples.map(([ko,vi]) => `<li class="row between"><div><span lang="ko">${ko}</span><p>${vi}</p></div>${sound(ko.split(' [')[0].split(' =')[0])}</li>`).join('')}</ul>
    <h3>Bài tập</h3>${quizMarkup(quiz)}
    ${quiz.correct === false ? '<button class="btn" data-retry>Thử lại</button>' : ''}
    ${quiz.correct && next ? `<a href="#${page}/${next.id}" class="btn primary">Bài tiếp theo ${icon('arrow')}</a>` : ''}</article>`;
}
function status(w) {
  const box = state.cards[w.id]?.box ?? 0;
  return box >= 3 ? 'known' : box > 0 ? 'learning' : 'new';
}
const labels = {new:'Chưa thuộc',learning:'Đang học',known:'Đã thuộc',favorite:'Yêu thích'};
function vocabPage() {
  const topics = [...new Set(words().map(w => w.topic))].sort((a,b) => a.localeCompare(b,'vi'));
  return title('Từ vựng', 'Nghe phát âm, đọc ngữ cảnh và lưu những từ bạn muốn học.') +
    `<details class="card"><summary>Thêm từ cá nhân</summary><form id="add-word" class="stack spaced"><div class="grid">
    <label class="field">Từ tiếng Hàn<input name="ko" required maxlength="80" lang="ko"></label>
    <label class="field">Nghĩa tiếng Việt<input name="vi" required maxlength="120"></label>
    <label class="field">Phiên âm<input name="roman" maxlength="100" placeholder="Không bắt buộc"></label>
    <label class="field">Chủ đề<input name="topic" required maxlength="50"></label>
    <label class="field">Cấp độ<select name="level">${targetLevel(state.target)}</select></label>
    <label class="field">Câu ví dụ<input name="example" maxlength="180" lang="ko"></label>
    <label class="field">Dịch câu ví dụ<input name="translation" maxlength="180"></label></div>
    <button class="btn primary" type="submit">Lưu từ</button></form></details>
    <div class="filters"><input type="search" id="search" aria-label="Tìm từ" placeholder="Tìm từ hoặc nghĩa…" value="${safe(filters.search)}">
    <select id="topic" aria-label="Chủ đề"><option value="">Mọi chủ đề</option>${topics.map(t => `<option ${t===filters.topic?'selected':''} value="${safe(t)}">${safe(t)}</option>`).join('')}</select>
    <select id="filter-level" aria-label="Cấp độ">${targetLevel(filters.level,true)}</select>
    <select id="status" aria-label="Trạng thái"><option value="">Mọi trạng thái</option>${Object.entries(labels).map(([id,label]) => `<option ${id===filters.status?'selected':''} value="${id}">${label}</option>`).join('')}</select></div>
    <p id="word-count" class="subtle" aria-live="polite"></p><div id="word-list" class="grid spaced"></div>`;
}
function renderWords() {
  const query = filters.search.trim().toLocaleLowerCase('vi').normalize('NFC');
  const found = words().filter(w => (!filters.topic || w.topic===filters.topic) && (!filters.level || w.level===Number(filters.level)) &&
    (!filters.status || (filters.status==='favorite' ? state.favorites[w.id] : status(w)===filters.status)) &&
    [w.ko,w.vi,w.roman].some(value => value.toLocaleLowerCase('vi').normalize('NFC').includes(query)));
  $('#word-count').textContent = found.length + ' từ';
  $('#word-list').innerHTML = found.length ? found.map(w => `<article class="card vocab">
    <div class="row between"><span class="pill">${stages[w.level]} · ${safe(w.topic)}</span><div class="row">${sound(w.ko)}<button class="icon-button ${state.favorites[w.id]?'selected':''}" data-favorite="${w.id}" aria-label="Yêu thích ${safe(w.ko)}" aria-pressed="${Boolean(state.favorites[w.id])}">${icon('star')}</button></div></div>
    <h3 class="korean" lang="ko">${safe(w.ko)}</h3><p><strong>${safe(w.vi)}</strong> ${w.roman ? '· '+safe(w.roman):''}</p>
    ${w.example ? `<p lang="ko">${safe(w.example)}</p>` : ''}${w.translation ? `<p>${safe(w.translation)}</p>`:''}
    <small class="subtle">${labels[status(w)]}</small></article>`).join('') : '<p class="card empty">Không tìm thấy từ phù hợp.</p>';
}
function review() {
  const due = dueWords();
  const w = due.find(item => item.id === flashId) ?? due[0];
  flashId = w?.id;
  const counts = Object.keys(labels).slice(0,3).map(s => `<span class="pill">${labels[s]} · ${words().filter(w => status(w)===s).length}</span>`).join('');
  return title('Flashcards', 'Ôn tập ngắt quãng. Tự đánh giá sau khi xem mặt sau của thẻ.') +
    `<div class="card content-card stack"><div class="row between"><div class="row">${counts}</div><span class="pill warm">${due.length} thẻ khả dụng</span></div>
    ${w ? `<button class="flash" data-flip aria-label="${flipped?'Xem mặt trước':'Lật thẻ xem nghĩa'}"><strong ${flipped?'':'lang="ko"'}>${safe(flipped?w.vi:w.ko)}</strong>
    <small>${flipped?safe(w.roman || w.ko):'Chạm để xem nghĩa'}</small>
    ${flipped && w.example ? `<span lang="ko">${safe(w.example)}</span>`:''}
    ${flipped && w.translation ? `<small>${safe(w.translation)}</small>`:''}</button>
    <div class="row">${sound(w.ko)}${flipped ? '<button class="btn" data-rate="again">Chưa thuộc</button><button class="btn" data-rate="hard">Còn khó</button><button class="btn primary" data-rate="good">Nhớ rồi</button>' : '<p>Lật thẻ để chấm mức độ ghi nhớ.</p>'}</div>` :
    '<p class="empty">Bạn đã ôn hết thẻ đến hạn. Quay lại khi có thẻ mới hoặc thêm từ của riêng bạn.</p><a class="btn" href="#vocab">Mở từ vựng</a>'}</div>`;
}
function makeQuiz(item, prompt = item.question) {
  return {prompt, options:shuffle([...new Set(item.choices)]), answer:item.answer, explanation:item.explanation, item};
}
function practiceQuiz() {
  const pool = words().filter(w => w.level === practiceLevel);
  const weakFirst = (items, keyFor) => shuffle(items).sort((a,b) => (state.mistakes[keyFor(b)] ?? 0) - (state.mistakes[keyFor(a)] ?? 0))[0];
  if (practiceMode === 'grammar') {
    const item = weakFirst(grammar.filter(item => item.level === practiceLevel), item => item.id);
    return makeQuiz(item);
  }
  if (practiceMode === 'fill') {
    const item = weakFirst(cloze.filter(item => item.level === practiceLevel), item => item.question);
    return {prompt:item.question, answer:item.answer, explanation:item.explanation, typed:true, practiceKey:item.question};
  }
  if (practiceMode === 'order') {
    const item = weakFirst(sentences.filter(item => item.level === practiceLevel), item => 'order-'+item.prompt);
    return {prompt:item.prompt, parts:shuffle(item.parts), selected:[], answer:item.parts.join(' '), practiceKey:'order-'+item.prompt, explanation:'Câu mẫu: '+item.parts.join(' ')};
  }
  if (practiceMode === 'topik') {
    const item = topik.find(item => item.level === practiceLevel);
    return {prompt:item.prompt, options:shuffle(item.options), answer:item.options[0], explanation:item.explanation, ko:true};
  }
  const w = weakFirst(pool, item => item.id);
  const reverse = practiceMode === 'vocab';
  const field = reverse ? 'ko' : 'vi';
  const answer = w[field];
  const distractors = shuffle([...new Set([...pool,...words()].map(item => item[field]))].filter(value => value !== answer)).slice(0,3);
  return {prompt:practiceMode === 'listen' ? 'Nghe từ và chọn nghĩa tiếng Việt.' : (reverse ? w.vi : w.ko),
    audio:practiceMode === 'listen' ? w.ko : '', practiceKey:w.id, options:shuffle([answer,...distractors]), answer,
    ko:practiceMode === 'match', optionsKo:reverse, explanation:w.ko+' — '+w.vi+(w.example?' · '+w.example:'')};
}
function quizMarkup(q) {
  const answered = q.correct !== undefined;
  const order = q.parts ? `<div class="card row" aria-label="Câu đang sắp xếp">${q.selected.length ? q.selected.map((i,index) => `<button class="btn selected" data-unpick="${index}" lang="ko" ${answered?'disabled':''}>${safe(q.parts[i])}</button>`).join('') : '<p>Chọn từng cụm từ theo thứ tự.</p>'}</div>
    <div class="row spaced">${q.parts.map((part,i) => `<button class="btn" data-pick="${i}" lang="ko" ${q.selected.includes(i)||answered?'disabled':''}>${safe(part)}</button>`).join('')}</div>
    <button class="btn primary spaced" data-check ${q.selected.length!==q.parts.length||answered?'disabled':''}>Kiểm tra câu</button>` : '';
  const typed = q.typed ? `<form id="cloze" class="row spaced"><label class="field">Từ còn thiếu<input name="response" lang="ko" required maxlength="80" value="${safe(q.response)}" ${answered?'disabled':''}></label><button class="btn primary" type="submit" ${answered?'disabled':''}>Kiểm tra</button></form>` : '';
  return `<div class="row"><strong ${q.ko?'lang="ko"':''}>${safe(q.prompt)}</strong>${q.audio ? sound(q.audio) : ''}</div>
    ${order || typed || `<div class="choices">${q.options.map((option,i) => `<button data-answer="${i}" class="btn ${answered&&option===q.answer?'selected':''}" ${q.optionsKo?'lang="ko"':''} ${answered?'disabled':''}>${safe(option)}</button>`).join('')}</div>`}
    ${answered ? `<p role="status" class="feedback ${q.correct?'':'wrong'}">${q.correct?'Chính xác!':'Chưa đúng.'} ${q.typed && !q.correct ? 'Đáp án: '+safe(q.answer)+'. ' : ''}${safe(q.explanation)}</p>` : ''}`;
}
function practice() {
  return title('Luyện tập', 'Tập nghe, ghép nghĩa, dựng câu và đọc câu hỏi theo dạng TOPIK.') +
    `<div class="card content-card stack"><div class="row">${Object.entries(modes).map(([id,label]) =>
    `<button class="btn ${id===practiceMode?'selected':''}" data-mode="${id}" aria-pressed="${id===practiceMode}">${label}</button>`).join('')}</div>
    <label class="field">Cấp độ luyện tập<select id="practice-level">${targetLevel(practiceLevel)}</select></label>
    <div class="row between"><h2>${modes[practiceMode]}</h2><span class="pill">${practiceScore.correct}/${practiceScore.answered} đúng trong lượt này</span></div>
    ${quizMarkup(quiz)}
    ${quiz?.correct !== undefined ? '<button class="btn primary" data-retry>Câu tiếp theo '+icon('arrow')+'</button>' : ''}</div>`;
}
function settings() {
  return title('Mục tiêu học tập', 'Chọn số phút mỗi ngày và cấp độ đích để điều chỉnh gợi ý bài học.') +
    `<form class="card content-card stack" id="settings-form"><label class="field">Số phút mỗi ngày
    <input type="number" name="goal" value="${state.goal}" min="1" max="180" step="1" required></label>
    <label class="field">Cấp độ đích<select name="target">${targetLevel(state.target)}</select></label>
    <button type="submit" class="btn primary">Lưu mục tiêu</button><p>Tiến độ được lưu trong trình duyệt này.</p></form>`;
}
function render(focus = false) {
  $('#navigation').innerHTML = '<div class="nav-label">KHÔNG GIAN HỌC</div>' + Object.entries(nav).map(([id,label]) =>
    `<a href="#${id}" class="nav-link" ${page===id?'aria-current="page"':''}>${icon(id)} ${label}</a>`).join('');
  $('#breadcrumb').textContent = nav[page];
  updateHeader();
  const selected = (page==='grammar'?grammar:lessons).find(item => item.id===detail);
  const views = {home, roadmap:listLessons, grammar:listLessons, vocab:vocabPage, review, practice, settings};
  $('#main').innerHTML = selected ? lessonPage(selected) : views[page]();
  if (page === 'vocab') renderWords();
  if (focus) {
    $('#main').focus({preventScroll:true});
    window.scrollTo(0,0);
  }
}
function route(focus) {
  const [target,id] = location.hash.slice(1).split('/');
  if (target === 'main') return;
  page = Object.hasOwn(nav,target) ? target : 'home';
  const source = page==='grammar' ? grammar : page==='roadmap' ? lessons : [];
  const item = source.find(l => l.id===id);
  detail = item?.id ?? '';
  quiz = item ? makeQuiz(item) : undefined;
  if (page === 'practice') {
    practiceLevel = state.target;
    practiceScore = {answered:0,correct:0};
    quiz = practiceQuiz();
  }
  flipped = false;
  flashId = undefined;
  setMenu(false);
  render(focus);
}
function setMenu(open) {
  $('.sidebar').classList.toggle('open',open);
  $('#menu').setAttribute('aria-expanded',String(open));
}
function speak(value) {
  if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
    notice('Thiết bị này không hỗ trợ phát âm. Hãy xem phiên âm hoặc câu ví dụ.');
    return;
  }
  const engine = window.speechSynthesis;
  const voices = engine.getVoices();
  const voice = voices.find(v => /^ko(?:[-_]|$)/i.test(v.lang));
  if (voices.length && !voice) {
    notice('Chưa có giọng tiếng Hàn. Hãy thêm giọng Hàn trong cài đặt thiết bị.');
    return;
  }
  engine.cancel();
  const utterance = new SpeechSynthesisUtterance(value);
  utterance.lang = 'ko-KR';
  if (voice) utterance.voice = voice;
  utterance.rate = .85;
  utterance.onerror = e => {
    if (!['canceled','interrupted'].includes(e.error)) notice('Không phát được âm thanh. Hãy kiểm tra giọng tiếng Hàn trên thiết bị.');
  };
  engine.speak(utterance);
}
function answer(value) {
  if (!quiz || quiz.correct !== undefined) return;
  quiz.correct = value === quiz.answer;
  const id = quiz.item?.id ?? quiz.practiceKey;
  if (id) state.mistakes[id] = quiz.correct ? Math.max(0,(state.mistakes[id] ?? 0)-1) : (state.mistakes[id] ?? 0)+1;
  if (page === 'practice') {
    practiceScore.answered++;
    if (quiz.correct) practiceScore.correct++;
  }
  let xp = quiz.correct ? 5 : 0;
  if (detail && quiz.correct && !state.completed[detail]) {
    state.completed[detail] = true;
    xp = 20;
  }
  gain(xp);
  render();
  $('.feedback').setAttribute('tabindex','-1');
  $('.feedback').focus({preventScroll:true});
}
const intervals = [0,1,3,7,14,30,60];
function rate(choice) {
  const box = state.cards[flashId]?.box ?? 0;
  const next = choice==='again' ? 0 : choice==='hard' ? Math.max(1,box-1) : Math.min(box+1,intervals.length-1);
  const delay = choice==='again' ? 10*60000 : choice==='hard' ? 6*3600000 : intervals[next]*86400000;
  state.cards[flashId] = {box:next, due:Date.now()+delay};
  flipped = false;
  flashId = undefined;
  gain(choice==='good'?5:2);
  render();
  $('[data-flip]')?.focus();
}
$('#menu').innerHTML = icon('menu');
$('#menu').addEventListener('click', () => setMenu($('#menu').getAttribute('aria-expanded')==='false'));
$('#theme').addEventListener('click', () => {
  state.theme = state.theme==='dark'?'light':'dark';
  save();
  updateHeader();
});
$('#main').addEventListener('click', e => {
  const button = e.target.closest('button');
  if (!button || button.disabled) return;
  const data = button.dataset;
  if ('sound' in data) speak(data.sound);
  if ('favorite' in data) {
    state.favorites[data.favorite] = !state.favorites[data.favorite];
    save();
    renderWords();
    $(`[data-favorite="${data.favorite}"]`)?.focus();
  }
  if ('flip' in data) {
    flipped = !flipped;
    render();
    $('[data-flip]')?.focus();
  }
  if ('rate' in data && flipped && flashId) rate(data.rate);
  if ('answer' in data) answer(quiz.options[Number(data.answer)]);
  if ('pick' in data) {
    quiz.selected.push(Number(data.pick));
    render();
    ($('[data-pick]:not(:disabled)') ?? $('[data-check]'))?.focus();
  }
  if ('unpick' in data) {
    quiz.selected.splice(Number(data.unpick),1);
    render();
    $('[data-pick]:not(:disabled)')?.focus();
  }
  if ('check' in data) answer(quiz.selected.map(i => quiz.parts[i]).join(' '));
  if ('mode' in data || 'retry' in data) {
    if ('mode' in data && practiceMode !== data.mode) {
      practiceMode = data.mode;
      practiceScore = {answered:0,correct:0};
    }
    if ('retry' in data && detail) {
      quiz = makeQuiz(quiz.item);
    } else {
      quiz = practiceQuiz();
    }
    render();
    if ('mode' in data) $(`[data-mode="${data.mode}"]`)?.focus();
    else ($('[data-answer]') ?? $('[data-pick]') ?? $('#cloze input'))?.focus();
  }
});
$('#main').addEventListener('input', e => {
  if (e.target.id==='search') {
    filters.search = e.target.value;
    renderWords();
  }
});
$('#main').addEventListener('change', e => {
  const id = e.target.id;
  const fields = {topic:'topic','filter-level':'level',status:'status'};
  if (Object.hasOwn(fields,id)) {
    filters[fields[id]] = e.target.value;
    renderWords();
  }
  if (id==='practice-level') {
    practiceLevel = Number(e.target.value);
    practiceScore = {answered:0,correct:0};
    quiz = practiceQuiz();
    render();
    $('#practice-level').focus();
  }
});
$('#main').addEventListener('submit', e => {
  e.preventDefault();
  const fields = Object.fromEntries([...new FormData(e.target)].map(([name,value]) => [name,value.trim()]));
  if (e.target.id==='cloze') {
    quiz.response = fields.response;
    answer(fields.response.normalize('NFC').replace(/[.!?。]$/,''));
  }
  if (e.target.id==='settings-form') {
    state.goal = Number(fields.goal);
    state.target = Number(fields.target);
    save();
    notice('Đã cập nhật mục tiêu.');
  }
  if (e.target.id==='add-word') {
    if (!fields.ko || !fields.vi || !fields.topic) {
      notice('Nhập từ, nghĩa và chủ đề để lưu.');
      return;
    }
    if (words().some(w => w.ko.normalize('NFC') === fields.ko.normalize('NFC') && w.vi.toLowerCase() === fields.vi.toLowerCase())) {
      notice('Từ và nghĩa này đã có trong danh sách.');
      return;
    }
    const id = 'u-'+Array.from(crypto.getRandomValues(new Uint32Array(3))).join('-');
    state.custom.push({...fields, id, level:Number(fields.level)});
    Object.assign(filters,{search:fields.ko,topic:'',level:'',status:''});
    save();
    render();
    $('#search').focus();
    notice('Đã lưu từ mới. Thẻ đã có trong Flashcards.');
  }
});
let lastActivity = Date.now();
for (const event of ['pointerdown','keydown','scroll']) {
  window.addEventListener(event, () => { lastActivity = Date.now(); }, {passive:true});
}
let lastTick = Date.now();
function countTime() {
  const now = Date.now();
  const delta = Math.min(15,Math.max(0,Math.round((now-lastTick)/1000)));
  lastTick = now;
  if (document.hidden || now-lastActivity>120000 || !delta || page==='settings') return;
  const today = state.days[dayKey()] ??= {seconds:0,xp:0};
  const oldMinutes = Math.floor(today.seconds/60);
  today.seconds += delta;
  save();
  const newMinutes = Math.floor(today.seconds/60);
  if (newMinutes !== oldMinutes) {
    updateHeader();
    if (page==='home') {
      const maximum = Math.max(state.goal,...Array.from({length:7}, (_,i) => Math.round((state.days[dayKey(i-6)]?.seconds ?? 0)/60)));
      $('#stat-today').textContent = newMinutes + ' phút';
      $('#today-minutes').textContent = newMinutes;
      $('#daily-progress progress').value = Math.min(newMinutes,state.goal);
      document.querySelectorAll('.bars > div').forEach((bar,i) => {
        const minutes = Math.round((state.days[dayKey(i-6)]?.seconds ?? 0)/60);
        bar.querySelector('small').textContent = minutes + 'p';
        bar.querySelector('i').style.height = minutes/maximum*100+'%';
        bar.setAttribute('aria-label',bar.lastElementChild.textContent+', '+minutes+' phút');
      });
    }
  }
}
setInterval(countTime,10000);
document.addEventListener('visibilitychange', () => { lastTick = Date.now(); });
window.addEventListener('hashchange', () => route(true));
if (location.hash === '#main') history.replaceState(null,'','#home');
route(false);
if (storageFailed) notice('Không đọc được tiến độ đã lưu. Hãy kiểm tra cài đặt bộ nhớ của trình duyệt.');
