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
