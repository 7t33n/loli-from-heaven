<template>
  <div class="animal-card">
    <app-picture :src="image" class="animal-card__image" />
    <div class="animal-card__info">
      <p class="animal-card__name">
        {{ getName }}
      </p>
      <p class="animal-card__age">
        {{ getAge }}
      </p>
      <p class="animal-card__address">
        {{ address }}
      </p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .animal-card {
    display: flex;
    flex-direction: column;
    border-radius: 16px;
    background: white;
    overflow: hidden;
    box-shadow: 2px 3px 29px 0px rgba(0, 0, 0, .75);

    &__image {
      width: 100%;
      height: 150px;
    }

    &__info {
      display: flex;
      flex-direction: column;
      padding: 18px 25px;
    }

    &__name {
      color: black;
      font-size: 18px;
    }

    &__age {
      color: black;
      margin-top: 6px;
      font-size: 18px;
    }

    &__address {
      margin-top: 16px;
      font-size: 14px;
    }
  }
</style>
<script>
import AppPicture from '~/components/general/AppPicture.vue';

export default {
  name: 'AnimalCard',
  components: { AppPicture },
  props: {
    name: {
      type: String,
      default: 'none',
    },
    gender: {
      type: String,
      default: 'мужской',
    },
    age: {
      type: Number,
      default: 0,
    },
    address: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
  },
  computed: {
    getAge() {
      const { age } = this;
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
    getName() {
      const { name, gender } = this;
      const placeholder = gender === 'мужской' ? 'Хороший мальчик' : 'Хорошая девочка';
      return name === 'none'
        ? placeholder
        : `${name}, ${gender}`;
    },
  },
};
</script>`
