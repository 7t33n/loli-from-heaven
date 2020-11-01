<template>
  <div class="animal-card">
    <app-picture :src="getImage" class="animal-card__image" />
    <div class="animal-card__info">
      <div class="animal-card__name">
        {{ getName }}
      </div>
      <div class="animal-card__age">
        {{ getAge }}
      </div>
      <div class="animal-card__address">
        {{ address }}
      </div>
    </div>
    <nuxt-link class="animal-card__button" :to="`AnimalDetails/${id}`">
      Подробнее
    </nuxt-link>
  </div>
</template>
<style lang="scss" scoped>
  .animal-card {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 430px;
    border-radius: 16px;
    background: white;
    overflow: hidden;
    box-shadow: 2px 7px 12px -2px rgba(0, 0, 0, .2);

    &__image {
      width: 100%;
      height: 240px;
      object-fit: contain;
      background: none;
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

    &__button {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      padding: 14px 50px;
      background: #3CA6CD;
      color: white;
      font-size: 16px;
      font-weight: 600;
      text-align: center;
      text-transform: uppercase;
      text-decoration: none;
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
      default: 'none',
    },
    type: {
      type: String,
      default: 'собака',
    },
    id: {
      type: [Number, String],
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
      return name === 'без клички'
        ? placeholder
        : `${name}, ${gender}`;
    },
    getImage() {
      const { image, type } = this;
      const placeholder = type === 'собака' ? 'dog.png' : 'cat.png';
      return image === 'none' ? placeholder : image;
    },
  },
};
</script>`
