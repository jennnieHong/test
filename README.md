프로젝트 구조 예시

- backend: Spring Boot (Java 17) - 메뉴 API 제공
- frontend: React + Vite - 좌측메뉴, 탭, 팝업
- docker-compose.yml: PostgreSQL 서비스

빠른 실행 (Windows, PowerShell)

1) DB 실행
```powershell
cd react
docker-compose up -d
```

2) 백엔드 실행
```powershell
cd react/backend
mvn spring-boot:run
```

3) 프론트엔드 실행
```powershell
cd react/frontend
npm install
npm run dev
```

설명
- 백엔드는 `/api/menus`로 트리 메뉴를 제공합니다.
- 프론트엔드의 `src/api.js`는 공통 API 모듈이며 주소(path)와 파라미터만 전달하면 됩니다.
