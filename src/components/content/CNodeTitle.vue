<script src="../../../../stroget/src/router/index.js"></script>
<template>
    <div class="cNode-title">
        <div class="logo" @click="backToHome">
            <img src="~assets/svg/cnodejs.svg" alt=""/>
        </div>
        <div class="about-us" @click="dialogVisible = true">
            关于
        </div>
        <el-dialog
                title="Vue.js重写CnodeJS社区"
                :visible.sync="dialogVisible"
                :before-close="handleClose"
                ref="about"
        >
            <template>
                <p><span class="enhanced">作者:</span>Godspeed</p>
                <p><span class="enhanced">技术栈:</span></p>
                <ul class="tec-stack">
                    <li v-for="title in stack" :key="title">{{title}}</li>
                </ul>
            </template>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "CNodeTitle"
        , data() {
            return {
                dialogVisible: false
                , stack: [
                    'Vue.js'
                    , 'Vue-router'
                    , 'Vuex'
                    , 'Vue-lazyload'
                    , 'Axios'
                    , 'Element'
                    , 'cnodeJS API'
                ]
            };
        }
        , methods:{
            backToHome(){
                if( this.$route.path === '/' ) return;
                this.$router.push('/');
            }
            , handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            }
        }
    }
</script>

<style scoped lang="less">
    .cNode-title{
        width: 100%;
        height: 6rem;
        background-color: rgb(50, 64, 87);
        overflow: hidden;
        .logo{
            float: left;
            width: 16rem;
            height: 100%;
            padding-top: 1rem;
            margin-left: 16rem;
            cursor: pointer;
            img{
                width: 100%;
            }
        }
        .about-us{
            float: right;
            height: 100%;
            line-height: 6rem;
            padding: 0 2rem;
            margin-right: 25rem;
            font-size: 2.5rem;
            font-weight: bold;
            color: #fff;
            cursor: pointer;
        }

        p{
            margin: 0 0 1rem;
        }
        .enhanced{
            margin-right: 1rem;
            font-size: 2rem;
            font-weight: bold;
        }
        li{
            margin: .8rem 0;
            text-indent: 2rem;
        }
    }
</style>