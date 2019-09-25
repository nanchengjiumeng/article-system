<template>
    <div class="area__comment" >
        <!-- <div class="comment__header" @click="handle">
            心得
        </div> -->
        <ul  v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="500">
            <li v-for="item in list" @click="handleItemClicked(item)">
                <ItemComment :itemData="item" />
            </li>
        </ul>
    </div>
</template>

<script type='text/ecmascript-6'>
    import {
        getExperienceList
    } from '../api/request/experience'
    import ItemComment from './ItemComment'
    export default {
        props: ["topicInfo"],
        components: {
            ItemComment
        },
        data() {
            return {
                list: [],
                loading: false,
                havemore: false
            }
        },
        // 接收祖先组件theme-li.vue传来的Env()实例
        methods: {
            handle(){
                console.log(123);
                
            },
            // id: 心得id
            handleItemClicked({
                id
            }) {
                this.$handleEnvCheck(function(env) {
                    // 跳转到拓词的心得页面
                    if (env && env.jumpToExp instanceof Function) {
                        env.jumpToExp(id);
                    }
                })
            },
            loadMore() {
                this.loading = true;    
                if (this.list.length === 0) {
                    this.topicInfo && getExperienceList({
                        topicId: this.topicInfo.topicId,
                        expId: ''
                    }).then(_ => {
                        if (_.data.code === 200) {
                            let d = _.data;
                            if (d.code === 200) this.list = d.result;
                            this.loading = false;
                        } else {
                            this.havemore = true;
                        }
                    }).catch(err => {
                        this.havemore = true;
                    })
                } else {
                    this.topicInfo && getExperienceList({
                        topicId: this.topicInfo.topicId,
                        expId: this.list[this.list.length - 1].id
                    }).then(_ => {
                        if (_.data.code === 200) {
                            var d = _.data.result;
                            this.list = this.list.concat(d);
                            this.loading = false;
                        } else {
                            this.havemore = true;
                        }
                    }).catch(err => {
                        this.havemore = true;
                    })
                }
            }
        },
        mounted() {
            // 拿到theme-li.vue中的定义的Env()实例，和环境检查函数
            // this.$env = this.$root['$env'];
            this.$handleEnvCheck = this.$root['$handleEnvCheck'];
        }
    }
</script>

<style scoped='' type='text/css'>
    ul {
        padding: none;
        list-style: none;
    }
    .area__comment {
        max-width: 100%;
        margin: 0 auto;
        border-top: 10px #F0F0F2 solid;
        background: #fff;
    }
    .area__comment * {
        box-sizing: border-box;
    }
    .area__comment ul {
        padding: 0;
        margin: 0;
    }
    .area__comment .comment__header {
        padding: 15px;
        font-size: 14px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(51, 54, 64, 1);
    }
    .area__comment .dropdown__footer--nomore {
        padding: 10px;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #E6E6E6;
    }
    .area__comment .list--nodata {
        text-align: center;
        padding: 10px;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #E6E6E6;
        border-top: 1px solid rgba(177, 177, 184, 1);
    }
    .area__comment .list--nodata img {
        margin: 0 auto;
        display: block;
        width: 50%;
    }
    .area__comment .btn__write__exp {
        position: fixed;
        width: 64px;
        height: 64px;
        bottom: 15%;
        right: 5px;
        background: url("https://official-web.oss-cn-beijing.aliyuncs.com/towords/dynamic/Public/btn_write_exp.png");
        -webkit-background-size: 64px 64px;
        background-size: 64px 64px;
        z-index: 999;
    }
</style>