<template>
    <div>
        <div id="wrap">

            <div id="header" class="clearfix">
                <h1>
                    <a href="">MySite</a>
                </h1>

                <!-- 
                <ul>
                    <li>황일영 님 안녕하세요^^</li>
                    <li><a href="" class="btn_s">로그아웃</a></li>
                    <li><a href="" class="btn_s">회원정보수정</a></li>
                </ul>
                -->
                <ul>
                    <li><a href="" class="btn_s">로그인</a></li>
                    <li><a href="" class="btn_s">회원가입</a></li>
                </ul>

            </div>
            <!-- //header -->

            <div id="nav">
                <ul class="clearfix">
                    <li><a href="">입사지원서</a></li>
                    <li><a href="">게시판</a></li>
                    <li><a href="">갤러리</a></li>
                    <li><a href="">방명록</a></li>
                </ul>
            </div>
            <!-- //nav -->

            <div id="container" class="clearfix">
                <div id="aside">
                    <h2>회원</h2>
                    <ul>
                        <li>회원정보</li>
                        <li>로그인</li>
                        <li>회원가입</li>
                    </ul>
                </div>
                <!-- //aside -->

                <div id="content">

                    <div id="content-head">
                        <h3>회원정보</h3>
                        <div id="location">
                            <ul>
                                <li>홈</li>
                                <li>회원</li>
                                <li class="last">회원정보</li>
                            </ul>
                        </div>
                        <div class="clear"></div>
                    </div>
                    <!-- //content-head -->

                    <div id="user">
                        <div id="modifyForm">
                            <form v-on:submit.prevent="modifyUser" action="" method="">

                                <!-- 아이디 -->
                                <div class="form-group">
                                    <label class="form-text" for="input-uid">아이디</label>
                                    <span class="text-large bold">{{ userVo.id }}</span>
                                </div>

                                <!-- 비밀번호 -->
                                <div class="form-group">
                                    <label class="form-text" for="input-pass">패스워드</label>
                                    <input type="text" id="input-pass" name="password" v-model="userVo.password"
                                        placeholder="비밀번호를 입력하세요">
                                </div>

                                <!-- 이메일 -->
                                <div class="form-group">
                                    <label class="form-text" for="input-name">이름</label>
                                    <input type="text" id="input-name" name="" v-model="userVo.name"
                                        placeholder="이름을 입력하세요">
                                </div>

                                <!-- //나이 -->
                                <div class="form-group">
                                    <span class="form-text">성별</span>

                                    <label for="rdo-male">남</label>
                                    <input type="radio" id="rdo-male" name="gender" value="male"
                                        v-model="userVo.gender">

                                    <label for="rdo-female">여</label>
                                    <input type="radio" id="rdo-female" name="gender" value="female"
                                        v-model="userVo.gender">

                                </div>

                                <!-- 버튼영역 -->
                                <div class="button-area">
                                    <button type="submit" id="btn-submit">회원정보수정</button>
                                </div>

                            </form>


                        </div>
                        <!-- //modifyForm -->
                    </div>
                    <!-- //user -->
                </div>
                <!-- //content  -->

            </div>
            <!-- //container  -->

            <div id="footer">
                Copyright ⓒ 2020 황일영. All right reserved
            </div>
            <!-- //footer -->

        </div>
        <!-- //wrap -->

    </div>
</template>


<script>
import "@/assets/css/user.css"
import axios from 'axios';

export default {
    name: "ModifyFormView",
    components: {},
    data() {
        return {
            userVo: {
                no: "",
                id: "",
                password: "",
                name: "",
                gender: ""
            }
        };
    },
    methods: {
        login() {
            axios({
                method: 'get', // put, post, delete
                url: 'http://localhost:9000/api/users/modify',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Authorization": "Bearer " + this.$store.state.token
                }, //전송타입 + 토큰

                //params: guestbookVo, //get방식 파라미터로 값이 전달
                //data: guestbookVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response); //수신데이타
                this.userVo = response.data;

            }).catch(error => {
                console.log(error);
            });
        },
        modifyUser() {
            console.log("클릭");
            console.log(this.userVo);
            //서버로 전송
            axios({
                method: 'put', // put, post, delete
                url: 'http://localhost:9000/api/users/modify',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Authorization": "Bearer " + this.$store.state.token
                }, //전송타입 + 토큰
                //params: guestbookVo, //get방식 파라미터로 값이 전달
                data: this.userVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

                responseType: 'json' //수신타입
            }).then(response => {
                console.log("-------------------------"); 
                console.log(response); //수신데이타
                console.log("-------------------------"); 
                console.log(response.data.apiData);
                console.log("-------------------------"); 

                if(response.data.result == "success"){
                    console.log("result = success");
                    let name = response.data.apiData;

                    //vuex 의 이름을 변경
                    this.$store.commit("setAuthName", name);

                    //메인으로 이동
                    this.$router.push("/");

                }else {
                    console.log("result = fail");
                    console.log(response.data.message);
                    this.$store.commit("setAuthUser", null);
                    this.$store.commit("setToken", null);
                }


                //
                /*
                if(name != "fail"){
                    console.log(name)
                    //vuex 의 이름을 변경
                    this.$store.commit("setAuthName", name);

                    //메인으로 이동
                    this.$router.push("/");
                
                }else { //토큰오류, 로그인되지 않은상황
                    //vux token, authVo 삭제
                    //메인으로 이동
                    console.log("실패일때"); 
                    alert("로그인하세요");
                    this.$store.commit("setAuthUser", null);
                    this.$store.commit("setToken", null);
                   
                    //this.$router.push("/user/loginform");
                }
                */

            }).catch(error => {
                console.log(error);
            });

        }

    },
    created() {
        this.login();
    }
};
</script>


<style></style>