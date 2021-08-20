<template>
  <div class="block">
    <div class="header">
      <p>{{header.title}}</p>
      <el-tag :type="header.type">
        {{header.tag}}
      </el-tag>
    </div>
    <el-divider></el-divider>
    <div class="center">
      <div class="num">
        {{unit}}
        <count-to :startVal='startVal'
                  :endVal='centerNum.top'
                  :duration='duration'></count-to>
      </div>
      <el-progress v-if="showProgress"
                   :text-inside="true"
                   :stroke-width="15"
                   :percentage="percentage"></el-progress>
      <div class="proportion"
           v-else>
        <p>
          {{center.leftName}}
          <count-to :startVal='startVal'
                    :endVal='centerNum.left'
                    :duration='duration'></count-to> %
        </p>
        <p>
          {{center.rightName}}
          <count-to :startVal='startVal'
                    :endVal='centerNum.right'
                    :duration='duration'></count-to> %

        </p>
      </div>

    </div>
    <el-divider></el-divider>
    <div class="buttom">
      <p>
        {{buttom.name}}
      </p>
      <p>
        <count-to :startVal='0'
                  :endVal='buttomNum'
                  :duration='duration'></count-to>
        {{unit}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    header: Object,
    center: Object,
    buttom: Object,
    unit: String,
    showProgress: {
      type: Boolean,
      default: false
    }

  },
  data() {
    return {
      duration: 3000,
      startVal: 0,
      centerNum: {
        top: 0,
        left: 0,
        right: 0
      },
      percentage: 0,
      buttomNum: 0
    };
  },
  mounted() {
    this.init()
    if (this.showProgress) {
      this.setPercentage()
    }

  },
  methods: {
    init() {
      const { randomNum } = this
      this.centerNum.top = randomNum(10000)
      this.centerNum.left = randomNum(100)
      this.centerNum.right = randomNum(100)
      this.buttomNum = randomNum(1000000)
    },
    randomNum(num) {
      return parseInt(Math.random() * num)
    },
    setPercentage() {
      let num = this.randomNum(100)
      setInterval(() => {
        if (this.percentage < num) {
          this.percentage++
        }
      })
    }
  }
}

</script>
<style lang='scss' scoped>
.block {
  height: 200px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  .header {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    padding: 10px;
    height: 50px;
  }
  .el-divider {
    margin: 0;
  }
  .center {
    padding: 10px;
    height: 100px;
    .num {
      font-size: 1.875rem;
    }
    .el-progress {
      margin-top: 10px;
    }
    .proportion {
      font-size: 14px;
      padding: 10px;
      display: flex;
      justify-content: space-between;
    }
  }
  .buttom {
    padding: 10px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
  }
}
</style>