# Simby Studio — TikTok 재제출 인수인계

사이트 쪽 작업은 **전부 완료**됐다. 아래는 사람이 직접 눌러야만 되는 것들이다.

---

## 완료된 것 (코드/배포)

| 항목 | 상태 |
|---|---|
| 앱 아이콘 `favicon.ico` / `icon-192.png` / `icon-512.png` / `icon.svg` | 완료 |
| 전 페이지 `<head>` 파비콘 링크 | 완료 |
| 전 페이지 상단 헤더에 아이콘 + `Simby Studio` | 완료 |
| 전 페이지 공통 푸터 (약관·개인정보·문의 항상 노출) | 완료 |
| 랜딩 `/` 전면 재구축 (히어로·기능 3블록·실제 스크린샷 3장·CTA) | 완료 |
| `/features` 신규 | 완료 |
| `/how-it-works` 신규 | 완료 |
| `/support` 신규 (FAQ 7개 + 삭제요청 절차) | 완료 |
| `/privacy-policy` 신규 경로 (수집·목적·제3자·보관·삭제·스코프 전부 명시) | 완료 |
| `/privacy` → `/privacy-policy` 리다이렉트 (기존 콘솔 URL 보호) | 완료 |
| `/terms` 전면 보강 (13개 조항) | 완료 |
| `/post`, `/oauth/callback` 브랜딩 통일 | 완료 |
| `404.html`, `robots.txt` | 완료 |
| 전 페이지 타이틀에 `Simby Studio` 포함 | 완료 |
| 링크·이미지 전수 검사 (깨진 링크 0개) | 완료 |

**모든 링크는 상대경로**다. 지금 `github.io/simby-studio-legal/` 에서도 동작하고, 커스텀 도메인 루트로 옮겨도 **코드 수정 없이** 그대로 동작한다.

---

## 사람이 해야 할 것

### A. 도메인 구매 (필수 — 지난 거절의 핵심 사유)

`simbystudio.com` 구매. 불가하면 `simbystudio.app` → `simbystudio.io` 순.
**하이픈·숫자 금지.** 앱 이름 `Simby Studio` 와 도메인이 일치해야 한다.

### B. DNS 설정

| 타입 | 이름 | 값 |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | kwon8720kwon8720-gif.github.io |

### C. 저장소에 CNAME 파일 추가

**도메인 DNS가 전파된 뒤에** 저장소 루트에 `CNAME` 파일을 만들고 한 줄만 넣는다.

```
simbystudio.com
```

> 도메인 구매 전에 이 파일을 만들면 현재 github.io 사이트가 죽는다. 반드시 B 완료 후.

그 다음 GitHub → Settings → Pages → Custom domain 에 `simbystudio.com` 입력 → **Enforce HTTPS 체크**.

### D. 이메일 수신 설정

사이트 전역에 `support@simbystudio.com` 이 박혀 있다. 도메인 등록업체의 **이메일 포워딩** 기능으로 이 주소를 실제 받는 메일함(Gmail 등)으로 연결한다. 심사자가 메일을 보낼 수 있어야 한다.

> 다른 주소를 쓰고 싶으면 말해라. 전 파일 일괄 치환은 1분이면 된다.

### E. 검토자용 테스트 계정 생성

로그인 화면이 있는 경우에만 해당. 조건: 외부망 접속 가능, 2단계 인증 없음, 심사 끝날 때까지 비밀번호 변경 금지.

### F. TikTok 개발자 콘솔 입력

| 필드 | 입력값 |
|---|---|
| App name | `Simby Studio` (한글 `심비 스튜디오` 에서 변경) |
| App icon | 저장소의 `icon-512.png` 업로드 (사이트와 동일 이미지여야 함) |
| Website URL | `https://simbystudio.com` |
| Terms of Service URL | `https://simbystudio.com/terms/` |
| Privacy Policy URL | `https://simbystudio.com/privacy-policy/` |
| Redirect domain | `simbystudio.com` |
| Redirect URI | `https://simbystudio.com/oauth/callback/` |

### G. "신청 사유" 칸에 아래를 그대로 붙여넣기

```
App name: Simby Studio
Website: https://simbystudio.com
Terms of Service: https://simbystudio.com/terms/
Privacy Policy: https://simbystudio.com/privacy-policy/
Redirect URI: https://simbystudio.com/oauth/callback/

What the app does:
Simby Studio is a desktop creator tool. It publishes short gameplay videos that
the creator recorded to the creator's own TikTok account through the official
Content Posting API. It is not a bulk cross-poster and it never redistributes
third-party content.

Scopes requested and why:
- user.info.basic  : show which TikTok account will receive the post, and read
                     that account's posting limits (max duration).
- video.upload     : transfer the creator's selected file so it can be previewed.
- video.publish    : complete the publish after express in-app consent.

Test account (valid until review completes):
  Email: <REVIEWER_EMAIL>
  Password: <REVIEWER_PASSWORD>

How to test:
1. Open https://simbystudio.com
2. Click "Post to TikTok" in the header.
3. Section 1 shows the connected creator: nickname, username, max duration.
4. Section 2: choose a video file. A preview player appears. No watermark is added.
5. Section 3: the title is fully editable. The privacy dropdown has NO preselected
   default and is populated from creator_info. Allow Comment / Duet / Stitch are
   all unchecked by default and are greyed out if the account disables them.
6. Section 4: commercial disclosure is OFF by default. Turning it on reveals
   "Your Brand" and "Branded Content". Branded Content cannot be combined with
   the "Only me" privacy level.
7. Section 5: the consent text always includes Music Usage Confirmation, and the
   Branded Content Policy when disclosure is on. The Post button stays disabled
   until a video is selected, a privacy level is chosen, and the express consent
   checkbox is ticked. After posting, upload status is polled and displayed.

Privacy Policy covers: data collected, purpose, third parties, retention period,
deletion request procedure (support@simbystudio.com), and each TikTok scope.
```

---

## 제출 직전 최종 점검 (전부 통과해야 제출)

1. 시크릿 창에서 `https://simbystudio.com` / `/terms/` / `/privacy-policy/` / `/post/` 전부 200
2. 주소창 자물쇠(HTTPS) 표시
3. 4개 페이지 전부 탭에 파비콘 표시
4. `/terms/`, `/privacy-policy/` **본문 상단**에도 아이콘 보임
5. 앱 이름 = 도메인 = 탭 제목 = 헤더 텍스트, 전부 `Simby Studio`
6. `/` 접속 시 로그인 화면이 아니라 제품 소개가 먼저 뜸
7. 모든 링크 클릭해서 404 없음
8. `support@simbystudio.com` 으로 테스트 메일 보내서 수신 확인
9. `https://simbystudio.com/tiktok4cGbweohjtMEnMDYexk2tW8cQzsUEzpQ.txt` 접근 가능
10. 콘솔의 Redirect URI 문자열과 앱 코드의 Redirect URI 문자열이 완전히 동일

---

## 남아 있는 리스크 1건

`/post` 페이지는 TikTok API 응답이 없을 때 샘플 creator 정보(`@lilykorea7`)로 폴백한다.
심사자가 실제 OAuth 없이 페이지만 열면 이 값이 보인다. 화면에 "demo falls back to
sample values if offline" 이라고 명시돼 있어 허위 표기는 아니지만, 실제 토큰으로
동작하는 상태에서 심사받는 게 가장 안전하다.
