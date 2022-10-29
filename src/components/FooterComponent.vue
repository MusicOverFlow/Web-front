<template>
  <footer class="p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
    <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© {{ date }} MusicOverflow™. Tout droits réservés.
    </span>
    <ul class="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
      <li>
        <a class="mr-4 hover:underline md:mr-6 " href="#">À propos</a>
      </li>
      <li>
        <a class="mr-4 hover:underline md:mr-6" href="#">License</a>
      </li>
      <li>
        <a class="hover:underline" href="#">Contact</a>
      </li>
    </ul>
  </footer>
</template>
<script>
export default {
  name: 'FooterComponent',
  data() {
    return {
      date: new Date().getFullYear()
    }
  }
}
</script>
