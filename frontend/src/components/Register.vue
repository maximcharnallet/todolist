<script setup lang="ts">
  import { ref } from 'vue'

  const visible = ref(false)
</script>

<template>
  <div>
    <v-card
      class="mx-auto mt-12 pa-12 pb-8"
      elevation="3"
      max-width="448"
      rounded="lg"
    >
      <div class="text-body-large font-weight-bold text-medium-emphasis text-center">S'inscrire</div>

      <div class="text-body-large text-medium-emphasis">Nom</div>

      <v-text-field
        density="compact"
        variant="outlined"
      />

      <div class="text-body-large text-medium-emphasis d-flex align-center justify-space-between">
        Mot de passe
      </div>

      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        density="compact"
        placeholder="Taper votre mot de passe"
        :type="visible ? 'text' : 'password'"
        variant="outlined"
        @click:append-inner="visible = !visible"
      />

      <v-btn
        block
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
      >
        Connexion
      </v-btn>

      <v-card-text class="text-center">
        <a
          class="text-blue text-decoration-none"
          href="/register"
          rel="noopener noreferrer"
          target="_blank"
        >
          S'enregister <v-icon icon="mdi-chevron-right" />
        </a>
      </v-card-text>
    </v-card>
  </div>
</template>
