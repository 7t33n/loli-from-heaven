<template>
  <v-form>
    <h2>
      Edit or add item
    </h2>
    <br>
    <v-text-field
      v-if="true"
      label="Outlined"
      placeholder="Placeholder"
      outlined
    />
    <v-autocomplete
      v-if="false"
      label="Outlined"
      placeholder="Placeholder"
      outlined
    />
    <v-btn
      v-if="true"
      block
      @click="handleSubmit"
    >
      сохранить
    </v-btn>
  </v-form>
</template>

<script>
export default {
  name: 'EditPage',

  layout: 'admin',

  methods: {
    handleSubmit() {
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
