<template>
  <v-container>
    <h1>
      Добро пожаловать в ваш персональный кабинет базы данных бездомных животных
    </h1>
    <h2>
      Это рабочая область
    </h2>
    <h2>
      Слева отображается дерево навигации
    </h2>
    <h2>
      Сверху есть переключатель темной и светлой темы для удобства вашего зрительного восприятия
    </h2>
    <h2>
      Сверху и справа есть кнопка выхода из кабинета
    </h2>
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
