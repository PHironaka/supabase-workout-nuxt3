<script setup>
// Create data / vars
const data = ref([])
const dataLoaded = ref(null)
const client = useSupabaseClient()

// Get data
async function getData() {
  try {
    const { data: workouts, error } = await client.from('workouts').select('*')
    if (error)
      throw error
    data.value = workouts
    dataLoaded.value = true
  }
  catch (error) {
    console.warn(error.message)
  }
}
// Run data function
getData()
</script>

<template>
  <div v-if="dataLoaded" class="container px-4 mt-10">
    <!-- No Data -->
    <div v-if="data.length === 0" class="flex flex-col items-center w-full">
      <h1 class="text-2xl">
        Looks empty here...
      </h1>
      <nuxt-link
        class="px-6 py-2 mt-6 text-sm text-white duration-200 border-2 border-transparent border-solid rounded-sm bg-at-light-green hover:border-at-light-green hover:bg-white hover:text-at-light-green"
        to="/create"
      >
        Create Workout
      </nuxt-link>
    </div>

    <!-- Data -->
    <div
      v-else
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <nuxt-link
        v-for="(workout, index) in data"
        :key="index"
        :to="`/workouts/${workout.id}`"
        class="flex flex-col items-center p-8 shadow-md cursor-pointer bg-light-grey"
      >
        <p
          class="px-3 py-1 mt-6 text-xs text-white rounded-lg shadow-md bg-at-light-green"
        >
          {{ workout.workoutType }}
        </p>

        <h1 class="mt-8 mb-2 text-xl text-center text-at-light-green">
          {{ workout.workoutName }}
        </h1>
      </nuxt-link>
    </div>
  </div>
</template>
