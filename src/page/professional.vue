<template>
    <div class="professional">
        <div class="topNav">
             <topnav :topIcon="topIcon" :activeIndex="activeIndex"></topnav>
        </div>
        <div class="twoNav">

        </div>
    </div>    
</template>
<script>
import topnav from '../components/topnav'
export default {
    data(){
        return{
            topIcon:'../../static/image/top/logo2@2x.png',
            activeIndex:'2'
        }
    },
    components:{
        topnav
    }
}
</script>
<style scoped>
    .twoNav{
        width: 100%;
        height: 50px;
        background-color: #616576;
    }
</style>