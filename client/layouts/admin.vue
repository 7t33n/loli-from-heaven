<template>
  <v-app>
    <v-navigation-drawer permanent app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Личный кабинет
          </v-list-item-title>
          <v-list-item-subtitle>
            username
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            user position
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider />
      <v-list
        dense
        nav
      >
        <v-list-item nuxt to="/admin/">
          <v-list-item-content>
            <v-list-item-title>Главная</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-for="item in navigationMenu"
          :key="item.id"
          nuxt
          :to="`/admin/${item.id}`"
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-btn class="ml-auto" @click="logOut">
        Выйти
      </v-btn>
    </v-app-bar>
    <v-container fluid>
      <v-main>
        <h1>
          {{ pageHeader }}
        </h1>
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

    pageHeader() {
      const page = this.$store.state.admin.current;
      return page ? page.name : 'Default Name';
    },
  },

  methods: {
    logOut() {
    },
  },
};
</script>

<style scoped>

</style>
