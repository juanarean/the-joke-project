<template>
  <div>
    <h1 class="title">Let's have some laughs!!!</h1>
    <p>
      Here is a list of jokes from the
      <a href="https://github.com/15Dkatz/official_joke_api/">Joke API</a>
      <br />
      You can search by some keyword, change the order or just turn pages.
    </p>
    <div class="search">
      <label for="query">Search</label>
      <InputText type="text" v-model="query"></InputText>
      <Message size="small" variant="simple">Enter to filter by words</Message>
    </div>
    <template v-if="jokes.length">
      <DataTable v-model:expandedRows="expandedRows" :value="jokes" dataKey="id" @sort="customSort"
        tableStyle="min-width: 50rem; width:100%">
        <Column expander style="width: 5rem"></Column>
        <Column field="id" header="Id" sortable style="width: 20%"></Column>
        <Column field="type" header="Type" sortable style="width: 20%"></Column>
        <Column field="setup" header="Setup" sortable style="width: 50%"></Column>
        <template #expansion="slotProps">
          <div class="punchline">
            <h2>{{ slotProps.data.punchline }}</h2>
          </div>
        </template>
      </DataTable>
      <Paginator :rows="pageSize" :totalRecords="totalJokes" :rowsPerPageOptions="[10, 20, 30]" @page="pageChange">
      </Paginator>
    </template>
    <div class="empty-list" v-else>
      <h2>That's not funny...</h2>
      <p>Try another search!</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { getJokes } from './services/service.ts'

const DEBOUNCE_TIME = 500;

onMounted(() => {
  loadJokes()
})

const loadJokes = () => {
  getJokes(page.value, pageSize.value, query.value, sorting.value).then((data) => {
    jokes.value = data.data.jokes
    totalJokes.value = data.data.total
  })
}

const debounceLoad = useDebounceFn(() => loadJokes(), DEBOUNCE_TIME);

const customSort = (event) => {
  sorting.value = event.sortOrder > 0 ? `${event.sortField}:asc` : `${event.sortField}:desc`
  loadJokes()
}

const pageChange = (event) => {
  page.value = event.page
  pageSize.value = event.rows
  loadJokes()
}

const jokes = ref([])
const totalJokes = ref()
const expandedRows = ref()
const sorting = ref('id:asc')
const page = ref(0)
const pageSize = ref(10)
const query = ref('')

watch(query, () => {
  debounceLoad()
})

</script>
