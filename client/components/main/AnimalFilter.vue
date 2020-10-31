<template>
  <v-form class="animal-filter">
    <p class="animal-filter__title">
      Вид
    </p>
    <v-radio-group v-model="radioType" class="animal-filter__radios">
      <v-radio
        v-for="(item, n) in filterType"
        :key="n"
        :value="item.value"
      >
        <template v-slot:label>
          <p class="animal-filter__label">
            {{ item.name }}
          </p>
        </template>
      </v-radio>
    </v-radio-group>
    <p class="animal-filter__title">
      Пол
    </p>
    <v-radio-group v-model="radioGender" class="animal-filter__radios">
      <v-radio
        v-for="(item, n) in filterGender"
        :key="n"
        :value="item.value"
      >
        <template v-slot:label>
          <p class="animal-filter__label">
            {{ item.name }}
          </p>
        </template>
      </v-radio>
    </v-radio-group>
    <p class="animal-filter__title">
      Размер
    </p>
    <v-radio-group v-model="radioSize" class="animal-filter__radios">
      <v-radio
        v-for="(item, n) in filterSize"
        :key="n"
        :value="item.value"
      >
        <template v-slot:label>
          <p class="animal-filter__label">
            {{ item.name }}
          </p>
        </template>
      </v-radio>
    </v-radio-group>
    <p class="animal-filter__title">
      Возраст
    </p>
    <div class="animal-filter__range">
      <input
        placeholder="От 3 мес." type="text"
        class="animal-filter__input"
      >
      <input
        placeholder="До 16 лет" type="text"
        class="animal-filter__input"
      >
    </div>
    <p class="animal-filter__title">
      Адрес приюта
    </p>
    <v-select
      :items="shelters"
      label="Выберите адрес"
      dense
      solo
    />
  </v-form>
</template>

<script>
export default {
  name: 'AnimalFilter',
  data() {
    return {
      radioGender: [],
      radioType: [],
      radioSize: [],
      filterGender: [
        {
          name: 'Девочка',
          value: 'female',
        },
        {
          name: 'Мальчик',
          value: 'male',
        },
      ],
      filterType: [
        {
          name: 'Собака',
          value: 'dog',
        },
        {
          name: 'Кошка',
          value: 'cat',
        },
      ],
      filterSize: [
        {
          name: 'Маленький',
          value: 'small',
        },
        {
          name: 'Средний',
          value: 'medium',
        },
        {
          name: 'Большой',
          value: 'big',
        },
      ],
      shelters: [
        'Москва, Зеленоград, Фирсановское ш., вл.5А',
        'Москва, Зеленоград, Фирсановское ш., вл.6А',
        'Москва, Зеленоград, Фирсановское ш., вл.7А',
        'Москва, Зеленоград, Фирсановское ш., вл.8А',
        'Москва, Зеленоград, Фирсановское ш., вл.9А',
        'Москва, Зеленоград, Фирсановское ш., вл.10А',
        'Москва, Зеленоград, Фирсановское ш., вл.11А',
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
  .animal-filter {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    padding: 50px 35px;
    border-radius: 16px;
    box-shadow: 2px 7px 12px -2px rgba(0, 0, 0, .2);

    &__title {
      font-size: 18px;
      font-weight: 600;
    }

    &__label {
      margin-bottom: 0;
      margin-left: 10px;
      font-size: 14px;
    }

    &__radios {
      margin-bottom: 20px;
    }

    &__range {
      display: flex;
      justify-content: space-between;
      margin-bottom: 40px;
    }

    &__input {
      flex-shrink: 1;
      display: flex;
      width: 48%;
      padding: 10px 16px;
      border-radius: 4px;
      box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, .2),
        0px 2px 2px 0px rgba(0, 0, 0, .14),
        0px 1px 5px 0px rgba(0, 0, 0, .12);
      font-size: 14px;
      color: #6f6f6f;
    }
  }
</style>
