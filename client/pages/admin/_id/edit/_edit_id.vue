<template>
  <v-form>
    <v-row>
      <v-col>
        <h2>
          {{ actionMode || 'Тип операции' }}
        </h2>
      </v-col>
      <v-col>
        <v-btn color="red lighten-3" @click="deleteItem">
          удалить запись
        </v-btn>
      </v-col>
    </v-row>
    <br>
    <v-text-field
      v-if="true"
      label="Поле для заполнения"
      placeholder="значение поля"
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

  data() {
    return {
      // 'edit', or 'add'
      actionMode: '',
    };
  },

  methods: {
    handleSubmit() {
      console.log(`/admin/${this.$store.state.admin.current.type}`);
      // this.$router.push(`/admin/${this.$store.state.admin.current.type}`);
    },
    deleteItem() {
    },
  },
};
</script>
