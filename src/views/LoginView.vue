<template>
  <main>
    <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
      <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400" id="tabExample" role="tablist">
        <li class="mr-2" role="presentation">
          <button class="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="profile-tab-example" type="button" role="tab" aria-controls="profile-example" aria-selected="false">Profile</button>
        </li>
        <li class="mr-2" role="presentation">
          <button class="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="dashboard-tab-example" type="button" role="tab" aria-controls="dashboard-example" aria-selected="false">Dashboard</button>
        </li>
        <li class="mr-2" role="presentation">
          <button class="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="settings-tab-example" type="button" role="tab" aria-controls="settings-example" aria-selected="false">Settings</button>
        </li>
        <li role="presentation">
          <button class="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="contacts-tab-example" type="button" role="tab" aria-controls="contacts-example" aria-selected="false">Contacts</button>
        </li>
      </ul>
    </div>
    <div id="tabContentExample">
      <div class="hidden p-4 bg-gray-50 rounded-lg dark:bg-gray-800" id="profile-example" role="tabpanel" aria-labelledby="profile-tab-example">
        <p class="text-sm text-gray-500 dark:text-gray-400"><RegisterComponent/></p>
      </div>
      <div class="hidden p-4 bg-gray-50 rounded-lg dark:bg-gray-800" id="dashboard-example" role="tabpanel" aria-labelledby="dashboard-tab-example">
        <p class="text-sm text-gray-500 dark:text-gray-400"><LoginComponent/></p>
      </div>
      <div class="hidden p-4 bg-gray-50 rounded-lg dark:bg-gray-800" id="settings-example" role="tabpanel" aria-labelledby="settings-tab-example">
        <p class="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong class="font-medium text-gray-800 dark:text-white">Settings tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
      </div>
      <div class="hidden p-4 bg-gray-50 rounded-lg dark:bg-gray-800" id="contacts-example" role="tabpanel" aria-labelledby="contacts-tab-example">
        <p class="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong class="font-medium text-gray-800 dark:text-white">Contacts tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
      </div>
    </div>

  </main>
</template>

<script>
import RegisterComponent from "@/components/RegisterComponent";
import LoginComponent from "@/components/LoginComponent";
import Tabs from 'flowbite';

export default {
  name: 'LoginView',
  components: {
    RegisterComponent,
    LoginComponent
  }
}
// create an array of objects with the id, trigger element (eg. button), and the content element
const tabElements = [
  {
    id: 'profile',
    triggerEl: document.querySelector('#profile-tab-example'),
    targetEl: document.querySelector('#profile-example')
  },
  {
    id: 'dashboard',
    triggerEl: document.querySelector('#dashboard-tab-example'),
    targetEl: document.querySelector('#dashboard-example')
  },
  {
    id: 'settings',
    triggerEl: document.querySelector('#settings-tab-example'),
    targetEl: document.querySelector('#settings-example')
  },
  {
    id: 'contacts',
    triggerEl: document.querySelector('#contacts-tab-example'),
    targetEl: document.querySelector('#contacts-example')
  }
];

// options with default values
const options = {
  defaultTabId: 'settings',
  activeClasses: 'text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-400 border-blue-600 dark:border-blue-500',
  inactiveClasses: 'text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300',
  onShow: () => {
    console.log('tab is shown');
  }
};

const tabs = new Tabs(tabElements, options);

// shows another tab element
tabs.show('dashboard');

// get the tab object based on ID
tabs.getTab('contacts')

// get the current active tab object
tabs.getActiveTab()

</script>

<style scoped>

</style>