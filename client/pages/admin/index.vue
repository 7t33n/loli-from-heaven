<template>
  <div>
    index-admin
  </div>
</template>

<script>
export default {
  name: 'index',

  async middleware({ store }) {
    await store.dispatch('admin/FETCH_PAGES');
  },

  layout: 'admin',
};
</script>

<style lang="scss" scoped>

</style>
