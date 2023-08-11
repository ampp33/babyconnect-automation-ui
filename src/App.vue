<template>
  <div style="margin: 10px">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      ocrData: null
    }
  },
  methods: {
    setOcrData(ocrData) {
      this.ocrData = ocrData
    },
    getOcrData() {
      return this.ocrData
    }
  },
  provide() {
    return {
      setOcrData: this.setOcrData,
      getOcrData: this.getOcrData,
    }
  }
}
</script>

<style>
button {
  /* stop iphone from overriding button styling */
  -webkit-appearance: none;
}

input, button {
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  color: black
}

body {
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  color: #fff
}
</style>
