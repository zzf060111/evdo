<template>
    <div class="givelist" ref="recordBox" :style="`height:${screenHeight-60}px;min-width:500px`">
        <p style="text-align:left;font-size:18px;color:#333;height:78px;line-height:78px;padding-left:50px">赠送记录</p>
        <vue-scroll :ops="ops" :style="`width:100%;height:${screenHeight-110}px;`">
            <div class="recordBox" v-show="valueShow&&tableData.length>0">
                <vue-scroll :ops="ops" style="width:100%;height:100%">
                    <el-table :data="tableData" style="width:100%" :show-header=false>
                        <el-table-column prop="name" label="名称" :width="width2" align='center' class-name="one">
                            <template slot-scope="scope">
                                <div style="display:flex;align-items:center;justify-content: center;">
                                    <img style="width:30px;height:30px;margin-right:10px" :src="tableData[scope.$index].time=='一小时'?require('../../static/image/personal/icon_qdzs@2x1.png'):require('../../static/image/personal/icon_zczs@2x.png')" alt="">
                                    {{tableData[scope.$index].name}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="date" label="日期" :width="width3" ></el-table-column>
                        <el-table-column prop="time" label="时间" :width="width1" align='right'></el-table-column>
                        <el-table-column prop="type" label="领取状态" :width="width1" align='center' class-name="last"></el-table-column>
                    </el-table>
                </vue-scroll>
            </div>
            <div v-show="valueShow&&tableData.length==0" class="noHave">
                暂无赠送记录
            </div>
        </vue-scroll>
    </div>
</template>
<script>
import store from '../vuex/store'
import {mapState,mapMutations} from 'vuex';
import {info,getVipGive} from '../services/api/personal'
export default {
    data(){
        return{
            tableData:[],
            valueShow:false,
            width1:0,
            width2:0,
            width3:0
        }
    },
    store,
    created(){
        // 验证登录是否失效
        this.isLogin();
        this.getVipGiveThis();
    },
    mounted(){
        this.windowChange(document.documentElement.clientHeight);
        this.$nextTick(()=>{
            // 获取父元素
            let recordBox=this.$refs.recordBox;
            // 获取宽度
            let wrecordBox = recordBox.getBoundingClientRect().width;
            // 添加左内边距
            this.width3=(wrecordBox-100)*0.5;
            this.width2=(wrecordBox-100)*0.24;
            this.width1=(wrecordBox-100)*0.13;
        });
        const that = this;
        window.onresize=()=>{
            this.windowChange(document.documentElement.clientHeight);
            return(()=>{
                this.$nextTick(()=>{
                    // 获取父元素
                    let recordBox=this.$refs.recordBox;
                    // 获取宽度
                    let wrecordBox = recordBox.getBoundingClientRect().width;
                    // 添加左内边距
                    this.width3=(wrecordBox-100)*0.5;
                    this.width2=(wrecordBox-100)*0.24;
                    this.width1=(wrecordBox-100)*0.13;
                });
            })()
        }
    },
    methods:{
        ...mapMutations(["windowChange","changeUser","alertTxt"]),
        // 验证登录是否失效
        isLogin(){
            info().then((res)=>{
                if(res.data.code==-200){
                    localStorage.removeItem('token');
                    this.changeUser('');
                    this.$router.push('/');
                }else{
                    this.changeUser(JSON.stringify(res.data.data));
                }
            })
        },
        // 获取赠送记录
        getVipGiveThis(){
            this.valueShow=false;
            getVipGive().then((res)=>{
                if(res.data.code==0){
                    let arr=res.data.data.list;
                    if(arr.length>0){
                        let newArr=[];
                        for(let i=0;i<arr.length;i++){
                            // let img=arr[i].day==0?require('../../static/image/personal/icon_qdzs@2x1.png'):require('../../static/image/personal/icon_zczs@2x.png');
                            let obj={};
                            obj['name']=arr[i].description;
                            obj['date']=this.getDate(arr[i].create_time);
                            obj['time']=arr[i].day==0?'一小时':`${arr[i].day}天`;
                            obj['type']='领取成功';
                            newArr.push(obj);
                        }
                        this.tableData=newArr;
                    }else{
                        this.tableData=arr;
                    }
                    this.valueShow=true;
                }else if(res.data.code==-200){
                    this.alertTxt({msg:res.data.msg,type:'error'});
                    localStorage.removeItem('token');
                    this.changeUser('');
                    this.$router.push('/');
                }else{
                    this.alertTxt({msg:res.data.msg,type:'error'});
                }
            })
        },
        // 整理日期
        getDate(time){
            var date=new Date(time*1000);
            var year=date.getFullYear();
            var month=date.getMonth()+1>=10?date.getMonth()+1:`0${date.getMonth()+1}`;
            var day=date.getDate()>=10?date.getDate():`0${date.getDate()}`;
            var hours=date.getHours()>=10?date.getHours():`0${date.getHours()}`;
            var minutes=date.getMinutes()>=10?date.getMinutes():`0${date.getMinutes()}`;
            var seconds=date.getSeconds()>=10?date.getSeconds():`0${date.getSeconds()}`;
            return year+'-'+month+'-'+day+' '+hours+':'+minutes+':'+seconds
        }
    },
    computed:mapState(["ops","opsx","screenHeight"])
}
</script>
<style>
    .givelist .el-table td{
        border-bottom: none;
        font-size: 16px;
        color: #666;
    }
    .givelist .el-table td.one{
        font-size: 18px;
        color: #333;
    }
    .givelist .el-table td.last{
        color:#FFAA00;
    }
    .givelist .el-table::before{
        display: none;
    }
    .givelist .el-table--striped .el-table__body tr.el-table__row--striped td{
        background: #F1F4F5;
    }
    .givelist  .el-table .el-table__row:nth-child(2n-1){
        background-color: #F1F4F5;
    }
</style>
<style scoped>
    .givelist .recordBox{
        width: 100%;
        height: 100%;
        padding: 0 50px 50px 50px;
        box-sizing: border-box;
        margin: 0 auto;
        position: relative;
    }
    .givelist .noHave{
        width: 100%;
        height: 100px;
        text-align: center;
        line-height: 150px;
        font-size: 20px;
        color: #333;
    }
</style>