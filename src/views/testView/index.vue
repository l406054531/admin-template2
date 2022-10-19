<template>
  <div>
    {{userinfo.name}}
    <ul>
      <li v-for="(item,index) in messages" :key="index">
        {{item}}
      </li>
    </ul>
    <el-input v-model="input" />
    <el-button @click="handleSend">发送</el-button>
  </div>
</template>

<script>
import io from "socket.io-client"
export default {
  data () {
    return {
      socket: null,
      userinfo: {},
      input: '',
      messages: []
    }
  },

  mounted () {
    let obj = {
      event: "hello",
      data: "lx"
    }
    let obj2 = {
      event: "enter",
      data: "lx"
    }
    // this.socket = io('ws://127.0.0.1:3001');
    // /** @type {WebSocket} */
    this.socket = new WebSocket("ws://127.0.0.1:3001");
    // this.socket.io('enter', (data) => {
    //   console.log(data);
    // })
    // console.log(this.socket);
    this.socket.onopen = () => {
      // this.socket.emit('enter',(e)=>{
      //   console.log(e);
      // })
      this.socket.send(JSON.stringify(obj))
    }
    this.socket.onmessage = (e) => {
      const data = JSON.parse(e.data)
      console.log(data.event);
      if (data.event == 'init') {
        this.userinfo = data.data
        console.log(this.userinfo);
      }
      if (data.event == 'message') {
        this.messages.push(data.data)
        console.log( this.messages);
      }

    }

  },

  methods: {
    handleSend () {
      const obj = {
        event: "message",
        data: this.input
      }
      this.socket.send(JSON.stringify(obj))
      console.log(1);
    }
  }


}
</script>
<style lang='scss' scoped>
</style>