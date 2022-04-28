# 😎 Dou-Zoeun-Market

---

## 🖥 프로젝트 소개

> 더존 채용확정형 2기 2팀 리액트로 만드는 중고거래 웹페이지
> 중고거래 플랫폼을 프론트는 리액트, 서버는 nodejs를 활용해 구현해보는 프로젝트

### 👨‍💻 1. 기술스택 👩‍💻

<img src="https://img.shields.io/badge/React-61dafb?style=flat-square&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/Redux-7944b6?style=flat-square&logo=Redux&logoColor=white"/> <img src="https://img.shields.io/badge/JavaScript-FFD400?style=flat-square&logo=JavaScript&logoColor=white"/> <img src="https://img.shields.io/badge/Node.JS-12317833?style=flat-square&logo=Node.js&logoColor=white"/>

### ⚡️ 2. 프로젝트 제작 협업 툴

#### 1. 🔥 AQuery Tool - ERD 제작 툴 🔥

### [ERD 보러가기 (비밀번호 : 76v0yb)](https://aquerytool.com/aquerymain/index/?rurl=88b8059d-c68c-4dc1-992d-da0e0ec50b40)

#### 2. 🔥 Draw.io - 스토리보드 제작 툴 🔥

### [스토리보드 보러가기](https://github.com/Dev-lemongrab/Dou-Zoeun-Market/blob/main/StoryBoard.md)

#### 3. 🔥 기능 개발 코드 공유 및 협업 툴 🔥

### [노션 보러가기](https://pyrite-waiter-664.notion.site/Douzone-Team2-3d30df53aac3483e9722011bfcb80eb8)

- 노션 메인 화면

  1.  진척도별 기능 2) 역할별 기능 3) 설계도 4) 회의록 5) 문서공유 6) 코드 및 설명 공유
      <img src= https://velog.velcdn.com/images/oh_yunseong/post/6f378023-2d4d-4c83-af45-e90f0184dda3/image.png width="600">

#### 4. 🔥 GitFlow 🔥

### [2팀 GitFlow 보러가기](https://github.com/Dev-lemongrab/Dou-Zoeun-Market/blob/main/GitFlow.md)

---

## 📜 프로젝트 설계도

### 1. SPA 설계도

```javascript

🏁 index.js

  👉 App.js

      👉 Header.js (nav)

          👉 Login.js

      ---

      👉 MainPage.js

          👉 MainCarousel.js

          👉 Product.js (전체 상품)

              👉 useFetch.js

              👉 ProductItem.js

      ---

      👉 ProductDetail.js

          👉 DetailCarousel.js

          👉 Tabs

              👉 Location.js

              👉 QnA.js

      ---

      👉 MyPage.js

          👉 Profile.js

          👉 Tabs

              👉Product.js (판매중인 상품)

                  👉 useFetch.js

                  👉ProductItem.js

              👉Product.js (찜한 상품)

                  👉 useFetch.js

                  👉ProductItem.js

              👉 Comment.js (거래후기)

                  👉 CommentItem.js

      ---

      👉 ProductForm.js

          👉 ImgList.js

          👉 DaumPost.js

      👉 ChangeProductForm.js
          👉 ImgList.js

          👉 DaumPost.js

      ---

      👉 Transaction.js

          👉 PointModal.js

          👉 DaumPost.js

      ---

      👉 Error403.js

      ---

      👉 Footer.js


```

### 2. 리덕스 설계도

```javascript

store
	👉 store 생성createStore(reducer)
reducer
	👉 state 설정 : 로그인 사용자 식별 값

```

### 3. Node.JS 설계도

```javascript
	server.js
			👉 LoginRouter.js
							👉 LoginController.js
											👉LoginService.js
			👉 LogoutRouter.js
							👉 LogoutController.js
											👉LogoutService.js

			<<=====================AuthService.js=====================>>

							👉 MyPageRouter.js
											👉MyPageController.js
															👉MyPageService.js
							👉 ProudctFormRouter.js
											👉 ProudctFormController.js
															👉 ProudctFormService.js
							👉 ProductRouter.js
											👉 ProductController.js
															👉 ProudctService.js
```

## 프로젝트 기능 설명

### 1. 메인페이지

- 상품 카드를 무한스크롤로 구현
- 페이지 상단으로 이동하는 버튼 제작 🔝
- 검색기능 + 한번이라도 검색한 것에 대해서는 검색어 자동완성
- 언제 올렸는지 확인해서 일자별로 표시(ex. ~일 전 ~시간 전)
- 추천수 세개 이상이면 HOT표시, 올린지 24시간 이내라면 new 표시 생성

### 2. 로그인페이지

  <img src="https://img.shields.io/badge/Passport-61213120?style=flat-square&logo=Passport&logoColor=white"/>

- passport를 활용한 소셜로그인 구현
  - 서비스제공자의 DB에 사용자가 없으면 회원가입 후 로그인
  - 완료되면 지정해 놓은 callback 함수에서 쿠키를 생성한 후 메인페이지로 이동
  - Passport.session을 통해 session에도 등록된다.
- 리액트에서 리덕스를 통해 로그인 값을 state로 불러올 수 있게 설정

### 3. 내 상점 페이지

- 회원정보 수정(닉네임, 프로필사진 변경)
- 자신이 올린 상품 개수와 상태 조회 가능
- 자신이 찜한 목록 조회 가능
- 결제완료 이후에는 결제한 사용자에 한해 판매자 거래후기 및 별점 부여 가능
- 회원탈퇴 기능(회원정보 확인 후)

### 4. 제품 상세 페이지

- 상품 정보 조회(사진, 상품상태, 거래장소 등)
- 유저별 찜하기 기능과
- 남이 올린 게시물이면 결제하기 혹은 내가 올린 게시물이면 수정하기로 라우팅
- 상품 문의 기능
- 거래장소 지도에 핀으로 표시(카카오 지도와 위도경도 변환 API사용)

### 5. 결제 페이지

- 카카오 결제 API 사용

### 6. 상품등록, 수정, 삭제

- 상품 등록
  - 제품이름, 가격, 설명 길이 및 유효성검사
- 내가 등록한 상품이면 어디서든 그 상품의 상세 정보에서 수정, 삭제 가능
