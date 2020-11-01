<template>
  <v-form>
    <h2>
      Edit or add or watch item
    </h2>
    <br>
    <v-text-field
      v-if="true"
      label="Outlined"
      placeholder="Placeholder"
      outlined
    />
    <v-autocomplete
      v-if="false"
      label="Outlined"
      placeholder="Placeholder"
      outlined
    />
    <v-btn
      v-if="true"
      block
      @click="handleSubmit"
    >
      сохранить
    </v-btn>
  </v-form>
</template>

<script>
export default {
  name: 'EditPage',

  layout: 'admin',

  async middleware({ store, route }) {
    await store.dispatch('admin/FETCH_PAGES');
    await store.dispatch('admin/FETCH_PAGE_BY_ID', route.params.id);
  },

  methods: {
    handleSubmit() {
      console.log(`/admin/${this.$store.state.admin.current.type}`);
      // this.$router.push(`/admin/${this.$store.state.admin.current.type}`);
    },
  },
};
</script>
