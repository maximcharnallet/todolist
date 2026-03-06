<script setup lang="ts">
  import { ref } from 'vue'
  import { useSignin } from '@/composables/useSignin'

  const name = ref('')
  const password = ref('')
  const visible = ref(false)

  const { isError, isLoading, doSignin } = useSignin()

  async function handleSignin () {
    doSignin(
      name.value,
      password.value,
    )
  }
</script>

<template>
  <div>
    <v-card
      class="mx-auto mt-12 pa-12 pb-8"
      elevation="3"
      max-width="448"
      rounded="lg"
    >
      <div class="text-body-large font-weight-bold text-medium-emphasis text-center">Se connecter</div>

      <div class="text-body-large text-medium-emphasis">Nom</div>

      <v-text-field
        v-model="name"
        density="compact"
        required
        variant="outlined"
      />

      <div class="text-body-large text-medium-emphasis d-flex align-center justify-space-between">
        Mot de passe
      </div>

      <v-text-field
        v-model="password"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        density="compact"
        required
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
        @click="handleSignin()"
      >
        Connexion
      </v-btn>

      <v-alert v-if="isError" class="mb-4" type="error" variant="tonal">
        Identifiants incorrects
      </v-alert>

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
