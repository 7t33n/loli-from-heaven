<template>
  <div class="animal-back" @click="back">
    <app-icon
      name="back" width="24"
      height="24"
      class="animal-back__icon"
    />
    <div class="animal-back__text">
      Назад
    </div>
  </div>
</template>

<script>
import AppIcon from '@/components/general/AppIcon';

export default {
  name: 'AnimalBackButton',
  components: { AppIcon },
  methods: {
    back() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
  .animal-back {
    display: flex;
    align-items: center;
    cursor: pointer;

    &__icon {
      display: flex;
    }

    &__text {
      margin-left: 12px;
      font-size: 18px;
      color: #666666;
    }
  }
</style>
