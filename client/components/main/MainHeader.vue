<template>
  <div class="main-header">
    <app-picture class="main-header__background" src="bg.png" />
    <div class="main-header__content">
      <h1 class="main-header__title">
        Возьми друга <br> из приюта!
      </h1>
      <p class="main-header__description">
        Каждый ждёт, когда найдется его человек. <br>
        Вы можете выбрать себе друга и забрать к себе <br>
        домой, оставив заявку.
      </p>
    </div>
  </div>
</template>

<script>
import AppPicture from '~/components/general/AppPicture';

export default {
  name: 'MainHeader',
  components: { AppPicture },
};
</script>

<style lang="scss" scoped>
  .main-header {
    position: relative;
    padding-bottom: percentage(9 / 16);

    &__background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: transparent;
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
      font-size: 22px;
      color: #212121;
    }
  }
</style>
