<template>
  <div class="main">
    <main-header />
    <v-container>
      <v-row>
        <v-col :cols="3" />
        <v-col :cols="9">
          <v-row>
            <v-col
              v-for="n in $store.state.animals.current"
              :key="n"
              :cols="4"
            >
              <animal-card
                :name="name"
                :gender="gender"
                :age="age"
                :address="address"
                :type="type"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import AnimalCard from '~/components/main/AnimalCard';
import MainHeader from '~/components/main/MainHeader';

/**
 * @module pages/index
 * @vue-computed {Object} seoObject - Объект настройки SEO для данной страницы
 */

export default {
  components: { MainHeader, AnimalCard },
  computed: {
    seoObject() {
      return {
        title: 'Главная страница Boilerplate',
        description: 'Описание главной Бойлерплейта',
      };
    },
  },

  async middleware({ store }) {
    await store.dispatch('animals/FETCH_PAGES');
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
