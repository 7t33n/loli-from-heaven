<template>
  <div class="animal-list">
    <v-container>
      <v-row>
        <v-col
          :cols="3"
          md="4"
          sm="4"
        >
          <animal-filter />
        </v-col>
        <v-col
          :cols="9"
          md="8"
          sm="8"
        >
          <v-row>
            <v-col
              v-for="(item, n) in animals"
              :key="n"
              :cols="4"
              lg="4"
              md="6"
              sm="6"
            >
              <animal-card
                :id="item.id"
                :type="kinds.find((kind) => kind.id === item.KindId).value"
                :gender="sex.find((sexs) => sexs.id === item.SexId).value"
                :age="item.age"
                :name="item.name"
                :address="shelters.find((shelter) => shelter.id === 1).address"
                :img="item.image"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import AnimalFilter from '@/components/main/AnimalFilter';
import AnimalCard from '~/components/main/AnimalCard';

/**
 * @module pages/index
 * @vue-computed {Object} seoObject - Объект настройки SEO для данной страницы
 */

export default {
  components: { AnimalFilter, AnimalCard },
  computed: {
    seoObject() {
      return {
        title: 'Главная страница Boilerplate',
        description: 'Описание главной Бойлерплейта',
      };
    },
    animals() {
      return this.$store.state.animals.data;
    },
    shelters() {
      return this.$store.state.shelters.data;
    },
    kinds() {
      return this.$store.state.directory.kinds;
    },
    sex() {
      return this.$store.state.directory.sex;
    },
  },

  async middleware({ store }) {
    await store.dispatch('animals/FETCH_DATA');
    await store.dispatch('shelters/FETCH_DATA');
  },
};
</script>
<style lang="scss" scoped>

.animal-list {
  background: #f7f7f8;
}
</style>
