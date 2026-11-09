# SAJU 사주·운세·타로 — DeepSeek Harness 번들

사주팔자·오늘의 운세·타로·궁합 전문 지식 **스킬**을 담은 DeepSeek Harness 플러그인 번들입니다.

## 구성

| 파일 | 역할 |
|---|---|
| `package.json` | 번들 매니페스트 (`dsh.bundle.patch`) |
| `cordis.patch.yml` | 로더 패치: `saju` 스킬 플러그인 |
| `index.js` | Host 플러그인 — `saju` 스킬을 스킬 레지스트리에 등록 |
| `assets/saju/SKILL.md` | 사주·운세·타로 전문 지식 본문 |
| `assets/saju/references/` | 사주팔자 기초·타로 카드 키워드 |
| `locale/*.json` | 플러그인 표시 이름/설명 |
| `icon.svg` | 플러그인 아이콘 |

## 설치

- 저장소: https://github.com/whenyourapprun/dsh-saju (공개)
- 패키지명: `@whenyourapprun/dsh-saju`
- 플러그인 마켓 인덱스: `plugin-index.json` (DSH 포맷 1)
  - `https://raw.githubusercontent.com/whenyourapprun/dsh-saju/main/plugin-index.json`
- 검색 키워드: saju, 사주, 사주팔자, 운세, 타로, tarot, fortune, horoscope, 궁합, 만세력, 오행, 십신

## SAJU API (참고)

SAJU 앱의 백엔드 API는 `https://api.blacksmithio.com/saju/*` 에 있다(모두 POST).

- 만세력: `POST /saju/getManse` `{yyyymmdd, hh}`
- 평생 총운: `POST /saju/getDangSaJuTotal` / `...Free` `{yyyymmdd, hh, locale}`
- 부부운·8복·6친·12운성·수: `getDangSaJuCouple`·`getDangSaJu8Bok`·`getDangSaJu6Chin`·`getDangSaJu12UnSeng`·`getDangSaJuNumber`
- 양음력 변환: `getSolar` / `getLunar`

MCP로 이 API를 감싸려면 `saju.git/server/saju_api`의 Koa 앱에 `/mcp` 엔드포인트를 추가하면 된다(더캐스트와 동일 패턴).
