<template>
  <div class="animal-details">
    <v-container>
      <v-row>
        <v-col>
          <div class="animal-details__header">
            <animal-back-button />
          </div>
          <div class="animal-details__title">
            {{ getName }}
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          :cols="4"
          md="5"
          sm="6"
        >
          <app-picture :src="getImage" class="animal-details__image" />
        </v-col>
        <v-col
          :cols="8"
          md="7"
          sm="6"
        >
          <v-row>
            <v-col class="animal-details__fields">
              <div class="animal-details__info">
                {{ getInfo }}
              </div>
              <div class="animal-details__field">
                <div class="animal-details__type">
                  Вес:
                </div>
                <div class="animal-details__value">
                  {{ this.$store.state.animals.current.general.weight }}
                </div>
              </div>
              <div class="animal-details__field">
                <div class="animal-details__type">
                  Окрас:
                </div>
                <div class="animal-details__value">
                  {{ this.$store.state.animals.current.general.color }}
                </div>
              </div>
              <div class="animal-details__field">
                <div class="animal-details__type">
                  Размер:
                </div>
                <div class="animal-details__value">
                  {{ this.$store.state.animals.current.general.size }}
                </div>
              </div>
              <div class="animal-details__field">
                <div class="animal-details__type">
                  {{ `Поступил${getGenderEnding} в приют:` }}
                </div>
                <div class="animal-details__value">
                  {{ this.$store.state.animals.current.catch.orderDate }}
                </div>
              </div>
              <div class="animal-details__field">
                <div class="animal-details__type">
                  {{ `Стерилизован${getGenderEnding}:` }}
                </div>
                <div class="animal-details__value">
                  {{ this.$store.state.animals.current.additional.sterilization }}
                </div>
              </div>
              <div class="animal-details__field">
                <div class="animal-details__type">
                  Состояние:
                </div>
                <div class="animal-details__value">
                  {{ this.$store.state.animals.current.health.anamnesis }}
                </div>
              </div>
              <div class="animal-details__field">
                <div class="animal-details__type">
                  Адрес приюта:
                </div>
                <div class="animal-details__value">
                  {{ this.$store.state.animals.current.responsible.address }}
                </div>
              </div>
              <nuxt-link
                class="animal-details__button"
                :to="`/AnimalAdopt/${this.$store.state.animals.current.shelter.id}`"
              >
                Выбрать друга
              </nuxt-link>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AnimalBackButton from '@/components/general/AnimalBackButton';
import AppPicture from '@/components/general/AppPicture';

export default {
  name: 'AnimalDetails',
  components: { AppPicture, AnimalBackButton },
  computed: {
    getName() {
      const { nickname, sex } = this.$store.state.animals.current.general;
      const placeholder = sex === 'мужской' ? 'Хороший мальчик' : 'Хорошая девочка';
      return nickname === 'без клички'
        ? placeholder
        : `${nickname}, ${sex}`;
    },
    getImage() {
      const { img, kind } = this.$store.state.animals.current.general;
      const placeholder = kind === 'собака' ? 'dog.png' : 'cat.png';
      return img || placeholder;
    },
    getAge() {
      const { age } = this.$store.state.animals.current.general;
      let ageString = '';
      if (age === 1) {
        ageString = '1 год';
      } else if (age < 5) {
        ageString = `${age} года`;
      } else {
        ageString = `${age} лет`;
      }
      return ageString;
    },
    getGenderEnding() {
      const { sex } = this.$store.state.animals.current.general;
      return sex === 'женский' ? 'a' : '';
    },
    getVaccination() {
      const isVaccinated = this.$store.state.animals.current.vaccination;
      return isVaccinated ? `вакцинирован${this.getGenderEnding}` : `не вакцинирован${this.getGenderEnding}`;
    },
    getInfo() {
      const { socialized } = this.$store.state.animals.current.additional;
      return `${this.getAge}, ${socialized}, ${this.getVaccination}`;
    },
  },
  async middleware({ store, route }) {
    await store.dispatch('animals/FETCH_PAGE_BY_ID', route.params.id);
  },
};
</script>

<style lang="scss" scoped>
  .animal-details {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding-top: 65px;
    padding-bottom: 151px;
    background: #e5e5e5;

    &__header {
      display: flex;
      width: 100%;
    }

    &__title {
      margin-top: 41px;
      font-size: 42px;
      font-weight: 600;
      color: #000;
    }

    &__image {
      height: 450px;
      background: #6f6f6f;
    }

    &__fields {
      display: flex;
      flex-direction: column;
      height: 450px;
      padding-bottom: 0;
    }

    &__field {
      display: flex;
      margin-top: 18px;

      &:first-child {
        margin-top: 30px;
      }
    }

    &__type {
      margin-right: 8px;
      font-weight: 600;
    }

    &__button {
      width: 230px;
      margin-top: auto;
      padding: 14px 50px;
      border-radius: 8px;
      background: #3CA6CD;
      color: white;
      font-size: 16px;
      font-weight: 600;
      text-transform: uppercase;
      text-decoration: none;
    }
  }
</style>
