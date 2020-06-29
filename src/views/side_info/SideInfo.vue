<template>
    <div class="side-info" v-loading="loading">
        <div v-if="shouldRender">
            <div class="user-profile">
                <img :src="userInfo.avatar_url" alt="" @click="handleToGitHub" />
                <p class="loginName">{{userInfo.loginname}}</p>
            </div>
            <p class="score">
                <i class="el-icon-coin"></i>
                <span>{{userInfo.score}}</span>
            </p>
            <div class="github">
                <img src="~assets/img/github.jpg" width="25" alt=""/>
                <a :href="gitHub" target="_blank">{{gitHub}}</a>
            </div>
        </div>
    </div>
</template>

<script>
    import {reqUser} from "../../api/userAPI";
    import {mapState} from 'vuex'

    export default {
        name: "SideInfo"
        , data(){
            return {
                userInfo: {}
                , loading: true
            }
        }
        , computed:{
            ...mapState(['user'])
            , shouldRender(){
                if( Object.keys(this.userInfo).length ){
                    this.loading = false;
                    return true;
                }
                return false;
            }
            , gitHub(){
                return 'https://github.com/'+this.userInfo.githubUsername
            }
        }
        , methods:{
            async getUserData(){
                if( this.user ){
                    const {data} = await reqUser(this.user);
                    this.userInfo = data;
                } else{
                    this.anotherTimer = setTimeout(()=>{
                        this.getUserData();
                    }, 500);
                }
            }
            , handleToGitHub(){
                window.open(this.gitHub, '_blank');
            }
        }
        , mounted() {
            this.$nextTick(()=>{
                this.timer = setTimeout(()=>{
                    this.getUserData()
                }, 500)
            })
        }
        , beforeDestroy() {
            this.timer = null
            this.anotherTimer = null
        }
    }
</script>

<style scoped lang="less">
    .side-info{
        width: 30%;
        height: 50rem;
        border: 1px solid black;
        margin-top: 5rem;
        .user-profile{
            height: 0;
            padding-top: 2rem;
            padding-bottom: 40%;
            text-align: center;
            img{
                cursor: pointer;
            }
            .loginName{
                margin: 1.5rem 0;
                font-size: 1.8rem;
            }
        }
        .score{
            width: 50%;
            margin: 2rem auto;
            font-size: 1.8rem;
            text-indent: 20%;
            i{
                font-size: 2.5rem;
            }
            span{
                position: relative;
                top: -.3rem;
                margin-left: 2rem;
                user-select: none;
            }
        }
        .github{
            width: 65%;
            margin: 2rem auto;
            text-align: center;
            a{
                position: relative;
                top: -.3rem;
                margin-left: 1rem;
                font-size: 1.9rem;
                color: black;
            }
        }
        /*.github /deep/ a{*/
        /*    margin-left: 1rem;*/
        /*    font-size: 1.8rem;*/
        /*}*/
    }
</style>