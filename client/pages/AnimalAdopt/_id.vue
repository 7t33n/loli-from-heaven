<template>
  <div class="animal-adopt">
    <form action="" class="animal-adopt__form">
      <animal-back-button class="animal-adopt__back" />
      <img class="animal-adopt__kotik" src="/images/kotik.png">
      <img class="animal-adopt__pesik" src="/images/pesik.png">
      <div class="animal-adopt__title">
        Забрать друга к себе
      </div>
      <input
        placeholder="Имя" name="name"
        type="text" class="animal-adopt__input"
      >
      <input
        placeholder="Номер телефона" name="phone"
        type="text" class="animal-adopt__input"
      >
      <input
        placeholder="*E-mail" name="email"
        type="text" class="animal-adopt__input"
      >
      <textarea
        class="animal-adopt__textarea" name="comment"
        placeholder="Ваш комментарий"
      />
      <!--TODO: get address and schedule by id-->
      <button class="animal-adopt__button">
        отправить заявку
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
  .animal-adopt {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #F7F7F8;

    &__back {
      position: absolute;
      top: 31px;
      left: -110px;
    }

    &__form {
      position: relative;
      display: flex;
      flex-direction: column;
      padding: 35px 100px 40px;
      border-radius: 16px;
      box-shadow: 4px 4px 18px rgba(68, 68, 68, .16);
    }

    &__title {
      font-size: 22px;
      font-weight: 600;
      color: #212121;
    }

    &__kotik {
      position: absolute;
      top: 63px;
      left: -138px;
      transform: rotate(-14deg);
      width: 180px;
      height: 180px;
    }

    &__pesik {
      position: absolute;
      right: -207px;
      bottom: 2px;
      transform: rotate(12deg);
      width: 260px;
      height: 294px;
    }

    &__input {
      margin-top: 30px;
      padding: 10px 16px;
      border-radius: 16px;
      border: 1px solid #C9C9C9;

      &::placeholder {
        color: #6F6F6F;
        font-size: 14px;
      }
    }

    &__textarea {
      min-height: 128px;
      margin-top: 30px;
      padding: 10px 16px;
      border-radius: 16px;
      border: 1px solid #C9C9C9;

      &::placeholder {
        color: #6F6F6F;
        font-size: 14px;
      }
    }

    &__button {
      display: flex;
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
