<template>
    <div class="member" :style="`height:${screenHeight-60}px`">
        <vue-scroll :ops="opsx" style="width:100%;height:100%;">
        <p class="title">会员套餐</p>
        <div class="pubBox">
            <div class="pubitem">
                <h2>学霸必选</h2>
                <h3>¥18/年</h3>
                <div class="oldprice">
                    ¥18
                    <p></p>
                </div>
                <div class="btn">开通</div>
            </div>
            <div class="pubitem">
                <h2>学期搭配</h2>
                <h3>¥10/季</h3>
                <div class="oldprice">
                    ¥20
                    <p></p>
                </div>
                <div class="btn">开通</div>
            </div>
            <div class="pubitem">
                <h2>尝鲜套餐</h2>
                <h3>¥5/月</h3>
                <div class="oldprice">
                    ¥10
                    <p></p>
                </div>
                <div class="btn">开通</div>
            </div>
        </div>
        <div class="title">
            <p v-for="(item,index) of navArr" :key="index" @click="selNav(item.id)">
                {{item.txt}}
                <b v-show="item.isSel"></b>
            </p>
        </div>
        <div class="recordBox">
            <vue-scroll :ops="ops" style="width:100%;height:100%;" v-show="showTable==1&&tableData1.length>0" @handle-scroll="handleScroll">
                <el-table :data="tableData1" stripe style="width: 100%" :show-header=false  v-loading="loading" element-loading-text="加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.2)">
                    <el-table-column prop="name" label="名称" width="200" align='center' class-name="one"></el-table-column>
                    <el-table-column prop="date" label="日期" width="300" align='center'></el-table-column>
                    <el-table-column prop="payType" label="支付方式" width="500"></el-table-column>
                    <el-table-column prop="price" label="价格" width="200" align='center'></el-table-column>
                    <el-table-column prop="type" label="订单状态" width="200" align='center' class-name="last"></el-table-column>
                </el-table>
            </vue-scroll>
            <div class="noHave" v-show="showTable==1&&tableData1.length==0">
                暂无购买记录，您可以点击上方会员套餐购买VIP
            </div>
            <vue-scroll :ops="ops" style="width:100%;height:100%;" v-show="showTable==2&&tableData2.length>0">
                <el-table :data="tableData2" stripe style="width: 100%" :show-header=false>
                    <el-table-column prop="name" label="名称" width="300" align='center' class-name="one"></el-table-column>
                    <el-table-column prop="date" label="日期" width="700" ></el-table-column>
                    <el-table-column prop="time" label="时间" width="200" align='center'></el-table-column>
                    <el-table-column prop="type" label="领取状态" width="200" align='center' class-name="last"></el-table-column>
                </el-table>
            </vue-scroll>
            <div class="noHave" v-show="showTable==2&&tableData2.length==0">
                暂无赠送记录
            </div>
        </div>
        </vue-scroll>
    </div>
