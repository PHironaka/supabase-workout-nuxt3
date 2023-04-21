<script setup>
const workoutName = ref('')
const workoutType = ref('select-workout')
const exercises = ref([])
const avatar_path = ref('')
const statusMsg = ref(null)
const errorMsg = ref(null)
const router = useRouter()
const supa = useSupabaseClient()

// Add exercise
function addExercise() {
  if (workoutType.value === 'strength') {
    exercises.value.push({
      exercise: '',
      sets: '',
      reps: '',
      weight: '',
    })
    return
  }
  exercises.value.push({
    cardioType: '',
    distance: '',
    duration: '',
    pace: '',
  })
}
// Delete exercise
function deleteExercise(id) {
  if (exercises.value.length > 1) {
    exercises.value = exercises.value.filter(exercise => exercise.id !== id)
    return
  }
  errorMsg.value = 'Error: Cannot remove, need to at least have one exercise'
  setTimeout(() => {
    errorMsg.value = false
  }, 5000)
}
// Listens for chaging of workout type input
function workoutChange() {
  exercises.value = []
  addExercise()
}
// Create workout
async function createWorkout() {
  try {
    const { error } = await supa.from('workouts').insert([
      {
        workoutName: workoutName.value,
        workoutType: workoutType.value,
        exercises: exercises.value,
        photo: avatar_path.value,
      },
    ])
    if (error)
      throw error
    statusMsg.value = 'Succes: Workout Created!'
    workoutName.value = null
    workoutType.value = 'select-workout'
    exercises.value = []
    router.push('/')
    setTimeout(() => {
      statusMsg.value = false
    }, 5000)
  }
  catch (error) {
    errorMsg.value = `Error: ${error.message}`
    setTimeout(() => {
      errorMsg.value = false
    }, 5000)
  }
}
</script>

