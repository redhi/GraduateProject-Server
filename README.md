# GraduateProject-Server

4BDF

## 2021-07-20

### 내기가계부

스키마 : 사용자 추가방식 스트링 -> 배열로 변경  
 routes : invitebetcashbook 함수 기존 사용자에 추가하기 위해 $push 방식 사용

### 카테고리

스키마 카테고리명에 default로 ["식비","문화생활","패션/미용","수입","교육","교통/차량","마트/편의점","건강","기타"] 추가  
 routes : 아직 수정 중

## 2021-07-29

### 내기가계부

routes : 각 사용자에 해당하는 조건(기간, 카테고리)을 만족하는 결과값을 확인하기 위한 함수 idarraycheck2 추가

### 물품목록

스키마 : year, month, date로 쪼개서 받던 형식을 wholeDay로 합쳐서 받음

### 사용자목록

routes : 내기가계부에서 id별 사진, 닉네임, 예산을 받아오기 위한 findmemberlist 함수 추가

### 안드로이드

그룹 별 사용자 수와 id를 받아서 표시

## 2021-08-03

### 내기가계부

routes : 그룹에서 개별 사용자 나가는 삭제 기능 구현, 입장 시 상세페이지로 넘어가는 입장조회 기능 구현

### 안드로이드

bethomescrceen에서 intent로 초대 시 그룹 내용을 invitedetail 클래스로 넘겨준다

## 2021-08-09

### 내기가계부

routes : 그룹에서 개별 사용자 조회 기능 구현, 입장 시 상세페이지 내 사용자 조회 기능 구현,

### 월별가계부

routes : 월별 캘린더에서 날짜를 선택하면 해당하는 날의 수입, 지출을 구하는 기능 구현

### 연간가계부

routes : 2017~2021(총 5년), 각각의 연도별로 총 지출에 해당하는 값을 구하는 기능 구현 -> 추가 수정 필요(월별...?)

### 안드로이드

- 내기가계부 서버 코드 추가 -> 비동기로 인해 값의 순서가 차례대로 출력되지 않아 상세 조회 시 사용자 정보 순서가 임의로 배치되는 문제를 안드 코드로 해결
- 연간가계부 서버 코드 추가 -> 내기가계부와 같은 문제 해결
- 월별가계부 서버 코드 추가 -> 서버와 연결

## 2021-08-10

### 내기가계부

routes : 입장 시 상세페이지 내 사용자 조회 기능 구현, 랜덤 코드 생성 시 중복체크 기능 구현

### 안드로이드

랜덤 코드 생성 시 중복된 값이 없으면 버튼 비활성화하는 코드 작성

### 앞으로 해야 할 일(서버)

#### 내기가계부

- ~~최초 생성 시에 내기 가계부 사용자 불러오는게 뭔가 이상함 -> 다시 로그인해서 들어가면 괜찮음
  > 이게 생성완료 버튼을 누르면 GroupaddActivity가 종료되는데 이 과정에서 bethomescreen이 다시 한번 도는지 확인  
  > ex) 사용자 한명이여야 하는데 사용자가 5명이 뜨고 그런 문제~~
- ~~내기가계부 입장하고 나가서 조회페이지로 가면 인원수 살짝 이상 -> 괜찮은거 같기도 함~~
- ~~내기가계부 한명일 때 삭제하면 DB상에만 그룹이 남음 -> 완전 삭제필요~~
- ~~이미 기존 추가되어있는 그룹인데 추가적으로 초대코드입력 시 문제해결 필요~~

#### 설정창

- 설정에서 프로필 사진 저장 & 내기가계부에서 띄워줘야함
- ~~예산설정해서 멤버스키마에 업데이트 해줘야함~~
- ~~탈퇴하기 누르면 삭제하고 로그인페이지~~

#### 연간가계부

안드팀이 코드주면 해당하는 검색 조건에 맞는 검색해야 함 -> 원하는 형식을 모르겠음

#### 확인 사항

- ~~내기가계부 기간 확인~~

#### 건의 사항(전달함)

- ~~영수증 인식 시 Firebase를 거쳐야 하므로 시간이 소요되는 문제가 발생~~  
  ~~사용자가 일정 시간 기다린 후 완료 버튼을 눌러야 하는데 바로 눌러서 추가창에 값이 들어오지 않는 문제가 발생~~  
  ~~따라서 인식 값이 넘어오는 응답이 오기 전까지 완료 버튼을 비활하는게 좋을듯~~  
  ~~아니면 alert창을 Firebase에서 넘어올 때까지 지속되게 '사진을 업로드 중입니다.' 띄우게끔~~  
  ~~로그인 창에서 아이디 중복확인 후에 입력창에 입력이 가능함 -> 불가능하게 해야...~~

## 2021-08-17

### 내기가계부

routes : 내기가계부 그룹 내 남은 인원이 한명일 때 그룹 자체를 삭제하는 코드 작성, 사용자가 기존에 그룹에 속해있을 때 중복입장 금지 코드 작성, UTC로 저장되어 한국표준시로 교정

### 안드로이드

중복입장 금지를 위한 코드 작성

### 일일가계부

### 안드로이드

제목이 동일하면 수입,지출 여부와 상관없이 하나의 제목으로 묶여서 출력되는 오류 정정 코드 작성

### 설정

routes : 사용자 예산 설정 코드 작성, 사용자 탈퇴 시 연관된 Member, ItemList, BetCashBook 스키마 전체 삭제 코드 작성

### 안드로이드

### 앞으로 해야 할 일(서버)

#### 설정창

- 설정에서 프로필 사진 저장 & 내기가계부에서 띄워줘야함

#### 연간가계부

안드팀이 코드주면 해당하는 검색 조건에 맞는 검색해야 함 -> 원하는 형식을 모르겠음
