<template>
  <div class="card">
    <TreeTable :value="nodes" tableStyle="min-width: 50rem">
      <Column field="name" header="Name" expander style="width: 34%"></Column>
      <Column field="size" header="Size" style="width: 33%"></Column>
      <Column field="type" header="Type" style="width: 33%"></Column>
    </TreeTable>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { NodeService } from '@/services/service';

onMounted(() => {
  NodeService.getTreeTableNodes().then((data) => (nodes.value = data));
});

const nodes = ref();
</script>
