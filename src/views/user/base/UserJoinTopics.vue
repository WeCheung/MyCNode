<template>
    <div class="join-topics" v-loading="isLoading">
        <p class="title">最近参与的话题</p>
        <div class="reply" v-for="reply in replies" :key="reply.id">
            <div class="container">
                <router-link :to="{name: 'User', params:{username:reply.author.loginname}}">
                    <img v-lazy="reply.author.avatar_url" width="80" alt=""/>
                </router-link>
                <router-link :to="'/topic/'+reply.id" class="content">
                    <span >{{reply.title}}</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UserJoinTopics"
        , props: ['replies']
        , computed:{
            isLoading(){
                return !this.replies
            }
        }
    }
</script>

<style scoped lang="less">
    .join-topics{
        padding: 2rem;
        margin-bottom: 2rem;
        border-radius: .5rem;
        background-color: rgb(229, 233, 242);
        .title{
            margin-bottom: 3.5rem;
            font-size: 2rem;
        }
        .reply{
            padding-bottom: 1.6rem;
            margin: 1.6rem 0;
            border-bottom: .2rem solid #C0CCDA;
            .container{
                display: flex;
                height: 8rem;
                line-height: 3rem;
                align-items: center;
                .content{
                    margin-left: 2rem;
                    font-size: 2.5rem;
                    font-weight: bold;
                    text-align: left;
                    color: #000;
                    text-decoration: none;
                }
            }
        }
    }
</style>