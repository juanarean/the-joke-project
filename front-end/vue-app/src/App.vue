<template>
  <div>
    <div class="search">
      <label for="query">Search</label>
      <InputText type="text" v-model="query"></InputText>
      <Message size="smal" variant="simple">Enter to filter by words</Message>
    </div>
    <DataTable v-model:expandedRows="expandedRows" :value="jokes" dataKey="id" @sort="customSort"
      tableStyle="min-width: 50rem; width:100%">
      <Column expander style="width: 5rem;"></Column>
      <Column field="id" header="Id" sortable style="width: 20%"></Column>
      <Column field="type" header="Type" sortable style="width: 20%"></Column>
      <Column field="setup" header="Setup" sortable style="width: 50%"></Column>
      <template #expansion="slotProps">
        <h3>{{ slotProps.data.punchline }}</h3>
      </template>
    </DataTable>
    <Paginator :rows="pageSize" :totalRecords="totalJokes" :rowsPerPageOptions="[10, 20, 30]" @page="pageChange">
    </Paginator>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { getJokes } from './services/service.ts'

onMounted(() => {
  getJokes(0, 10, '', 'id:asc')
    .then((data) => {
      jokes.value = data.data.jokes
      totalJokes.value = data.data.total
    });
});

const loadJokes = () => {
  getJokes(page.value, pageSize.value, query.value, sorting.value)
    .then((data) => {
      jokes.value = data.data.jokes
      totalJokes.value = data.data.total
    });
}

const customSort = (event) => {
  sorting.value = event.sortOrder > 0 ? `${event.sortField}:asc` : `${event.sortField}:desc`;
  loadJokes();
}

const pageChange = (event) => {
  page.value = event.page;
  loadJokes();
}

const jokes = ref();
const totalJokes = ref();
const expandedRows = ref();
const sorting = ref('id:asc')
const page = ref(0)
const pageSize = ref(10)
const query = ref('')

watch(query, (_, newQuery) => {
  setTimeout(() => {
    loadJokes();
  }, 500);
});

</script>
