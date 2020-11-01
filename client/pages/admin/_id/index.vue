<template>
  <div>
    <v-row>
      <v-col>
        <v-btn
          v-if="availableButtons"
          @click="downloadTemplate"
        >
          Скачать образец
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
          v-if="availableButtons"
          @click="downloadData"
        >
          Скачать данные
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
          v-if="availableButtons"
          @click="addItem"
        >
          Добавить строку
        </v-btn>
      </v-col>
      <v-spacer />
      <v-spacer />
      <v-spacer />
      <v-spacer />
    </v-row>
    <v-file-input label="Загрузить таблицу" />
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Поиск"
      single-line
      hide-details
    />
    <v-data-table
      :headers="tableHeaders"
      :items="tableItems"
      :items-per-page="5"
      :search="search"
      fixed-header
      @click:row="handleTableItemCLick"
    />
  </div>
</template>

<script>
export default {
  name: 'Index',

  layout: 'admin',

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
          record: 'собака',
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
    availableButtons() {
      return this.$store.state.admin.current.can;
    },
    tableHeaders() {
      console.log(this.$store.state.admin.current.data.table);
      return this.$store.state.admin.current.data.table;
    },
    tableItems() {
      // return this.$store.state.currentPage.items.filter(item => item.)
      return this.$store.state.admin.current.data.items;
    },
  },

  async middleware({ store, route }) {
    await store.dispatch('admin/FETCH_PAGES');
    await store.dispatch('admin/FETCH_PAGE_BY_ID', route.params.id);
  },

  methods: {
    downloadTemplate() {
    },
    downloadData() {
    },
    addItem() {
    },
    handleTableItemCLick(payload) {
      console.log(payload);
    },
  },
};
</script>
