<template>
    <div class="dialog" v-if="isShow">
        <div class="mask" @click="hide"></div>
        <div class="content">
            <p class="title">{{title}}</p>
            <div class="tips">{{content}}</div>
            <div class="btns" v-if="btns.length == 2">
                <div class="btn btn1" @click="cancel">{{btns[1]}}</div>
                <div class="btn btn2" @click="sure">{{btns[0]}}</div>
            </div>
            <div class="btns" v-if="btns.length == 1">
                <div class="btn btn3" @click="sure">{{btns[0]}}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default{
  data () {
    return {
      isShow: false,
      title: '',
      content: '',
      btns: [],
      reject: null,
      resolve: null
    };
  },
  methods: {
    show (options) {
      this.title = options && options.title ? options.title : '标题';
      this.content = options && options.content ? options.content : '提示语';
      this.btns = options && options.btns ? options.btns : ['确定', '取消'];
      this.reject = options && options.reject ? options.reject : null;
      this.resolve = options && options.resolve ? options.resolve : null;
      this.isShow = true;
    },
    hide () {
      this.isShow = false;
    },
    cancel () {
      this.reject();
      this.hide();
    },
    sure () {
      this.resolve();
      this.hide();
    }
  }
};
</script>

<style lang="scss" scoped>
.dialog{
  .mask{
    position: fixed;
    left:0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #000;
    opacity: .3;
  }
  .content{
    position: fixed;
    top: 50%;
    left: 50%;
    width: 75%;
    transform: translate(-50%, -50%);
    border-radius: 1rem;
    background: #fff;
    z-index: 999;
    padding: 0 1rem 1rem;
    .title{
      font-size: 1rem;
      color: #333;
      line-height: .8rem;
      text-align: center;
      font-weight: bold;
      padding: .8rem 0;
      border-bottom:1px solid #EBEDF0;
    }
    .tips{
      margin: .8rem 0;
      text-align: center;
      font-size: 0.8rem;
    }
    .btns{
      display: flex;
      justify-content: space-between;
    }
    .btn{
      width:40%;
      height: 2rem;
      line-height: 2rem;
      border: 1px solid #DA0605;
      text-align: center;
      border-radius: .5rem;
    }
    .btn1{
      color: #DA0605;
    }
    .btn2{
      background: #DA0605;
      color: #fff;
    }
    .btn3{
      width: 100%;
      background: #DA0605;
      color: #fff;
    }
  }
}
</style>