</template>
<script>
import store from '../vuex/store'
import {mapState,mapMutations} from 'vuex';
export default {
    data(){
        return{
            navArr:[
                {id:1,txt:'购买记录',isSel:true},
                {id:2,txt:'赠送记录',isSel:false},
            ],
            showTable:0,
            tableData1:[
                {
                    name:'学霸必选年卡',
                    date:'2021-03-24  10:12:56',
                    payType:'支付宝支付',
                    price:'18元',
                    type:'购买成功'
                },
                {
                    name:'学霸必选年卡',
                    date:'2021-03-24  10:12:56',
                    payType:'支付宝支付',
                    price:'18元',
                    type:'购买成功'
                }
            ],
            tableData2:[
                {
                    name:'每日签到赠送会员时长',
                    date:'2021-03-23  09:32:56',
                    time:'1小时',
                    type:'领取成功'
                },
                {
                    name:'每日签到赠送会员时长',
                    date:'2021-03-23  09:32:56',
                    time:'1小时',
                    type:'领取成功'
                }
            ],
            loading:false
        }
    },
    store,
    created(){
        let arr=this.navArr;
        if(localStorage.getItem('showTable')){
            for(let i=0;i<arr.length;i++){
                if(arr[i].id==localStorage.getItem('showTable')){
                    arr[i].isSel=true
                }else{
                    arr[i].isSel=false
                }
            };
            this.showTable=localStorage.getItem('showTable');
            this.navArr=arr;
        }else{
            for(let i=0;i<arr.length;i++){
                if(arr[i].isSel){
                    this.showTable=arr[i].id
                }
            };
        }
    },
    mounted(){
        this.windowChange();
    },
    methods:{
        ...mapMutations(["windowChange"]),
        selNav(id){
            localStorage.setItem('showTable',id);
            let arr=this.navArr;
            for(let i=0;i<arr.length;i++){
                if(arr[i].id==id){
                    arr[i].isSel=true
                }else{
                    arr[i].isSel=false
                }
            }
            this.navArr=arr;
            this.showTable=id;
        },
        handleScroll(vertical, horizontal, nativeEvent){
            console.log(nativeEvent.target.scrollTop,nativeEvent.target.clientHeight,nativeEvent.target.scrollHeight)
            if(nativeEvent.target.scrollTop+nativeEvent.target.clientHeight==nativeEvent.target.scrollHeight){
                this.loading=true;
            }
        }
    },
    destroyed(){
        localStorage.removeItem('showTable');
    },
    computed:mapState(["ops","opsx","screenHeight"])
}
</script>
<style>
    .member .el-table td{
        border-bottom: none;
        font-size: 16px;
        color: #666;
    }
    .member .el-table td.one{
        font-size: 18px;
        color: #333;
    }
    .member .el-table td.last{
        color:#FFAA00;
    }
    .member .el-table::before{
        display: none;
    }
    .member .el-table--striped .el-table__body tr.el-table__row--striped td{
        background: #F1F4F5;
    }
    .member .el-loading-spinner{
        position: absolute;
        top: auto;
        bottom:200px;
    } 
    /* .member .el-loading-mask{
        width: 100%;
        height: 400px;
    }  */
</style>
<style scoped>
    .member .title{
        width: 100%;
        height: 50px;
        line-height: 60px;
        text-align: left;
        font-size: 18px;
        color: #333;
        padding-left: 50px;
        box-sizing: border-box;
        display: flex;
    }
    .member .title p:first-child{
        margin-right: 50px;
    }
    .member .title p{
        padding-bottom: 5px;
        box-sizing: border-box;
        position: relative;
    }
    .member .title p:hover{
        cursor: pointer;
    }
    .member .title p b{
        display: block;
        width: 50%;
        height: 3px;
        background-color: #FFD302;
        position: absolute;
        bottom: 0;
        left: 25%;
        z-index: 1;
    }
    .member .pubBox{
        width: 100%;
        height: 400px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .member .pubBox .pubitem{
        width: 249px;
        height: 306px;
        border-radius: 10px;
        position: relative;
        padding-top: 30px;
        box-sizing: border-box;
    }
    .member .pubBox .pubitem h2{
        color: #333;
        font-size: 30px;
    }
    .member .pubBox .pubitem h3{
        color: #DEBEA5;
        font-size: 27px;
        margin-top: 30px;
    }
    .member .pubBox .pubitem .oldprice{
        color: #aaa;
        font-size: 22px;
        margin: 30px auto;
        width: 50px;
        position: relative;
    }
    .member .pubBox .pubitem .oldprice p{
        width: 100%;
        height: 2px;
        background-color: #aaa;
        position: absolute;
        top:16px;
        left: 0;
        z-index: 1;
    }
    .member .pubBox .pubitem .btn{
        width: 143px;
        height: 44px;
        border-radius: 22px;
        background-color: #F5DABF;
        text-align: center;
        line-height: 44px;
        font-size: 23px;
        color: #fff;
        margin:0 auto;
    }
    .member .pubBox .pubitem:first-child{
        border: 1px solid #DEBEA5;
        background-color: #F5DABF;
    }
    .member .pubBox .pubitem:first-child .btn{
        background-color: #DEAE81;
    }
    .member .pubBox .pubitem:not(:first-child){
        border: 1px solid #DEDEDE;
    }
    .member .pubBox .pubitem:nth-child(2){
        margin:0 100px;
    }
    .member .recordBox{
        width: 100%;
        height: 400px;
        padding: 0 50px;
        box-sizing: border-box;
        margin-top: 20px;
        position: relative;
    }
    .member .recordBox .noHave{
        width: 100%;
        height: 200px;
        text-align: center;
        line-height: 200px;
        font-size: 20px;
        color: #333;
    }
</style>