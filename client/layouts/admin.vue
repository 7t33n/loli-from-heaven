<template>
  <v-app>
    <v-navigation-drawer permanent app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Личный кабинет
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ userName }}
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            {{ userPosition }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider />
      <v-list
        dense
        nav
      >
        <v-list-item nuxt to="/admin">
          <v-list-item-content>
            <v-list-item-title>Главная</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <template v-for="(item, index) in navigationMenu">
          <v-list-item
            v-if="item.type === 'MAIN'"
            :key="index"
            nuxt
            :to="`/admin/${index}`"
          >
            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
        <v-list-group
          :value="true"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-title>
              Справочник
            </v-list-item-title>
          </template>
          <template v-for="(item, index) in navigationMenu">
            <v-list-item
              v-if="item.type === 'DIRECTORY'"
              :key="index"
              nuxt-link
              :to="`/admin/${index}`"
            >
              <v-list-item-content :title="item.name">
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-switch
        :label="themeSwitcherLabel"
        class="align-self-auto"
        @click="changeColorTheme"
      />
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

    userName() {
      return 'Пупкин И.В.';
    },

    userPosition() {
      return 'Представитель департамента';
    },

    themeSwitcherLabel() {
      return this.$vuetify.theme.dark ? 'включить свет' : 'выключить свет';
    },
  },

  methods: {
    logOut() {
      this.$router.push('/');
    },

    changeColorTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
};
</script>
