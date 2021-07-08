<template>
    <div>
      <p class="center">{{title}}</p>
      <div class="box">
        <ymLabel :title="'姓名'">
          <p>我的姓名</p>
        </ymLabel>
        <ymLabel :title="'性别'">
          <ymSwitch :value="switchValue" @switchChange="switchChange" :bgBackground="bgBackground"></ymSwitch>
        </ymLabel>
        <ymLabel :title="'input框'">
          <input class="formInput"/>
        </ymLabel>
        <ymLabel :title="'textarea框'">
          <textarea class="formInput"/>
        </ymLabel>
        <ymLabel :title="'radio'">
          <ymRadio
            :radioList='selectList'
            :defaultValue="radioDefaultValue"
            @changeRadio = "changeRadio"
          />
        </ymLabel>
        <ymLabel :title="'checkbox'">
          <ymCheckbox
            :selectList='selectList'
            :defaultValue="checkDefaultValue"
            @changeCheckbox = "changeCheckbox"
          />
        </ymLabel>
        <ymLabel :title="'checkbox'" :borderBottom="false">
          <select>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </ymLabel>
        <ymLabel :title="'input框'">
          <input class="formInput"/>
        </ymLabel>
        <ymLabel :title="'input框'">
          <input class="formInput"/>
        </ymLabel>
        <ymLabel :title="'input框'">
          <input class="formInput"/>
        </ymLabel>
        <ymLabel :title="'input框'">
          <input class="formInput"/>
        </ymLabel>
        <ymLabel :title="'input框'">
          <input class="formInput"/>
        </ymLabel>
      </div>
      <p @click="showSheet">sheet</p>
      <ymSheet
        :isShow="isShow"
        :sheetList="sheetList"
        :sheetName = "'title'"
        @clickSheet = "clickSheet"
      />
      <div class="btn">提 交</div>
    </div>
</template>
<script>
// import ymHelloWord from '../../components/ym-hello-word/ym-hello-word.vue'
import ymLabel from '../../components/ym-label/ym-label.vue'
import ymSwitch from '../../components/ym-switch/ym-switch.vue'
import ymCheckbox from '../../components/ym-checkbox/ym-checkbox.vue'
import ymRadio from '../../components/ym-radio/ym-radio.vue'
import ymSheet from '../../components/ym-sheet/ym-sheet.vue'
export default{
  data () {
    return {
      title: 'form',
      switchValue: true,
      bgBackground: '#1da1f2',
      address: {
        province: '',
        city: ''
      },
      provinceList: [{id: 1, name: '1'}, {id: 2, name: '2'}, {id: 3, name: '3'}, {id: 4, name: '4'}, {id: 5, name: '5'}, {id: 6, name: '6'}],
      cityList: [{id: 11, name: '11'}, {id: 22, name: '22'}, {id: 31, name: '31'}, {id: 41, name: '41'}, {id: 51, name: '51'}, {id: 61, name: '66'}],
      selectList: [{value: 1, name: '选项1'}, {value: 2, name: '选项2'}, {value: 3, name: '选项1'}, {value: 4, name: '选项2'}, {value: 5, name: '选项1'}, {value: 6, name: '选项2'}],
      checkDefaultValue: [1],
      radioDefaultValue: 1,
      isShow: false,
      sheetList: [{title: '选项1', value: 'val1'}, {title: '选项2', value: 'val2'}, {title: '选项3', value: 'val3'}]
    }
  },
  components: {
    ymLabel,
    ymSwitch,
    ymCheckbox,
    ymRadio,
    ymSheet
  },
  computed: {
    showAddress () {
      let province = this.provinceList.find(item => item.id === this.address.province) || {name: '选择省'}
      let city = this.cityList.find(item => item.id === this.address.city) || {name: '选择市'}
      return `${province.name} - ${city.name}`
    }
  },
  methods: {
    switchChange (e) {
      console.log(e)
    },
    getStore () {
      console.log(this.$store.state.personInfo)
    },
    changeRadio (data) {
      this.radioDefaultValue = data
    },
    changeCheckbox (data) {
      this.checkDefaultValue = data
    },
    showSheet () {
      this.isShow = true
    },
    clickSheet (data) {
      console.log(data)
      this.isShow = false
    }
  }
}
</script>
<style lang="scss" scoped>
.center{
  text-align: center;
}
.box{
  width: 94%;
  margin: 1rem auto;
  padding: 1rem 0;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: .2rem;
  .formInput{
    font-size:1rem;
  }
}
.btn{
  width: 90%;
  margin: 3rem auto;
  background: #1da1f2;
  text-align: center;
  height: 3rem;
  line-height: 3rem;
  color: #fff;
  border-radius: .5rem;
}
</style>