<template>
  <div class="max-w-screen-md px-4 py-10 mx-auto">
    <!-- Status Message -->
    <div
      v-if="statusMsg || errorMsg"
      class="p-4 mb-10 rounded-md shadow-lg bg-light-grey"
    >
      <p class="text-at-light-green">
        {{ statusMsg }}
      </p>
      <p class="text-red-500">
        {{ errorMsg }}
      </p>
    </div>

    <!-- Create -->
    <div class="flex items-start p-8 rounded-md shadow-lg bg-light-grey">
      <!-- Form -->
      <form class="flex flex-col w-full gap-y-5" @submit.prevent="createWorkout">
        <h1 class="text-2xl text-at-light-green">
          Record Workout
        </h1>

        <Avatar v-model:path="avatar_path" @upload="updateProfile" />

        <!-- Workout Name -->
        <div class="flex flex-col">
          <label for="workout-name" class="mb-1 text-sm text-at-light-green">Workout Name</label>
          <input
            id="workout-name"
            v-model="workoutName"
            type="text"
            required
            class="p-2 text-gray-500 focus:outline-none"
          >
        </div>

        <!-- Workout Type -->
        <div class="flex flex-col">
          <label for="workout-type" class="mb-1 text-sm text-at-light-green">Workout Type</label>
          <select
            id="workout-type"
            v-model="workoutType"
            class="p-2 text-gray-500 focus:outline-none"
            required
            @change="workoutChange"
          >
            <option value="select-workout">
              Select Workout
            </option>
            <option value="strength">
              Strength Training
            </option>
            <option value="cardio">
              Cardio
            </option>
          </select>
        </div>

        <!-- Strength Training Inputs -->
        <div v-if="workoutType === 'strength'" class="flex flex-col gap-y-4">
          <div
            v-for="(item, index) in exercises"
            :key="index"
            class="relative flex flex-col gap-x-6 gap-y-2 md:flex-row"
          >
            <div class="flex flex-col md:w-1/3">
              <label for="exercise-name" class="mb-1 text-sm text-at-light-green">Exercise
              </label>
              <input
                v-model="item.exercise"
                required
                type="text"
                class="w-full p-2 text-gray-500 focus:outline-none"
              >
            </div>
            <div class="flex flex-col flex-1">
              <label for="sets" class="mb-1 text-sm text-at-light-green">Sets </label>
              <input
                v-model="item.sets"
                required
                type="text"
                class="w-full p-2 text-gray-500 focus:outline-none"
              >
            </div>
            <div class="flex flex-col flex-1">
              <label for="reps" class="mb-1 text-sm text-at-light-green">Reps </label>
              <input
                v-model="item.reps"
                required
                type="text"
                class="w-full p-2 text-gray-500 focus:outline-none"
              >
            </div>
            <div class="flex flex-col flex-1">
              <label for="weight" class="mb-1 text-sm text-at-light-green">Weight (LB's)
              </label>
              <input
                v-model="item.weight"
                required
                type="text"
                class="w-full p-2 text-gray-500 focus:outline-none"
              >
            </div>
            <img
              src="@/assets/images/trash-light-green.png"
              class="absolute w-auto h-4 cursor-pointer -left-5"
              alt=""
              @click="deleteExercise(item.id)"
            >
          </div>
          <button
            type="button"
            class="self-start px-6 py-2 mt-6 text-sm text-white duration-200 border-2 border-transparent border-solid rounded-sm bg-at-light-green hover:border-at-light-green hover:bg-white hover:text-at-light-green"
            @click="addExercise"
          >
            Add Exercise
          </button>
        </div>

        <!-- Cardio Inputs -->
        <div v-if="workoutType === 'cardio'" class="flex flex-col gap-y-4">
          <div
            v-for="(item, index) in exercises"
            :key="index"
            class="relative flex flex-col gap-x-6 gap-y-2 md:flex-row"
          >
            <div class="flex flex-col md:w-1/3">
              <label for="cardio-type" class="mb-1 text-sm text-at-light-green">Type
              </label>
              <select
                id="cardio-type"
                v-model="item.cardioType"
                class="w-full p-2 text-gray-500 focus:outline-none"
              >
                <option value="#">
                  Select Type
                </option>
                <option value="run">
                  Runs
                </option>
                <option value="walk">
                  Walk
                </option>
              </select>
            </div>
            <div class="flex flex-col flex-1">
              <label for="distance" class="mb-1 text-sm text-at-light-green">Distance
              </label>
              <input
                v-model="item.distance"
                required
                type="text"
                class="w-full p-2 text-gray-500 focus:outline-none"
              >
            </div>
            <div class="flex flex-col flex-1">
              <label for="duration" class="mb-1 text-sm text-at-light-green">Duration
              </label>
              <input
                v-model="item.duration"
                required
                type="text"
                class="w-full p-2 text-gray-500 focus:outline-none"
              >
            </div>
            <div class="flex flex-col flex-1">
              <label for="pace" class="mb-1 text-sm text-at-light-green">Pace </label>
              <input
                v-model="item.pace"
                required
                type="text"
                class="w-full p-2 text-gray-500 focus:outline-none"
              >
            </div>
            <img
              src="@/assets/images/trash-light-green.png"
              class="absolute w-auto h-4 cursor-pointer -left-5"
              alt=""
              @click="deleteExercise(item.id)"
            >
          </div>
          <button
            type="button"
            class="self-start px-6 py-2 mt-6 text-sm text-white duration-200 border-2 border-transparent border-solid rounded-sm bg-at-light-green hover:border-at-light-green hover:bg-white hover:text-at-light-green"
            @click="addExercise"
          >
            Add Exercise
          </button>
        </div>

        <button
          type="submit"
          class="self-start px-6 py-2 mt-6 text-sm text-white duration-200 border-2 border-transparent border-solid rounded-sm bg-at-light-green hover:border-at-light-green hover:bg-white hover:text-at-light-green"
        >
          Record Workout
        </button>
      </form>
    </div>
  </div>
</template>
