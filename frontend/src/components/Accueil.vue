<script setup lang="ts">
  import { jwtDecode } from 'jwt-decode'
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useLogout } from '@/composables/useLogout'

  const { t } = useI18n()

  const userName = ref('')
  const token = localStorage.getItem('user_token')
  if (token) {
    const decoded: any = jwtDecode(token)
    userName.value = decoded.name
  }

  const { isError, isLoading, doLogout } = useLogout()

  function handleLogout () {
    doLogout()
  }

</script>
<template>
  <v-app>
    <div class="locale-changer">
      <select v-model="$i18n.locale">
        <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">{{ locale }}</option>
      </select>
    </div>
    <v-layout class="rounded rounded-md border">
      <v-app-bar :title="`${ t('hello') } ${userName}`">
        <template #append>
          <v-btn color="primary" variant="text" @click="handleLogout()">
            {{ t('logout') }}
          </v-btn>
        </template>
      </v-app-bar>
      <v-navigation-drawer permanent>
        <v-list nav>
          <v-list-item link :title="t('task')" to="/accueil/task" />
          <v-list-item link :title="t('logbook')" to="/accueil/logbook" />
          <v-list-item link :title="t('locker')" to="/accueil/locker" />
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <router-view />
      </v-main>
    </v-layout>
  </v-app>
</template>
