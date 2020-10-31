<template>
  <animal-card
    name="biba"
    gender="мужской"
    :age="5"
    address="ulitsa pushkina dom kolotushkina"
    image="image.jpg"
  />
</template>
<script>
import AnimalCard from '~/components/main/AnimalCard';

/**
 * @module pages/index
 * @vue-computed {Object} seoObject - Объект настройки SEO для данной страницы
 */

export default {
  components: { AnimalCard },
  computed: {
    seoObject() {
      return {
        title: 'Главная страница Boilerplate',
        description: 'Описание главной Бойлерплейта',
      };
    },
  },

  /**
   * Подключение SEO с помощью тега функция head прдоставляемой Nuxt
   * @returns {{meta, title: *}}
   */
  head() {
    return this.$setMeta(this.$store, this.seoObject);
  },
};
</script>
<style lang="scss" scoped>
.default {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
