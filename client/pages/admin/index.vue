<template>
  <v-container>
    index
  </v-container>
</template>

<script>
export default {
  name: 'Index',

  layout: 'admin',

  async middleware({ store }) {
    await store.dispatch('admin/FETCH_PAGES');
  },
};
</script>
