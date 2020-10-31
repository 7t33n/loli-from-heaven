<template>
  <div>
    <div>
      <v-btn @click="downloadTemplate">
        Скачать образец
      </v-btn>
      <v-btn @click="downloadData">
        Скачать данные
      </v-btn>
      <v-btn @click="addItem">
        Добавить строку
      </v-btn>
    </div>
    <v-form>
      <v-file-input label="Загрузить таблицу" />
      <v-select
        :items="itemsForSelect"
        label="Поиск по"
      />
    </v-form>
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Search"
      single-line
      hide-details
    />
    <v-data-table
      :headers="headers"
      :items="tableItemsMock"
      :items-per-page="5"
      class="elevation-1"
    />
  </div>
</template>

<script>
export default {
  name: 'index',

  data() {
    return {
      search: '',
      headers: [
        {
          text: 'карточка учета животного №',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'вид', value: 'kind' },
        { text: 'возраст, год', align: 'start', value: 'age' },
        { text: 'вес, кг', value: 'weight' },
        { text: 'кличка', value: 'name' },
        { text: 'пол', value: 'gender' },
      ],
      tableItemsMock: [
        {
          id: '1665з-20',
          kind: 'собака',
          age: 2016,
          weight: 25,
          name: 'Варя',
          gender: 'женский',
        },
      ],
    };
  },

  computed: {
    itemsForSelect() {
      return Object.keys(this.tableItemsMock[0]);
    },
    tableHeaders() {
      return this.$store.state.currentPage.fields;
    },
    tableItems() {
      // return this.$store.state.currentPage.items.filter(item => item.)
      return this.$store.state.currentPage.items;
    },
  },

  async middleware({ store, route }) {
    await store.dispatch('admin/FETCH_PAGES');
    console.log(route.params.id);
    await store.dispatch('admin/FETCH_PAGE_BY_ID', route.params.id);
  },

  layout: 'admin',

  methods: {
    downloadTemplate() {
    },
    downloadData() {
    },
    addItem() {
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
