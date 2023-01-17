# GoskProject
Gosk의 독서실 키오스크의 클론 코딩 프로젝트를 진행했습니다.

<br/><br/>


# 프로젝트 시연 동영상, 참조 사이트
[참조 사이트](https://gosk.co.kr/default/g_library/glibrary_sub2.php?sub=02)

[기능 시연 동영상]()

키오스크의 경우 사이트가 따로 없기 때문에 참조 사이트를 참고하여 제작하였습니다.

<br/><br/>



# 팀원 소개


+ 오유리
  + 화면 설계 디자인
  + 백엔드 구현
  + DB구조 및 연계
  + 상품관리 (관리자)
  + 매출조회 (관리자)
  + 일반석 / 지정석 좌석 선택
  + 중복 구매 방지
  + 자리 이동 (일반)


+ 백민경
  + 화면 설계 디자인
  + 백엔드 구현
  + DB구조 및 연계
  + 회원가입
  + 로그인
  + 회원 관리 (관리자)
  + 상품 결제
  + 내 정보
  
  
+ 조문기
  + 백엔드 구현
  + DB구조 및 연계
  + 좌석관리 (관리자)
  + 사물함
  + 자리이동 (관리자)
  + 입/퇴실
  + 일반석 / 지정석 사용 현황 들고오기

<br/><br/>

# 기술 스택
<img src="https://img.shields.io/badge/JAVA-007396?style=for-the-badge&logo=java&logoColor=white"><img src="https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=Spring&logoColor=white"><img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"><img src="https://img.shields.io/badge/mariaDB-003545?style=for-the-badge&logo=mariaDB&logoColor=white">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"><img src="https://img.shields.io/badge/jquery-0769AD?style=for-the-badge&logo=jquery&logoColor=white"><img src="https://img.shields.io/badge/html-E34F26?style=for-the-badge&logo=html5&logoColor=white"><img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"><img src="https://img.shields.io/badge/aws-232F3E?style=for-the-badge&logo=aws&logoColor=white"><img src="https://img.shields.io/badge/apache tomcat-F8DC75?style=for-the-badge&logo=apachetomcat&logoColor=white">

<br/><br/>

# 주요 구현 기능
주요 기능 정리
![프레젠테이션1](https://user-images.githubusercontent.com/109320970/212833397-83c4dd0d-b940-4f6c-8158-63663f95b11d.jpg)

## 메인 페이지

### 메인 화면
![index 페이지](https://user-images.githubusercontent.com/109320970/212833406-77ba7def-1ea7-49ab-8ae6-b4ad4e935f1b.jpg)

    메인 화면에 들어설 경우 자동으로 로그아웃.
    GOSK 더블 클릭 시 관리자 페이지로 넘어감. 010-0000-0000 아이디로 관리자 로그인 가능.

### 회원가입 / 로그인 페이지

![로그인 페이지](https://user-images.githubusercontent.com/109320970/212833380-c7a8beba-e2f3-4a87-8206-133527b7cfe1.jpg)

    전화번호와 비밀번호 입력 시 회원가입 가능.
    이미 가입된 전화번호일 시 가입 불가.
    상품 구매 및 입퇴실, 내 정보 열람 시 로그인 필요.
    
### 원데이 / 정액권 / 지정석 / 사물함 페이지

![원데이-정액권 좌석 선택 페이지](https://user-images.githubusercontent.com/109320970/212833390-86c913ee-8341-4cf0-966a-c32c30a62aef.jpg)
![중복구매불가](https://user-images.githubusercontent.com/109320970/212833396-0d10a334-2e1d-454f-b3e5-078873c5f2de.jpg)

    메인 페이지에서 상품 선택시 좌석 선택 페이지로 넘어감.
    단, 이미 사용중인 상품이 있을 경우 중복 구매 불가능.
    사물함과 좌석은 같이 구매 가능.

<img width="1200" alt="상품 선택 페이지" src="https://user-images.githubusercontent.com/109320970/212833385-25fa9e6c-76ed-451c-bc7d-0bfd7f647e62.png">

![결제페이지](https://user-images.githubusercontent.com/109320970/212833411-f1efcdc4-6c6c-47c2-a9d4-f393f6d27d87.jpg)

![이니시스 결제](https://user-images.githubusercontent.com/109320970/212833393-0e196451-bdc2-4e61-a910-1e663d71d12a.jpg)

    좌석 선택 페이지에서 빈 좌석 선택하면 결제 페이지로 넘어감.
    결제 api는 이니시스 결제를 이용.

### 입퇴실 페이지

#### 입실
    정액권 상품에만 사용 가능 (원데이, 지정석은 입실 필요 X)
    입실 시간과 선택한 좌석 조회.

#### 퇴실
    원데이 / 정액권 / 지정석 사용 가능.
    정액권의 경우 일반 퇴실 / 완전 퇴실로 나누어져 있음. 완전 퇴실은 이용권 종료.
    원데이 / 지정석의 경우 완전 퇴실만 가능함. (이용권 만료 전 사용 종료하고 싶을 때)

### 내 정보 페이지 (마이 페이지)
![마이페이지](https://user-images.githubusercontent.com/109320970/212833382-2ad5760f-56b8-4d80-b98f-057e0a1f9c92.jpg)

    본인이 구매했던 상품들 날짜 / 상품 / 금액 / 사용여부 조회 가능.
    오늘 / 1개월 이내 / 3개월 이내 클릭 시 선택 날짜별로 조회할 수 있음.
    버튼 한 번 더 클릭 시 전체 조회로 다시 볼 수 있음.

---

## 관리자 페이지

### 상품관리 페이지
![관리자-상품관리 페이지](https://user-images.githubusercontent.com/109320970/212833415-1081a2c6-2885-4b41-9ea3-0e2072eb5588.jpg)

    존재하는 상품 카테고리 / 이름 조회 가능.
    카테고리 별로 조회 가능 (버튼 한 번 더 클릭 시 전체 조회로 다시 조회 가능)
    상품 등록 / 수정 /삭제 기능.
    상품 등록 및 수정 시 중복되는 상품은 등록 불가.

### 회원관리 페이지
![관리자-회원관리 페이지](https://user-images.githubusercontent.com/109320970/212833372-6c6b0d3b-4389-4bce-9b5b-78c369499564.jpg)

    현재 가입된 사용자들 전화번호 조회 가능.
    상세 버튼 클릭 시 회원별 구매내역 및 현재 사용중인 좌석 조회 가능.
    회원 정보 수정 / 삭제 할 수 있음.
    회원 정보 수정 시 이미 가입된 아이디일 경우 수정 불가.
    찾고자하는 전화번호 검색 할 수 있음.

### 좌석관리 페이지

    지정석 / 일반석 / 사물함 좌석 조회 가능.
    자리이동 / 유지보수 / 강제 퇴장 기능 구현.
    자리이동은 팝업으로 사용중인 좌석, 사용 가능한 좌석 선택 후 변경.
    사용중 좌석 선택 후 강제 퇴장 시 좌석 데이터 삭제.
    좌석 선택 후 유지보수 시 사용 불가능하게 막아놓음. (사용중인 좌석 선택 선택시 자리 이동 후 가능)

### 매출조회 페이지
![관리자-매출조회 페이지](https://user-images.githubusercontent.com/109320970/212833413-332262f8-f01a-4b49-9d66-3ba9cf5ba27a.jpg)

    원하는 날짜 선택 후 카테고리 별로 구매된 상품들 조회.
    상품 분류 / 시간 / 판매 횟수 / 누적 금액 조회 가능.
    하단에 총 매출로 선택한 기간의 매출 확인.


<br/><br/>
---


# 부가 구현 기능
 1. 스케쥴 어노테이션을 이용한 일정시간 마다 API 호출, 이용권 만료시 DB 수정 및 삭제 기능 추가.
 2. 결제 API를 호출해 결제 기능 구현.
 3. JS 정규식 체크를 이용해 전화번호 및 비밀번호 양식에 맞지 않을 시 가입 불가.
 4. 매출 조회의 날짜 선택의 경우 JQUERY의 캘린더 기능을 사용, 날짜 선택 가능.
<br/><br/>



# 데이터 베이스
 <img width="790" alt="Gosk" src="https://user-images.githubusercontent.com/109320970/212833404-6bdedd1f-c286-4bfa-b72e-9466c73e512c.png">


<br/><br/>

# 프로젝트 소감

### 팀원들과의 커뮤니 케이션에 대한 중요성
> 프로젝트를 성공적으로 이끌기 위해서는 팀원 간의 의견교류 및 서로의 진행상황, 참고해야할 내용 등을 잘 공유해야한다는 것은 저희 팀의 공통된 생각이었습니다. 그렇기 때문에 구글 스프레드 시트 및 노션 등의 공용 커뮤니케이션 툴을 이용하기로 결정 했습니다. 기록이 필요한 서로의 일정, 본인이 구현해 놓은 기능에 대한 정리, 필요한 참고 사이트, api 명세서, DB 테이블 정리는 적극적으로 툴을 사용하였고 의견을 나눌 때는 대면상태에서 서로 간의 대화를 통해 조율했습니다. 그 조율한 내용을 모두와 함께 참고하기 위해 다시 기록에다 남겨두는 것을 반복하다보니 헤매는 일이 확연히 줄어들어 각자의 몫에 집중하여 목표한 기간 안에 빠르게, 완성도 있는 프로젝트를 완성할 수 있었습니다.

### 새로운 기능 사용에 대한 두려움 감소
> 팀원들 모두가 첫 프로젝트와는 전혀 다른 분야의 프로젝트를 진행하다보니 생소한 기능이 많았습니다. 특히 독서실 키오스크의 경우 '시간' 이라는 키워드가 가장 중요했기 때문에 시간에 대한 기능들을 공부하고, 적용시키는 과정에서 많은 것을 배울 수 있었습니다. 지식이 늘어갈 수록 할 수 있다는 자신감이 붙고, 상대적으로 새 기능에 대한 막연한 두려움은 줄어들었습니다. 자신감이 커지니 일의 효율에도 탄력이 붙어 정해진 일정 안에 빠르게 작업이 가능했던 경험은 우리 모두에게 큰 자산이 되었다고 할 수 있습니다.

### 키오스크와 홈페이지 연동에 대한 아쉬움
> 키오스크 작업을 계획하던 당시, 관련 WEB홈페이지(고객용)와 어플리케이션(관리자용) 제작에 대한 이야기도 나왔습니다. 그러나 일정이 촉박했던 까닭에 키오스크 작업만으로 프로젝트를 마무리해야 했습니다. 팀원 모두가 관련으로 깊은 아쉬움을 표현했고, 이후에라도 프로젝트를 함께 진행하게 된다면 독서실 키오스크의 확장 영역으로 WEB홈페이지와 어플리케이션 작업도 구현해보려 합니다.
