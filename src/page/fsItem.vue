<template>
    <div class="fsitem" :style="`height:${screenHeight-60}px`">
        <vue-scroll :ops="opsx" style="width:100%;height:100%;">
        <div class="topNav">
            <vue-scroll :ops="opsx" style="width:100%;height:100%;">
                <topnav :topIcon="topIcon" :activeIndex="activeIndex"></topnav>
            </vue-scroll>
        </div>
        <div class="itemBox" v-if="objItem">
            <div class="title">
                <img :src="require('../../static/image/fslist/back.png')" class="back" @click="back">
                {{objItem.post_title}}
            </div>
            <p class="time">时间：{{objItem.published_time}}</p>
            <div class="content" v-html="objItem.post_content">
                
            </div>
        </div>
        </vue-scroll>
    </div>
</template>
<script>
import store from '../vuex/store'
import {mapState,mapMutations} from 'vuex'
import topnav from '../components/topnav'
import {articles} from '../services/api/fsList'
export default {
    data(){
        return{
            topIcon:require('../../static/image/top/logo2@2x.png'),
            activeIndex:'6',
            objItem:'',
        }
    },
    store,
    created(){
        // 获取文章详情
        let data={};
        data['id']=this.$route.query.id;
        articles(data).then((res)=>{
            if(res.data.code==0){
                this.objItem=res.data.data;
            }else{
                this.alertTxt({'msg':res.data.msg,'type':'error'});
            }
        })
    },
    mounted(){
        this.windowChange();
    },
    methods:{
        ...mapMutations(["windowChange","alertTxt"]),
        // 返回上一页
        back(){
            this.$router.go(-1);
        }
    },
    components:{
        topnav
    },
    computed:mapState(["opsx","screenHeight"])
}
</script>
<style scoped>
    .fsitem{
        padding: 20px 0;
        box-sizing: border-box;
    }
    .itemBox{
        width: 96%;
        margin: 0 auto;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }
    .itemBox .title{
        width: 100%;
        height: 55px;
        box-shadow:0 0 5px rgba(0,0,0,0.2);
        font-size: 18px;
        font-weight: bold;
        line-height: 55px;
        position: relative;
    }
    .itemBox .title .back{
        width: 30px;
        height: 35px;
        position: absolute;
        top:10px;
        left: 30px;
        z-index: 1;
    }
    .itemBox .time{
        width: 100%;
        height: 50px;
        font-size: 14px;
        line-height: 50px;
        border-bottom: 1px solid #ccc;
        margin:10px auto 20px auto;
    }
    .itemBox .content{
        padding: 30px;
        box-sizing: border-box;
    }
    .itemBox .content{
        text-align:left !important;
    }
</style>