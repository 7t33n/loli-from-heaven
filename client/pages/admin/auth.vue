<template>
  <v-container align="center">
    <v-switch
      :label="themeSwitcherLabel"
      class="align-self-auto"
      @click="changeColorTheme"
    />
    <h2>
      Вход в личный кабинет
    </h2>
    <br>
    <v-text-field
      v-model="emailValue"
      autofocus
      label="Электронная почта"
      placeholder="example@example.ru"
      outlined
    />
    <v-text-field
      v-model="passwordValue"
      label="пароль"
      placeholder="введите пароль"
      type="password"
      outlined
    />
    <v-btn
      v-if="true"
      block
      @click="handleSubmit"
    >
      войти
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: 'Auth',

  layout: 'adminAuth',

  data() {
    return {
      emailValue: '',
      passwordValue: '',
    };
  },

  computed: {
    themeSwitcherLabel() {
      return this.$vuetify.theme.dark ? 'включить свет' : 'выключить свет';
    },
  },

  methods: {
    handleSubmit() {
      this.$router.push('/admin');
    },

    changeColorTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
};
</script>
