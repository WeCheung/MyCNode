<template>
    <div class="articles-info" v-loading="loading">
        <div v-if="articleContent" >
            <!--文章信息-->
            <div class="footnote">
                <span>发布于：{{dealTime(articleInfo.create_at)}}</span>
                <span class="author">作者: {{articleInfo.author.loginname}}</span>
                <span>浏览量: {{articleInfo.visit_count}}</span>
                <span>来自: {{articleInfo.tab}}</span>
            </div>
            <!--文章标题-->
            <p class="title">{{articleInfo.title}}</p>
            <!--文章内容-->
            <div v-html="articleInfo.content" class="content"></div>
            <!--评论区-->
            <div class="reply" v-if="replyContent">
                <div class="reply-item" v-for="item in articleInfo.replies" :key="item.id">
                    <div class="img-box">
                        <img v-lazy="item.author.avatar_url" alt=""/>
                    </div>
                    <div class="detail-box">
                        <p class="user">
                            <span>{{item.author.loginname}}</span>
                            <span class="reply-time">{{dealTime(item.create_at)}}</span>
                            <span class="reply-time">{{dealTimeString(item.create_at)}}</span>
                        </p>
                        <div class="reply-content" v-html="item.content"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="backToTop" @click="backToTop" v-show="showShortCut">
            <i class="el-icon-top"></i>
        </div>
    </div>
</template>

<script>
    import {reqArticle} from "../../api/articleAPI";
    import {mapMutations} from 'vuex'
    export default {
        name: "Articles"
        , data(){
            return {
                articleInfo: {}
                , loading: true
                , showShortCut: false
            }
        }
        , computed:{
            articleContent(){
                return this.articleInfo ? !!Object.keys(this.articleInfo).length : false
            }
            , replyContent(){
                return !!this.articleInfo.replies.length;
            }
        }
        , methods:{
            ...mapMutations(['changeUser'])
            , async getInitData(){
                const {data} = await reqArticle(this.$route.path);
                this.articleInfo = data;
                this.loading = false;
                this.dealUser();
            }
            , dealTime(timeStr){
                if( !timeStr ) return;
                return String(timeStr).match(/.{10}/)[0];
            }
            , dealTimeString(timeStr){
                if( !timeStr ) return;
                return new Date(timeStr).toLocaleTimeString();
            }
            , dealUser(){
                this.changeUser(this.articleInfo.author.loginname);
            }
            , scrollMethod() {
                const scrollH = document.body.scrollTop || document.documentElement.scrollTop;

                if( scrollH > 600 ){
                    this.showShortCut = true;
                } else{
                    this.showShortCut = false;
                }
            }
            , backToTop(){
                window.scrollTo(0, 0)
            }
        }
        , created() {
            this.getInitData();
            window.addEventListener('scroll', this.scrollMethod);
        }
        , beforeDestroy() {
            window.removeEventListener('scroll', this.scrollMethod);
        }
    }
</script>

<style scoped lang="less">
    .articles-info{
        width: 60%;
        padding: 3.2rem;
        margin-left: 5rem;
        margin-top: 5rem;
        min-height: 20rem;
        border: .1rem solid black;
        .footnote{
            height: 3rem;
            line-height: 3rem;
            span{
                font-size: 1.8rem;
                color: #8492A6;
            }
            span+span{
                margin-left: 2rem;
            }
            .author{
                color: #000;
            }
        }
        .title{
            margin: 1.7rem 0;
            font-size: 2.4rem;
            font-weight: 900;
            color: rgb(44, 62, 80);
        }
        .content{
            margin-top: 3.2rem;
            padding: 1.6rem;
            border: 1px solid #ddd;
            font-size: 2.1rem;
            background-color: rgb(239, 242, 247);

        }
        .content /deep/ ul{
            margin-bottom: 3rem;
            li{
                margin: 2rem 0;
                text-indent: 3rem;
                list-style: disc;
            }
        }
        .content /deep/ p{
            margin: 2rem 0;
            line-height: 2.4rem;
        }
        .content /deep/ img{
            width: 100%;
        }
        .reply{
            display: flex;
            flex-direction: column;
            .reply-item{
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
                    cursor: pointer;
                    img{
                        width: 100%;
                    }
                }
                .detail-box{
                    position: relative;
                    flex: 1;
                    width: 100%;
                    margin-left: 5rem;
                    .user{
                        font-size: 2.2rem;
                        span+span{
                            margin-left: 1rem;
                        }
                        .reply-time{
                            font-size: 1.8rem;
                            color: #8492A6;
                        }
                    }
                    .reply-content{
                        line-height: 2.7rem;
                        margin-top: 3rem;
                        font-size: 2rem;
                        font-weight: 500;
                    }
                    .reply-content /deep/ li{
                        list-style: disc;
                        /*text-indent: 1rem;*/
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