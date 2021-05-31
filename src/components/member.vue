<template>
    <div class="member" :style="`height:${screenHeight-60}px`" v-if="vipList.length>0">
        <div v-if="html" v-html="html" style="opacity:0"></div>
        <vue-scroll :ops="opsx" style="width:100%;height:100%;" v-else>
        <p class="title">会员套餐</p>
        <div class="pubBox">
            <div :class="selIndex==index?'pubitem selected':'pubitem'" v-for="(item,index) of vipList" :key="index" @click="selVip(index)">
                <h2>{{item.day==365?'学霸必选':item.day==90?'学期搭配':'尝鲜套餐'}}</h2>
                <h3>{{`¥${item.price}/`}}{{item.day==365?'年':item.day==90?'季':'月'}}</h3>
                <div class="oldprice">
                    ¥{{item.original_price}}
                    <p></p>
                </div>
                <div class="btn" @click="openPay(item.price,item.day,item.id)">{{arrUser.member_in?'续费':'开通'}}</div>
            </div>
        </div>
        <div class="vipTip" v-if="arrUser.is_enterprise">您当前已经是企业版会员，包含全部专业版权限，请确认是否需要购买或续费之后再操作。</div>
        <div class="title">
            <p v-for="(item,index) of navArr" :key="index" @click="selNav(item.id)">
                {{item.txt}}
                <b v-show="item.isSel"></b>
            </p>
        </div>
        <div class="recordBox">
            <vue-scroll :ops="ops" style="width:100%;height:100%;" v-show="valueShow&&showTable==1&&tableData1.length>0" @handle-scroll="handleScroll">
                <el-table :data="tableData1" stripe style="width: 100%" :show-header=false  v-loading="loading" element-loading-text="加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.2)">
                    <el-table-column prop="name" label="名称" width="200" align='center' class-name="one"></el-table-column>
                    <el-table-column prop="date" label="日期" width="300" align='center'></el-table-column>
                    <el-table-column prop="payType" label="支付方式" width="500"></el-table-column>
                    <el-table-column prop="price" label="价格" width="200" align='center'></el-table-column>
                    <el-table-column prop="type" label="订单状态" width="200" align='center' class-name="last"></el-table-column>
                </el-table>
            </vue-scroll>
            <div class="noHave" v-show="valueShow&&showTable==1&&tableData1.length==0">
                暂无购买记录，您可以点击上方会员套餐购买VIP
            </div>
            <vue-scroll :ops="ops" style="width:100%;height:100%;" v-show="valueShow&&showTable==2&&tableData2.length>0">
                <el-table :data="tableData2" stripe style="width: 100%" :show-header=false>
                    <el-table-column prop="name" label="名称" width="300" align='center' class-name="one"></el-table-column>
                    <el-table-column prop="date" label="日期" width="700" ></el-table-column>
                    <el-table-column prop="time" label="时间" width="200" align='center'></el-table-column>
                    <el-table-column prop="type" label="领取状态" width="200" align='center' class-name="last"></el-table-column>
                </el-table>
            </vue-scroll>
            <div class="noHave" v-show="valueShow&&showTable==2&&tableData2.length==0">
                暂无赠送记录
            </div>
        </div>
        </vue-scroll>
        <!-- 提示vip支付 -->
		<el-dialog title="VIP充值" :visible.sync="vipTost" :append-to-body="true" :close-on-click-modal="false" center custom-class="vipTost" top="13vh" >
			<div class="priceBox">
                <p>支付金额</p>
                <h3>¥{{payPrice}}</h3>
                <p>{{payDay}}天</p>
            </div>
            <div class="paybox">
                <p>请选择支付方式</p>
                <div class="payTypebox">
                    <div class="payTypeItem">
                        <div class="left">
                            <img :src="require('../../static/image/personal/weixinpay.png')" alt="">
                            <p>微信支付</p>
                        </div>
                        <div class="right" @click="selPayType(1)">
                            <img :src="require('../../static/image/personal/paySel.png')" alt="" v-if="payValue==1">
                            <p v-else></p>
                        </div>
                    </div>
                    <div class="payTypeItem">
                        <div class="left">
                            <img :src="require('../../static/image/personal/zfbpay.png')" alt="">
                            <p>支付宝支付</p>
                        </div>
                        <div class="right" @click="selPayType(2)">
                            <img :src="require('../../static/image/personal/paySel.png')" alt="" v-if="payValue==2">
                            <p v-else></p>
                        </div>
                    </div>
                    <div class="payBtn" @click="truePay">
                        确认
                    </div>
                </div>
            </div>
		</el-dialog>
        <!-- 微信支付二维码 -->
        <el-dialog :visible.sync="wxerweima" :append-to-body="true" :close-on-click-modal="false" center custom-class="erweima" top="20vh" width="300px">
            <div id="qrcode" ref="qrCodeUrl"></div>
        </el-dialog>
    </div>
