<script setup lang="ts">

</script>
<template>
  <v-layout class="rounded rounded-md border">
    <v-app-bar title="Mes tâches à faire"></v-app-bar>

    <v-main class="d-flex align-center justify-center" height="300">
      <v-container>
				<v-text-field label="Nouvelle tâche..." />
				<v-list>
					<v-list-item title="Tâche 1" />
					<v-list-item title="Tâche 2" />
      	</v-list>
      </v-container>
    </v-main>
  </v-layout>
</template>