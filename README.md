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
- 패키지명: `@smith3015/dsh-saju`
- 플러그인 마켓 인덱스: `plugin-index.json` (DSH 포맷 1)
  - `https://raw.githubusercontent.com/whenyourapprun/dsh-saju/main/plugin-index.json`
- 검색 키워드: saju, 사주, 사주팔자, 운세, 타로, tarot, fortune, horoscope, 궁합, 만세력, 오행, 십신

## SAJU API · MCP

SAJU 앱의 백엔드 API는 `https://api.blacksmithio.com/saju/*` 에 있다(모두 POST). Koa 서버(`saju.git/server/saju_api`)에 `/saju/mcp` MCP 엔드포인트를 추가해 운세 함수를 `mcp__saju__*` 도구로 노출한다.

- 만세력: `get_manse` → `POST /saju/getManse` `{yyyymmdd, hh}`
- 평생 총운: `get_total_fortune` → `/saju/getDangSaJuTotalFree`
- 부부운: `get_couple_fortune` → `/saju/getDangSaJuCoupleFree`
- 팔복궁: `get_8bok` → `/saju/getDangSaJu8BokFree`
- 육친운: `get_6chin` → `/saju/getDangSaJu6ChinFree`
- 십이운성: `get_12unseng` → `/saju/getDangSaJu12UnSengFree`
- 숫자운: `get_number` → `/saju/getDangSaJuNumberFree`

`cordis.patch.yml`의 `saju-mcp` 행이 `https://api.blacksmithio.com/saju/mcp`를 가리킨다.
