<template>
  <div>
    index
  </div>
</template>

<script>
export default {
  name: 'Index',

  async middleware({ store }) {
    await store.dispatch('admin/FETCH_PAGES');
  },

  layout: 'admin',
};
</script>

<style lang="scss" scoped>

</style>
