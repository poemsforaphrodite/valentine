<template>
  <div>
    <h1>hello</h1>
    <img :src="imagePath" alt="Image">
  </div>
</template>

<script>
export default {
  name: "Image",
  props: ["imageName"],
  computed: {
    imagePath() {
      // Assuming your images are stored in a specific directory
      return require(`@/`);
    }
  }
};
</script>
