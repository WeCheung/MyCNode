<template>
    <div class="home-main" v-loading="loading">
        <div class="article-item" v-for="article in articles" :key="article.id">
            <div class="img-box">
                <router-link :to="{name: 'User', params: {username: article.author.loginname}}">
                    <img v-lazy="article.author.avatar_url" alt=""/>
                </router-link>
            </div>
            <div class="detail-box">
                <router-link
                        class="title"
                        :to="{name: 'Article', params:{id: article.id}}"
                >{{article.title}}</router-link>
                <div class="situation">
                    <span>回复: {{article.reply_count}}</span>
                    <span class="create-time">创建于: {{dealTime(article.create_at)}}</span>
                </div>
            </div>
        </div>
        <div class="backToTop" @click="backToTop" v-show="showShortCut">
            <i class="el-icon-top"></i>
        </div>
    </div>
</template>

<script>
    import {reqArticles} from "../../api/homeAPI";

    export default {
        name: "Home"
        , data(){
            return {
                limit: 10
                , articles: []
                , showShortCut: false
                , loading: true
            }
        }
        , methods:{
            async getData(){
                if( this.limit <= 100 ){
                    let result = await reqArticles(this.limit);
                    let {data} = result;
                    if(!(data instanceof Array)){
                        data = data.data;
                    }
                    this.articles = data;
                    this.loading = false;
                }
            }
            , scrollMethod() {  // 滚到底部时才加载
                const sumH = document.body.scrollHeight || document.documentElement.scrollHeight;
                const viewH = document.documentElement.clientHeight;
                const scrollH = document.body.scrollTop || document.documentElement.scrollTop;
                if (viewH + scrollH >= sumH) {
                    this.loading = true;
                    this.limit += 10;
                    this.getData();
                }

                if( scrollH > 600 ){
                    this.showShortCut = true;
                } else{
                    this.showShortCut = false;
                }
            }
            , dealTime(timeStr){
                return String(timeStr).match(/.{10}/)[0];
            }
            , backToTop(){
                window.scrollTo(0, 0);
            }
        }
        , mounted() {
            window.addEventListener('scroll', this.scrollMethod);
            this.getData();
        }
        , activated() {
            window.addEventListener('scroll', this.scrollMethod);
        }
        , deactivated() {
            window.removeEventListener('scroll', this.scrollMethod);
        }
    }
</script>

<style scoped lang="less">
    .home-main{
        position: relative;
        display: flex;
        width: 70%;
        min-height: 20rem;
        padding: 2rem 5rem;
        margin: 10rem auto;
        border: .1rem solid #eee;
        flex-direction: column;
        background-color: rgb(249, 250, 252);
        .article-item{
            display: flex;
            width: 100%;
            padding: 2rem 0;
            margin: auto;
            min-height: 10rem;
            border-bottom: 1px solid #e7e7e7;
            justify-content: flex-start;
            .img-box{
                width: 12rem;
                height: 100%;
                padding: 0 0 1rem;
                img{
                    width: 100%;
                }
            }
            .detail-box{
                position: relative;
                flex: 1;
                width: 100%;
                margin-left: 5rem;
                .title{
                    text-decoration: none;
                    color: #000;
                    font-size: 2.5rem;
                }
                .situation{
                    position: absolute;
                    left: 0;
                    bottom: 1rem;
                    margin-top: 2rem;
                    font-size: 1.8rem;
                    span{
                        color: #8492A6;
                    }
                    .create-time{
                        margin-left: 2rem;
                    }
                }
            }
        }
        .backToTop{
            position: fixed;
            right: 2rem;
            bottom: 10rem;
            width: 5rem;
            height: 5rem;
            line-height: 5rem;
            text-align: center;
            border-radius: 50%;
            z-index: 999;
            border: 1px solid black;
            cursor: pointer;
            i{
                transform: translateX(-.1rem);
                font-size: 5rem;
            }
        }
    }
</style>