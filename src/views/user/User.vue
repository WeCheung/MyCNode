<template>
    <div class="user-main">
        <UserBaseInfo
            :username="userInfo.loginname"
            :git-hub-name="userInfo.githubUsername"
            :create-time="userInfo.create_at"
            :score="userInfo.score"
            :avatar="userInfo.avatar_url"
        />

        <UserJoinTopics :replies="userInfo.recent_replies"/>

        <UserCreateTopics :topics="userInfo.recent_topics" />
    </div>
</template>

<script>
    import {reqUser} from "../../api/userAPI";
    import UserBaseInfo from "./base/UserBaseInfo";
    import UserJoinTopics from "./base/UserJoinTopics";
    import UserCreateTopics from "./base/UserCreateTopics";

    export default {
        name: "User"
        , components: {UserCreateTopics, UserJoinTopics, UserBaseInfo}
        , data(){
            return {
                userInfo: {}
            }
        }
        , methods:{
            async getInitData(){
                const {data} = await reqUser(this.$route.params.username);
                this.userInfo = data;
            }
        }
        , watch:{
            "$route.path":{
                handler(){
                    this.getInitData()
                }
            }
        }
        , created() {
            this.getInitData()
        }

    }
</script>

<style scoped lang="less">
    .user-main{
        width: 60%;
        min-height: 20rem;
        margin: 10rem auto;
        border-radius: .5rem;
        background-color: rgb(249, 250, 252);
    }
</style>