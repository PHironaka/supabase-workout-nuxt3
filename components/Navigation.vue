<script setup>
const { auth } = useSupabaseAuthClient()
const user = useSupabaseUser()
const router = useRouter()
async function userLogout() {
  await auth.signOut()
  return navigateTo('/')
}
</script>

<template>
  <header class="text-white bg-at-light-green">
    <nav class="container flex flex-col items-center gap-4 px-4 py-5 sm:flex-row">
      <div class="flex items-center gap-x-4">
        <h1 class="text-lg">
          Active Tracker
        </h1>
      </div>
      <ul class="flex justify-end flex-1 gap-x-10">
        <nuxt-link class="cursor-pointer" to="/">
          Home
        </nuxt-link>
        <nuxt-link v-if="user" class="cursor-pointer" to="/create">
          Create
        </nuxt-link>
        <nuxt-link v-if="!user" class="cursor-pointer" to="/login">
          Login
        </nuxt-link>
        <li v-if="user" class="cursor-pointer" @click="userLogout">
          Logout
        </li>
      </ul>
    </nav>
  </header>
</template>
