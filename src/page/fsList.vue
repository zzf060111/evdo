<template>
    <div class="fsList" :style="`height:${screenHeight-60}px`">
        <vue-scroll :ops="opsx" style="width:100%;height:100%;">
        <div class="topNav">
             <topnav :topIcon="topIcon" :activeIndex="activeIndex"></topnav>
        </div>
        <div class="listBox" v-if="fsArr.length>0">
            <div class="itemLi" v-for="(item,index) of fsArr" :key="index" @click="lookItem(item.id)">
                <div class="txtBox">
                    <h2>{{item.post_title}}</h2>
                    <h3>{{item.post_excerpt}}</h3>
                    <p>{{item.published_time}}</p>
                </div>
                <img v-lazy="item.more.thumbnail" class="imgright">
            </div>
        </div>
        </vue-scroll>
    </div>
</template>
<script>
import store from '../vuex/store'
import {mapState,mapMutations} from 'vuex'
import topnav from '../components/topnav'
import {getCategoryPostLists} from '../services/api/fsList'
export default {
    data(){
        return{
            topIcon:'../../static/image/top/logo2@2x.png',
            activeIndex:'6',
            fsArr:[]
        }
    },
    store,
    created(){
        this.getList();
    },
    mounted(){
        this.windowChange();
    },
    methods:{
        ...mapMutations(["windowChange","alertTxt"]),
        // 查看详情
        lookItem(id){
            this.$router.push({
                path: '/fsitem',
                query: {
                    id: id
                }
            })
        },
        // 获取文章列表
        getList(){
            let data={};
            data['category_id']=5;
            getCategoryPostLists(data).then((res)=>{
                if(res.data.code==0){
                    this.fsArr=res.data.data.list;
                }else{
                    this.alertTxt({'msg':res.data.msg,'type':'error'});
                }
            })
        }
    },
    components:{
        topnav
    },
    computed:mapState(["opsx","screenHeight"])
}
</script>
<style scoped>
    .listBox{
        width: 100%;
        padding: 0 100px;
        box-sizing: border-box;
    }
    .listBox .itemLi{
        width: 1720px;
        height: 200px;
        border-bottom: 1px solid #C4CACE;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .listBox .itemLi .imgright{
        width: 220px;
        height: 150px;
    }
    .listBox .itemLi .txtBox{
        text-align: left;
    }
    .listBox .itemLi .txtBox h2{
        color: #333;
        font-weight: bold;
        font-size: 18px;
    }
    .listBox .itemLi .txtBox h3{
        margin: 10px 0 40px 0;
        font-size: 16px;
        color: #666;
        font-weight: 600;
        display: -webkit-box;
        overflow: hidden;
        white-space: normal !important;
        text-overflow: ellipsis;
        word-wrap: break-word;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical
    }
    .listBox .itemLi .txtBox p{
        font-size: 14px;
        color: #999;
    }
</style>