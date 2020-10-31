<template>
  <div class="main">
    <app-picture class="main__background" src="bg.png" />
    <div class="main__content">
      <h1 class="main__title">
        Возьми друга <br> из приюта!
      </h1>
      <p class="main__description">
        Каждый ждёт, когда найдется его человек. <br>
        Вы можете выбрать себе друга и забрать к себе <br>
        домой, оставив заявку.
      </p>
      <a class="main__button" href="/AnimalList">Выбрать друга</a>
    </div>
  </div>
</template>

<script>
import AppPicture from '@/components/general/AppPicture';

export default {
  components: { AppPicture },
  computed: {
    /**
     * Подключение SEO с помощью тега функция head прдоставляемой Nuxt
     * @returns {{meta, title: *}}
     */
    head() {
      return this.$setMeta(this.$store, this.seoObject);
    },
  },
};
</script>

<style lang="scss" scoped>
  .main {
    position: relative;
    width: 100%;
    height: 100%;

    &__background {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: transparent;
    }

    &__content {
      position: absolute;
      padding: 90px 64px;
    }

    &__title {
      font-family: "Montserrat-Bold", sans-serif;
      font-size: 72px;
    }

    &__description {
      margin-top: 45px;
      margin-bottom: 48px;
      font-size: 22px;
      color: #212121;
    }

    &__button {
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
