<script setup lang="ts">
  import { ref } from 'vue'
  import { useRegister } from '@/composables/useRegister'

  const visible = ref(false)
  const name = ref('')
  const password = ref('')
  const password2 = ref('')

  const { isError, isLoading, doRegister } = useRegister ()

  async function handleRegister () {
    doRegister(
      name.value,
      password.value,
      password2.value,
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
      <div class="text-body-large font-weight-bold text-medium-emphasis text-center">S'inscrire</div>

      <div class="text-body-large text-medium-emphasis">Nom</div>

      <v-text-field
        v-model="name"
        density="compact"
        variant="outlined"
      />

      <div class="text-body-large text-medium-emphasis d-flex align-center justify-space-between">
        Mot de passe
      </div>

      <v-text-field
        v-model="password"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        density="compact"
        :type="visible ? 'text' : 'password'"
        variant="outlined"
        @click:append-inner="visible = !visible"
      />

      <div class="text-body-large text-medium-emphasis d-flex align-center justify-space-between">
        Confirmer le mot de passe
      </div>

      <v-text-field
        v-model="password2"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        density="compact"
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
        @click="handleRegister()"
      >
        S'inscrire
      </v-btn>

      <v-alert v-if="isError" class="mb-4" type="error" variant="tonal">
        Identifiants incorrects
      </v-alert>

    </v-card>
  </div>
</template>
