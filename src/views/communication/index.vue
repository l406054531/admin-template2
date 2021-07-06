<template>
  <div>
    <el-button type="success"
               @click="onSend">发送</el-button>
    {{message}}
  </div>
</template>

<script>
import { initWebSocket, websocketonMessage, websocketSend, websocketClose } from "@/utils/myWebscoket"
// import VueSocketIO from 'vue-socket.io'
// import Vue from 'vue'
// Vue.use(new VueSocketIO({
//   debug: true,
//   // 服务器端地址
//   connection: '/socket.io',

// }))
export default {
  data() {
    return {
      message: null
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
        let ip = 'ws://' + '127.0.0.1:3005'
        initWebSocket(ip)
        this.onMessage()
    },
    onMessage() {
      websocketonMessage((evt) => {
        console.log(evt.data);
        // let data = JSON.parse(evt.data);
        // this.message=data
      })
    },
    onSend() {
      let data = { message: Math.random() * 100, username: this.$store.getters.name }
      websocketSend(data)
    }
  }
}

</script>
<style lang='scss' scoped>
</style>