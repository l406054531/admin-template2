<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render (h, context) {
    const { icon, title } = context.props
    const vnodes = []

    if (icon) {
      let i = "iconfont " + icon
      vnodes.push(<i class={i} style="padding: 10px;" />)
    }

    if (title) {
      vnodes.push(<span slot='title' >{(title)}</span>)
    }

    return vnodes
  }
}
</script>
