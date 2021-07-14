<template>
    <div>
        <ymButton :title="'设置store'" @clickBtn="setStore"/>
        <ymButton :title="'loading'" @clickBtn="showLoading"/>
        <ymButton :title="'dialog'" @clickBtn="showDialog"/>
        <ymButton :title="'toast'" @clickBtn="showToast"/>
        <ymButton :title="'sheet'" @clickBtn="showSheet"/>
        <ymButton :title="'get请求'" @clickBtn="getRequest"/>
        <ymButton :title="'post请求'" @clickBtn="postRequest"/>
        <ymButton :title="'表单类'" @clickBtn="gotoForm"/>
        <ymButton :title="'焦点图'" @clickBtn="gotoSwiper"/>
        <ymButton :title="'圆形抽奖'" @clickBtn="gotoLottery"/>
        <ymButton :title="'正方形抽奖'" @clickBtn="gotoLottery1"/>
        <ym-popup-dialog ref = 'dialog'/>
        <ymSheet
        :isShow="isSheetShow"
        :sheetList="sheetList"
        :sheetName = "'title'"
        @clickSheet = "clickSheet"
      />
    </div>
</template>
<script>
import ymSelect from '../../components/ym-select/ym-select.vue';
import ymPopupDialog from '../../components/ym-popup-dialog/ym-popup-dialog.vue';
import ymButton from '../../components/ym-button/ym-button.vue';
import ymSheet from '../../components/ym-sheet/ym-sheet.vue';
import { apiProtocol, apiLogin } from '@/api/api';
export default{
  data () {
    return {
      isSheetShow: false,
      sheetList: [{title: '选项1', value: 'val1'}, {title: '选项2', value: 'val2'}, {title: '选项3', value: 'val3'}]
    };
  },
  components: {
    ymPopupDialog,
    ymSelect,
    ymButton,
    ymSheet
  },
  methods: {
    setStore () {
      this.$store.commit('setPersonInfo', {
        name: 'abc',
        sex: '1'
      });
    },
    getRequest () {
      apiProtocol({type: 1000}).then(res => {
        console.log(res);
      });
    },
    postRequest () {
      apiLogin({
        email: '2222@qq.com',
        password: '123456'
      }).then(res => {
        console.log(res);
      });
    },
    gotoForm () {
      this.$router.push('/form');
    },
    gotoLottery () {
      this.$router.push('/lottery');
    },
    gotoLottery1 () {
      this.$router.push('/lottery1');
    },
    gotoSwiper () {
      this.$router.push('/swiper');
    },
    showLoading () {
      this.$showLoading({
        text: 'loading'
      });
      setTimeout(() => {
        this.$hideLoading();
      }, 3000);
    },
    showToast () {
      this.$toast({title: 'toast'});
    },
    showDialog () {
      this.$refs.dialog.show({
        reject: () => {
          console.log('reject');
        },
        resolve: () => {
          console.log('resolve');
        }
      });
    },
    showSheet () {
      this.isSheetShow = true;
    },
    clickSheet (data) {
      console.log(data);
      this.isSheetShow = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.swiper{
  width:100%;
  margin:1rem auto
}
</style>
