# smart_home — GitHub Pages 배포 안내

이 저장소는 Vite + React 기반입니다. GitHub Pages에 자동으로 배포되도록 GitHub Actions 워크플로를 추가했습니다.

핵심 사항
- 사이트 URL: https://seyun24.github.io/smart_home
- 빌드 출력: `dist` 폴더
- 자동 배포: `main` 브랜치에 푸시하면 `.github/workflows/deploy.yml`가 빌드 후 `gh-pages` 브랜치로 배포합니다.

설정 확인(한 번만 수행)
1. GitHub에서 저장소의 Settings > Pages로 이동.
2. Source가 `gh-pages` 브랜치의 `/ (root)`로 설정되어 있는지 확인하세요. (Action이 처음 실행된 후 자동으로 생성됩니다.)

로컬에서 테스트
1. 의존성 설치: `npm ci`
2. 개발서버: `npm run dev` (포트 5173)
3. 빌드: `npm run build` -> `dist` 생성

참고
- Vite의 `base` 설정은 이미 `'/smart_home/'`로 되어 있어 GitHub Pages에서 올바르게 자산을 로드합니다.
- 만약 깃허브 사용자 사이트(예: `seyun24.github.io`)로 배포하려면 `vite.config.ts`의 `base`를 `'/'`로 변경하세요.

문제가 있으면 알려주세요. 자동 배포를 확인해드리겠습니다.
