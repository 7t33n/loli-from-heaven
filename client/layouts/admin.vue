<template>
  <v-app>
    <v-navigation-drawer permanent app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Личный кабинет
          </v-list-item-title>
          <v-list-item-subtitle>
            subtext
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider />
      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in navigationMenu"
          :key="item.id"
          nuxt
          :to="item.url"
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app>
      header
    </v-app-bar>
    <v-container fluid>
      <v-main>
        <nuxt />
      </v-main>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'AdminLayout',

  computed: {
    navigationMenu() {
      return this.$store.state.admin.pages;
    },
  },
};
</script>

<style scoped>

</style>
