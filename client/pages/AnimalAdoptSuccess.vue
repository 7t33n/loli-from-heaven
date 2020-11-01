<template>
  <div class="animal-adopt-success">
    <form action="" class="animal-adopt-success__form">
      <animal-back-button class="animal-adopt-success__back" />
      <img class="animal-adopt-success__kotik" src="/images/kotik.png">
      <img class="animal-adopt-success__pesik" src="/images/pesik.png">
      <div class="animal-adopt-success__text">
        Спасибо! Ваша заявка принята, мы отправили вам на почту подробную инструкцию как забрать друга!
      </div>
      <button class="animal-adopt-success__button">
        Готово
      </button>
    </form>
  </div>
</template>
<script>
import AnimalBackButton from '@/components/general/AnimalBackButton';

export default {
  components: { AnimalBackButton },
};
</script>

<style lang="scss" scoped>
  .animal-adopt-success {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #F7F7F8;

    &__form {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 560px;
      height: 385px;
      padding: 35px 100px 40px;
      border-radius: 16px;
      box-shadow: 4px 4px 18px rgba(68, 68, 68, .16);
    }

    &__back {
      position: absolute;
      top: 31px;
      left: -110px;
    }

    &__text {
      width: 100%;
      font-size: 18px;
      text-align: center;
    }

    &__kotik {
      position: absolute;
      right: 4px;
      bottom: -42px;
      transform: rotate(74deg);
      width: 180px;
      height: 180px;
    }

    &__pesik {
      position: absolute;
      bottom: -70px;
      left: -23px;
      transform: rotate(-79deg);
      width: 260px;
      height: 294px;
    }

    &__button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 241px;
      margin-top: 30px;
      padding: 14px 50px;
      border-radius: 8px;
      background: #3CA6CD;
      color: white;
      text-align: center;
      font-size: 16px;
      font-weight: 600;
      text-transform: uppercase;
      text-decoration: none;
    }
  }
</style>
