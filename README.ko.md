# 🧱 The Million Pixel Wall

전설의 [Million Dollar Homepage](http://www.milliondollarhomepage.com/)의 20주년을 기념하는 오마주 프로젝트.  
100만 픽셀로 구성된 디지털 벽에 당신만의 이미지를 올리고, 링크를 남기고, 인터넷에 새로운 흔적을 남겨보세요.

---

## 🌐 데모

🚧 준비 중입니다...

---

## 🚀 기술 스택

- **프론트엔드**: [Next.js 14](https://nextjs.org/), [TailwindCSS](https://tailwindcss.com/)
- **백엔드**: [Supabase](https://supabase.com/) (인증, 데이터베이스, 이미지 스토리지)
- **스타일링**: 반응형 UI, Tailwind 기반 커스터마이징
- **다국어 지원**: i18n 구조 내장

---

## 설치된 NPM 라이브러리

1. npm install @supabase/supabase-js

---

## 📁 프로젝트 구조

```bash
/
├── app/              # Next.js App Router 기반 페이지
├── components/       # 공통 UI 컴포넌트
├── lib/              # Supabase 클라이언트, 유틸 함수
├── styles/           # 전역 스타일
├── types/            # 타입 정의
└── public/           # 정적 리소스 (이미지, 아이콘 등)
```

---

## 🧑‍💻 시작하기

```bash
git clone https://github.com/lunalism/the-million-pixel-wall.git
cd the-million-pixel-wall

# 의존성 설치
npm install

# 환경변수 설정
cp .env.example .env.local
```

.env.local 파일에 Supabase 환경 정보를 입력해야 합니다:
```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

```bash
# 개발 서버 실행
npm run dev
```

---

## 📜 라이선스

MIT 라이선스
Fork하거나 자유롭게 수정/배포할 수 있습니다.

---

## 🧙‍♂️ 제작

Chrisholic & ChatGPT
2025 · 서울에서 열정으로 만들었습니다 ❤️

---