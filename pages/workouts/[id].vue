<script setup>
const data = ref(null)
const dataLoaded = ref(null)
const errorMsg = ref(null)
const statusMsg = ref(null)
const route = useRoute()
const supa = useSupabaseClient()
const user = useSupabaseUser()

// Get current Id of route
const currentId = route.params.id

// Get workout data
async function getData() {
  try {
    const { data: workouts, error } = await supa.from('workouts').select('*').eq('id', currentId)
    if (error)
      throw error
    data.value = workouts[0]
    dataLoaded.value = true
  }
  catch (error) {
    console.warn(error.message)
    errorMsg.value = error.message
    setTimeout(() => {
      errorMsg.value = false
    }, 5000)
  }
}

getData()
</script>

<template>
  <div class="max-w-screen-sm px-4 py-10 mx-auto">
    <div v-if="statusMsg || errorMsg">
      <p class="text-at-light-green">
        {{ statusMsg }}
      </p>
      <p class="text-red-500">
        {{ errorMsg }}
      </p>
    </div>
    <div v-if="dataLoaded">
      <div class="relative flex flex-col items-center p-8 rounded-md shadow-md bg-light-grey">
        <div v-if="user" class="absolute flex left-2 top-2 gap-x-2">
          <img v-if="data.photo" :src="`https://cascqlyvfbdhgohjnwew.supabase.co/storage/v1/object/public/avatars/${data.photo}`">
          <p> {{ data.workoutName }} </p>
          <p> {{ data.workoutType }} </p>
          <p>{{ user.email }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
