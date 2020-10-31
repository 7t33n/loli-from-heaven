<template>
  <div class="page">
    <v-app>
      <layout-header />
      <nuxt />
    </v-app>
  </div>
</template>
<style lang="scss" scoped>
.page {
  height: 100%;
}
</style>
<script>
import LayoutHeader from '@/components/general/LayoutHeader';

export default {
  components: { LayoutHeader },
};
</script>