</template>
<script>
import store from '../vuex/store'
import {mapState,mapMutations} from 'vuex';
import {info,getVipInfo,getVipOrder,getVipGive,rechargeVip,getPayorder} from '../services/api/personal'
import QRCode from 'qrcodejs2'
import {Base64} from 'js-base64'
export default {
    data(){
        return{
            navArr:[
                {id:1,txt:'购买记录',isSel:true},
                {id:2,txt:'赠送记录',isSel:false},
            ],
            showTable:0,
            tableData1:[],
            tableData2:[],
            vipList:[],
            selIndex:0,
            loading:false,
            vipTost:false,
            payPrice:'',
            payDay:'',
            vipId:'',
            payValue:1,
            wxerweima:false,
            ewmImg:'',
            orderTime:'',
            html:'',
            valueShow:false
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
        this.isLogin();
    },
    mounted(){
        this.windowChange();
    },
    methods:{
        ...mapMutations(["windowChange","changeUser","alertTxt"]),
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
            if(id==1){
                this.getVipOrderThis();
            }else if(id==2){
                this.getVipGiveThis();
            }
        },
        handleScroll(vertical, horizontal, nativeEvent){
            console.log(nativeEvent.target.scrollTop,nativeEvent.target.clientHeight,nativeEvent.target.scrollHeight)
            if(nativeEvent.target.scrollTop+nativeEvent.target.clientHeight==nativeEvent.target.scrollHeight){
                this.loading=true;
            }
        },
        // 获取会员套餐列表
        getVipInfoThis(){
            getVipInfo().then((res)=>{
                if(res.data.code==0){
                    this.vipList=res.data.data.list;
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
        // 选择会员套餐
        selVip(index){
            this.selIndex=index;
        },
        // 获取购买记录
        getVipOrderThis(){
            this.valueShow=false;
            getVipOrder().then((res)=>{
                if(res.data.code==0){
                    let arr=res.data.data.list;
                    if(arr.length>0){
                        let newArr=[];
                        for(let i=0;i<arr.length;i++){
                            let obj={};
                            obj['name']=arr[i].subject;
                            obj['date']=this.getDate(arr[i].create_time);
                            obj['payType']=arr[i].payment=='alipay'?'支付宝':'微信';
                            obj['price']=arr[i].amount;
                            obj['type']=arr[i].status==1?'购买成功':'购买失败';
                            newArr.push(obj);
                        }
                        this.tableData1=newArr;
                    }else{
                        this.tableData1=arr;
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
        // 获取赠送记录
        getVipGiveThis(){
            this.valueShow=false;
            getVipGive().then((res)=>{
                if(res.data.code==0){
                    let arr=res.data.data.list;
                    if(arr.length>0){
                        let newArr=[];
                        for(let i=0;i<arr.length;i++){
                            let obj={};
                            obj['name']=arr[i].description;
                            obj['date']=this.getDate(arr[i].create_time);
                            obj['time']=arr[i].day==0?'一小时':`${arr[i].day}天`;
                            obj['type']='领取成功';
                            newArr.push(obj);
                        }
                        this.tableData2=newArr;
                    }else{
                        this.tableData2=arr;
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
        // 验证登录是否失效
        isLogin(){
            info().then((res)=>{
                if(res.data.code==-200){
                    localStorage.removeItem('token');
                    this.changeUser('');
                    this.$router.push('/');
                }else{
                    this.changeUser(JSON.stringify(res.data.data));
                    this.getVipInfoThis();
                    if(this.showTable==1){
                        this.getVipOrderThis();
                    }else if(this.showTable==2){
                        this.getVipGiveThis();
                    }
                }
            })
        },
        // 购买套餐
        openPay(price,day,id){
            this.vipTost=true;
            this.payPrice=price;
            this.payDay=day;
            this.vipId=id;
        },
            // 选择支付方式
        selPayType(num){
            this.payValue=num;
        },
            // 支付
        truePay(){
            let data={};
            data['payType']=this.payValue==1?'wxpay':'alipay';
            data['vipId']=this.vipId;
            rechargeVip(data).then((res)=>{
                if(data.payType=='wxpay'){
                    if(res.data.code==0){
                        this.vipTost=false;
                        this.wxerweima=true;
                        this.ewmImg=Base64.decode(res.data.data.qrcode_text);
                        setTimeout(()=>{
                            this.qrcode();
                            this.getPayorder(res.data.data.order.order_sn);
                        },500)
                    }else if(res.data.code==-200){
                        this.alertTxt({msg:res.data.msg,type:'error'});
                        localStorage.removeItem('token');
                        this.changeUser('');
                        this.$router.push('/');
                    }else{
                        this.alertTxt({msg:res.data.msg,type:'error'});
                    }
                }else if(data.payType=='alipay'){
                    console.log(res);
                    if(res.data){
                        this.html=res.data;
                        this.vipTost=false;
                        this.$nextTick(() => {
                            document.forms[0].submit()
                        })
                    }else if(res.data.code==-200){
                        this.alertTxt({msg:res.data.msg,type:'error'});
                        localStorage.removeItem('token');
                        this.changeUser('');
                        this.$router.push('/');
                    }else{
                        this.alertTxt({msg:res.data.msg,type:'error'});
                    }
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
        },
        // 生成二维码
        qrcode () {
            document.getElementById("qrcode").innerHTML = "";  
            let qrcode = new QRCode(this.$refs.qrCodeUrl, {  
                width: 180,  
                height: 180, // 高度  
                text: this.ewmImg // 二维码内容  
            })  
        },
        // 监听订单状态
        getPayorder(id){
            clearInterval(this.orderTime);
            let data={};
            data['order_sn']=id;
            this.orderTime=setInterval(()=>{
                getPayorder(data).then((res)=>{
                    if(res.data.code==0){
                        if(res.data.data.status==1){
                            this.alertTxt({msg:'支付成功',type:'success'});
                            this.wxerweima=false;
                            this.getVipOrderThis();
                            this.isLogin();
                            clearInterval(this.orderTime);
                        }else if(res.data.data.status!=0){
                            this.wxerweima=false;
                            clearInterval(this.orderTime);
                        }
                    }
                })
            },1000)
        }  
    },
    destroyed(){
        localStorage.removeItem('showTable');
        clearInterval(this.orderTime);
    },
    computed:mapState(["ops","opsx","screenHeight","arrUser"])
}
</script>
<style>
    .erweima.el-dialog{
        height: 30vh;
    }
    .erweima .el-dialog__body{
        padding: 0 !important;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 3vh;
    }
    .erweima .el-dialog__header{
        border-bottom: none;
    }
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
    .vipTost.el-dialog{
        width: 350px;
        height: 450px;
        border-radius: 10px 10px 0 0;
    }
    .vipTost .el-dialog__header{
        background-color: #6495ed;
        border-radius: 10px 10px 0 0;
        border-bottom: none;
    }
    .vipTost .el-dialog__title{
        color: #fff;
    }
    .vipTost .el-dialog__headerbtn .el-dialog__close{
        color: #fff;
    }
    .vipTost .el-dialog__headerbtn .el-dialog__close:hover{
        color: #fff !important;
    }
    .vipTost .el-dialog__body{
        width:100%;
        padding: 0 !important;
    }
    .vipTost.el-dialog .priceBox{
        width: 100%;
        height: 150px;
        background:linear-gradient(2deg, #6951dc 0%, #5a6eda 50%, #6495ed 100%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
    }
    .vipTost.el-dialog .priceBox p{
        font-size: 18px;
    }
    .vipTost.el-dialog .priceBox h3{
        font-size: 30px;
        margin: 10px 0;
    }
    .vipTost.el-dialog .paybox{
        width: 100%;
        height: 230px;
        padding: 20px 30px 0 30px;
        box-sizing: border-box;
    }
    .vipTost.el-dialog .paybox .payTypeItem{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 30px;
    }
    .vipTost.el-dialog .paybox .payTypeItem .left{
        display: flex;
        align-items: center;
    }
    .vipTost.el-dialog .paybox .payTypeItem .left img{
        width: 36px;
        height: 36px;
        margin-right: 20px;
    }
    .vipTost.el-dialog .paybox .payTypeItem .right img{
        width: 30px;
        height: 30px;
    }
    .vipTost.el-dialog .paybox .payTypeItem .right p{
        width: 24px;
        height: 24px;
        border-radius: 12px;
        border: 1px solid #6495ed;
    }
    .vipTost.el-dialog .paybox .payBtn{
        width: 150px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        color: #fff;
        background-color:#6495ed;
        margin:15px auto 0 auto;
    }
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
        font-size: 20px;
        margin: 30px auto;
        width: 50px;
        position: relative;
    }
    .member .pubBox .pubitem .oldprice p{
        width: 100%;
        height: 2px;
        background-color: #aaa;
        position: absolute;
        top:12px;
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
    .member .pubBox .pubitem.selected{
        border: 1px solid #DEBEA5;
        background-color: #F5DABF;
    }
    .member .pubBox .pubitem.selected .btn{
        background-color: #DEAE81;
    }
    .member .pubBox .pubitem:not(.selected){
        border: 1px solid #DEDEDE;
    }
    .member .pubBox .pubitem:nth-child(2){
        margin:0 100px;
    }
    .member .recordBox{
        width: 100%;
        height: 320px;
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
    .member .vipTip{
        font-size: 20px;
        color: #FD4344;
    }
</style>