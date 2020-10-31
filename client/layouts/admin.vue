<template>
  <div>
    <v-navigation-drawer>
      drawer
    </v-navigation-drawer>
    <v-app-bar>
      header
    </v-app-bar>
    <v-container fluid>
      <v-main>
        <nuxt />
      </v-main>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'admin-layout',
};
</script>

<style scoped>

</style>
