<template>
    <div class="create-topics" v-loading="isLoading">
        <p class="title">最近创建的话题</p>
        <div class="topic" v-for="topic in topics" :key="topic.id">
            <div class="container">
                <img v-lazy="topic.author.avatar_url" width="80" alt=""/>
                <router-link :to="'/topic/'+topic.id" class="content">
                    <span >{{topic.title}}</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UserCreateTopics"
        , props:['topics']
        , computed:{
            isLoading(){
                return !this.topics
            }
        }
    }
</script>

<style scoped lang="less">
    .create-topics{
        padding: 2rem;
        margin-bottom: 2rem;
        border-radius: .5rem;
        background-color: rgb(211, 220, 230);
        .title{
            margin-bottom: 3.5rem;
            font-size: 2rem;
        }
        .topic{
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