<template>
    <div class="box">
      <ymLabel :title="'姓名'">
        <p>我的姓名</p>
      </ymLabel>
      <ymLabel :title="'switch'">
        <ymSwitch :value="switchValue" @switchChange="switchChange" :bgBackground="switchBackground"></ymSwitch>
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
      <ymLabel :title="'select'" :borderBottom="false">
        <p @click="selectShow">{{selectValueString}}</p>
      </ymLabel>
      <ym-select
          :level1List="level1List"
          :level2List="level2List"
          :level3List="level3List"
          :defaultValue="selectDefaultValue"
          @changeSelect="changeSelect"
          @select="select"
          @cancel="cancel"
          :levelNumber="2"
          :isSelectShow="isSelectShow"
        ></ym-select>
    </div>
</template>
<script>
import ymLabel from '../../components/ym-label/ym-label.vue';
import ymSwitch from '../../components/ym-switch/ym-switch.vue';
import ymCheckbox from '../../components/ym-checkbox/ym-checkbox.vue';
import ymRadio from '../../components/ym-radio/ym-radio.vue';
import ymSelect from '../../components/ym-select/ym-select.vue';
export default{
  data () {
    return {
      switchValue: true,
      switchBackground: '#1da1f2',
      checkDefaultValue: [1],
      radioDefaultValue: 1,
      selectList: [{value: 1, name: '选项1'}, {value: 2, name: '选项2'}, {value: 3, name: '选项3'}],
      level1List: [
        { name: '请选择', value: '' },
        { name: '1', value: '1' },
        { name: '2', value: '2' },
        { name: '3', value: '3' },
        { name: '4', value: '4' }
      ],
      level2List: [
        { name: '请选择', value: '' },
        { name: '11', value: '11' },
        { name: '21', value: '21' },
        { name: '31', value: '31' },
        { name: '41', value: '41' }
      ],
      level3List: [{ name: '请选择', value: '' }],
      selectDefaultValue: [{ name: '2', value: '2' }, { name: '21', value: '21' }],
      selectValueString: '请选择',
      isSelectShow: false
    };
  },
  components: {
    ymLabel,
    ymSwitch,
    ymCheckbox,
    ymRadio,
    ymSelect
  },
  mounted () {
    if (this.selectDefaultValue.length > 0) {
      this.selectValueString = '';
      this.selectDefaultValue.map((item, index) => {
        index === this.selectDefaultValue.length - 1 ? this.selectValueString += item.name : this.selectValueString += item.name + '-';
      });
    }
  },
  methods: {
    switchChange (e) {
      console.log(e);
    },
    changeRadio (data) {
      this.radioDefaultValue = data;
    },
    changeCheckbox (data) {
      this.checkDefaultValue = data;
    },
    changeSelect (data) {
      if (data.level === 'level1') {
        if (data.selectValue) {
          this.level2List = [
            { name: '请选择', value: '' },
            { name: '11', value: '11' },
            { name: '21', value: '21' },
            { name: '31', value: '31' },
            { name: '41', value: '41' }
          ];
        } else {
          this.level2List = [{ name: '请选择', value: '' }];
        }
        this.level3List = [{ name: '请选择', value: '' }];
      } else if (data.level === 'level2') {
        if (data.selectValue) {
          this.level3List = [
            { name: '请选择', value: '' },
            { name: '111', value: '111' },
            { name: '211', value: '211' },
            { name: '311', value: '311' },
            { name: '411', value: '411' }
          ];
        } else {
          this.level3List = [{ name: '请选择', value: '' }];
        }
      }
    },
    selectShow () {
      this.isSelectShow = true;
    },
    select (data) {
      this.isSelectShow = false;
      this.selectDefaultValue = data;
      this.selectValueString = '';
      this.selectDefaultValue.map((item, index) => {
        index === this.selectDefaultValue.length - 1 ? this.selectValueString += item.name : this.selectValueString += item.name + '-';
      });
    },
    cancel () {
      this.isSelectShow = false;
    }
  }
};
</script>
<style lang="scss" scoped>
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
</style>
