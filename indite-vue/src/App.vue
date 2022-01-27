<template>
  <div id="container">
    <Header></Header>
    <Main></Main>
  </div>
</template>
<script>
import Header from './components/Header'
import Main from './components/Main'
export default {
  components: {
    Header,Main
  }
}
</script>
<style lang="scss">
body{
  font-family: "Roboto", Arial, sans-serif;
	background: #eee;
	font-size: 15px;
	line-height: 1.5em;
	color: #444;
	font-weight: 300;
  a{
    text-decoration: none;
    outline: 0;
  }
  ::selection {
    background: #333;
      color: #fff;
  }
  #container{
    margin: 40px auto;
    max-width: 1200px;
    background: #f5f5f5;
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    display: flex;
    overflow: hidden;
  }
}
</style>
