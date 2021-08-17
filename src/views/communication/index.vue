<template>
  <div class="main">
    <el-button type="success"
               @click="onSend">发送</el-button>

    <phoneTemplate class="phoneTemplate">
      <!-- <div class="left">
        <div class="left-item">
          <div class="left-message-block">
            <div class="left-jiao">
            </div>
            <div class="left-message">
              <p>aaa</p>
            </div>
          </div>
        </div>
      </div> -->
      <!-- 
      <div class="right">
        <div class="right-item">
          <div class="right-message-block">
            <div class="right-message">
              <p></p>
            </div>
            <div class="right-jiao">
            </div>
          </div>
        </div>
      </div> -->

    </phoneTemplate>
  </div>
</template>

<script>
import { initWebSocket, websocketonMessage, websocketSend, websocketClose } from "@/utils/myWebscoket"
import phoneTemplate from "./phoneTemplate.vue"
import { getUserInfo } from "@/utils/cache"
// import VueSocketIO from 'vue-socket.io'
// import Vue from 'vue'
// Vue.use(new VueSocketIO({
//   debug: true,
//   // 服务器端地址
//   connection: '/socket.io',

// }))
export default {
  components: { phoneTemplate },
  data() {
    return {
      message: [],
      rightMessage: [],
      phoneMessage: "",
      msgElement: ""
    };
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    // websocketClose()
  },
  methods: {
    init() {
      let ip = 'ws://' + '127.0.0.1:3000'
      initWebSocket(ip)
      this.onMessage()
      this.$nextTick(() => {
        this.msgElement = document.querySelector(".mofang-demo")
        console.log(this.msgElement);
      })
      //   let a = document.querySelector(".phoneTemplate")
      //   a.appendChild
    },
    onMessage() {
      websocketonMessage((evt) => {
        let data = JSON.parse(evt.data);
        let addEl = document.createElement("div")

        if (data.username === JSON.parse(getUserInfo()).nickname) {
          addEl.innerHTML = `<div class="right">
                               <div class="right-item">
                                  <div class="right-message-block">
                                     <div class="right-message">
                                         <p>${data.message}</p>
                                     </div>
                                     <div class="right-jiao"
                                     </div>
                                    </div>
                                 </div>
                              </div>`
        } else {
          addEl.innerHTML = ` <div class="left">
                                  <div class="left-item">
                                    <div class="left-message-block">
                                        <div class="left-jiao">
                                        </div>
                                        <div class="left-message">
                                            <p>${data.message}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>` }
        this.msgElement.appendChild(addEl)
      })
    },
    onSend() {
      let data = { message: Math.random() * 100, username: JSON.parse(getUserInfo()).nickname }

      websocketSend(data)
    }
  }
}

</script>
<style lang='scss' scoped>
::v-deep {
  .left {
    overflow: hidden;
    .left-item {
      float: left;
    }
  }
  .right {
    overflow: hidden;
    .right-item {
      float: right;
    }
  }
  .left-message-block {
    display: flex;
    margin: 5px 0;
    .left-message {
      word-break: break-all;
      // width: 75%;
      //   min-height: 80px;
      padding: 10px;
      background: #fff;
      border-radius: 0px 5px 5px 5px;
    }
    .left-jiao {
      width: 0px;
      height: 0px;
      border-top: 7px solid transparent;
      border-left: 7px solid transparent;
      border-right: 7px solid #fff;
      border-bottom: 7px solid transparent;
      //   margin-top: -1px;
    }
  }
  .right-message-block {
    display: flex;
    margin: 5px 0;
    .right-message {
      word-break: break-all;
      // width: 75%;
      //   min-height: 80px;
      padding: 10px;
      background: #fff;
      border-radius: 5px 0px 5px 5px;
    }
    .right-jiao {
      width: 0px;
      height: 0px;
      border-top: 7px solid transparent;
      border-left: 7px solid #fff;
      border-right: 7px solid transparent;
      border-bottom: 7px solid transparent;
      //   margin-top: -1px;
    }
  }
}
</style>
