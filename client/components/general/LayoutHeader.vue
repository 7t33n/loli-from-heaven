<template>
  <nav class="layout-header">
    <a class="layout-header__link" href="/AnimalList">Выбрать друга</a>
    <a class="layout-header__link" href="/AnimalList">Приюты</a>
    <a class="layout-header__link" href="/AnimalList">Сообщить о беспризорнике</a>
    <div class="layout-header__divider" />
    <a class="layout-header__link" href="/AnimalList">FAQ</a>
    <a class="layout-header__link" href="/AnimalList">О нас</a>
  </nav>
</template>

<script>
export default {
  name: 'LayoutHeader',
};
</script>

<style lang="scss" scoped>
  .layout-header {
    display: flex;
    color: #212121;
    padding: 36px 64px;
    background: white;
    font-size: 14px;

    &__link {
      color: #212121;
      margin-right: 35px;
      font-size: 14px;
      text-transform: uppercase;
      text-decoration: none;

      &:last-child {
        margin-right: 0;
      }
    }

    &__divider {
      flex-grow: 1;
      display: flex;
    }
  }
</style>
