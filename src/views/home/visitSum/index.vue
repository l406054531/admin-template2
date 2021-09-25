<template>
  <div class="visit-sum">
    <template v-for="(item,index) in blockList">
      <dv-border-box-8 :key="index">
        <div class="block">
          <div class="item">
            <p class="title">{{item.title}}</p>
            <count-to class="count"
                      :startVal='startVal'
                      :endVal='item.total'
                      :duration='duration'></count-to>
          </div>
        </div>
      </dv-border-box-8>

    </template>
  </div>
</template>

<script>
import { findTotal } from '@/api/accessRecord';
import { getDayStartEndTime } from '@/utils';
export default {
  data () {
    return {
      duration: 3000,
      startVal: 0,
      blockList: [
        {
          title: '日访问量',
          total: 0,
        },
        {
          title: '总访问量',
          total: 0,
        },
      ]
    }
  },
  mounted () {
    this.getVisitSum()
  },
  methods: {
    /**
     * @description 获取访问量
     */
    getVisitSum () {
      let params = getDayStartEndTime(new Date())
      findTotal(params).then(response => {
        const { queryTotal, allTotal } = response.data
        this.blockList[0].total = queryTotal
        this.blockList[1].total = allTotal
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.visit-sum {
  width: 100%;
  height: 100px;
  line-height: 100px;
  display: grid;
  grid-template-columns: repeat(4, 24%);
  justify-content: space-between;
  .block {
    height: 100%;
    padding: 0px 20px;
    .item {
      display: flex;
      justify-content: space-between;
      font-size: 23px;
      font-family: "STCaiyun"; //STCaiyun FZShuTi
      .title {
      }
      .count {
      }
    }
  }
}
</style>