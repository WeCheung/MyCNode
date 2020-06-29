<template>
    <div class="base-info" v-loading="isLoading">
        <div class="profile">
            <img v-lazy="avatar" width="120" alt=""/>
            <span class="username">{{username}}</span>
        </div>
        <p>
            <i class="el-icon-coin"></i>
            <span class="_title">积分:</span>
            <span class="_value">{{score}}</span>
        </p>
        <p>
            <img v-lazy="require('assets/img/github.jpg')" width="33" alt="">
            <a :href="getGithub" target="_blank" class="_value">{{getGithub}}</a>
        </p>
        <p>
            <i class="el-icon-time"></i>
            <span class="_title">注册事件:</span>
            <span class="_value">{{dealTime(createTime)}}</span>
        </p>
    </div>
</template>

<script>
    export default {
        name: "UserBaseInfo"
        , props:['username', 'gitHubName', 'createTime', 'score', 'avatar']
        , computed: {
            getGithub(){
                return 'https://github.com/' + this.username
            }
            , isLoading(){
                return !this.username
            }
        }
        , methods:{
            dealTime(timeStr){
                if( !timeStr ) return;
                return String(timeStr).match(/.{10}/)[0];
            }
        }
    }
</script>

<style scoped lang="less">
    .base-info{
        padding: 2rem;
        margin-bottom: 2rem;
        border-radius: .5rem;
        background-color: rgb(239, 242, 247);
        .profile{
            height: 0;
            padding-bottom: 15%;
            margin-bottom: 2rem;
            .username{
                margin-left: 2rem;
                font-size: 2.5rem;
                vertical-align: center;
            }
        }
        p{
            /*line-height: 3rem;*/
            margin: 1.5rem 0;
            i{
                font-size: 3.4rem;
            }
            ._title{
                position: relative;
                top: -.4rem;
                margin-left: .5rem;
                font-size: 2rem;
                vertical-align: center;
            }
            ._value{
                position: relative;
                top: -.5rem;
                margin-left: 1rem;
                font-size: 1.8rem;
                color: #808080;
                vertical-align: bottom;
            }
        }
    }
</style>