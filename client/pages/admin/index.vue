<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>
          Добро пожаловать в ваш персональный кабинет базы данных бездомных животных
        </h1>
        <br>
        <h2 class="font-weight-regular">
          Это рабочая область.
        </h2>
        <h2 class="font-weight-regular">
          Слева отображается дерево навигации.
        </h2>
        <h2 class="font-weight-regular">
          Сверху есть переключатель темной и светлой темы для удобства вашего зрительного восприятия.
        </h2>
        <h2 class="font-weight-regular">
          Сверху и справа есть кнопка выхода из кабинета.
        </h2>
      </v-col>
      <v-spacer />
    </v-row>
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
