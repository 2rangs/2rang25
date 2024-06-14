<template>
  <header class="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center p-2">
    <div id="header_logo" class="text-center lg:text-left mb-4 lg:mb-0">
      <NuxtLink id="home_link" to="/">
        <span class="logo-text">
          <span class="text-primary">2</span>
          <span>Rang</span>
          <span class="text-primary">25</span>
        </span>
      </NuxtLink>
    </div>
    <nav class="flex flex-col lg:flex-row items-center w-full lg:w-auto">
      <div class="flex flex-wrap justify-center space-x-4 lg:space-x-6">
        <UHorizontalNavigation :links="links">
          <template #default="{ link }">
            <span class="group-hover:text-primary relative">{{ link.label }}</span>
          </template>
        </UHorizontalNavigation>
      </div>
     <div class="mt-4 lg:mt-0 ml-4 lg:ml-6 flex">
       <UButton
           :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
           color="gray"
           variant="ghost"
           aria-label="Theme"
           @click="isDark = !isDark"
       />
       <UPopover mode="hover">
          <UButton icon="i-heroicons-swatch-20-solid"
          color="gray"
           variant="ghost"
           aria-label="Theme"
          />

          <template #panel>
            <div class="grid grid-cols-5 gap-4 mb-4 p-3">
              <div
                v-for="color in colors"
                :key="color.value"
                @click="updateTheme(color.value)"
                class="w-3 h-3 rounded-full cursor-pointer"
                :class="`bg-${color.value}-500`"
              ></div>
            </div>
          </template>
      </UPopover>
     </div>
    </nav>
  </header>
</template>

<script setup lang="ts">

const colorMode = useColorMode()
const appConfig = useAppConfig()

const links = [{
  label: 'Projects',
  to: '/projects'
}, {
  label: 'Blogs',
  to: '/blogs'
}, {
  label: 'Gallary',
  to: '/gallary'
}]
const colors = [
  { label: 'Red', value: 'red' },
  { label: 'Orange', value: 'orange' },
  { label: 'Amber', value: 'amber' },
  { label: 'Yellow', value: 'yellow' },
  { label: 'Lime', value: 'lime' },
  { label: 'Green', value: 'green' },
  { label: 'Emerald', value: 'emerald' },
  { label: 'Teal', value: 'teal' },
  { label: 'Cyan', value: 'cyan' },
  { label: 'Sky', value: 'sky' },
  { label: 'Blue', value: 'blue' },
  { label: 'Indigo', value: 'indigo' },
  { label: 'Violet', value: 'violet' },
  { label: 'Purple', value: 'purple' },
  { label: 'Fuchsia', value: 'fuchsia' },
  { label: 'Pink', value: 'pink' },
  { label: 'Rose', value: 'rose' }
]
const isDark = computed({
  get () {
    return colorMode.value === 'light'
  },
  set () {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})
const updateTheme = (color) => {
 appConfig.ui.primary = color
}

onMounted(() => {
  appConfig.ui.gray = 'neutral'
})

</script>

<style scoped lang="scss">
header {
  font-family: 'NanumSquareNeo-extrabold';
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  #header_logo {
    font-size: 1.5rem;
    // color: var(--text-color);
  }

  .page_link {
    @apply block mt-4 lg:mt-0 mx-2 lg:mx-0;
    color: var(--text-color);
  }
}

:root {
  --text-color: black;
  --primary-color: #3490dc; // Replace with your primary color
}

</style>
