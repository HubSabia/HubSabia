<template>
  <div class="campaigns-table-container">
    <h3 v-if="campaigns.length > 0">Lista de Campanhas</h3>
    <p v-else>Nenhuma campanha cadastrada ainda.</p>
    <table v-if="campaigns.length > 0" class="table campaigns-table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Período</th>
          <th>Status</th>
          <th>Público-Alvo</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="campaign in campaigns" :key="campaign.id">
          <td>{{ campaign.name }}</td>
          <td>{{ campaign.period }}</td>
          <td>
            <span :class="['status-badge', getStatusClass(campaign.status)]">
              {{ campaign.status }}
            </span>
          </td>
          <td>{{ campaign.targetAudience }}</td>
          <td>
            <button @click="emitEdit(campaign.id)" class="btn btn-sm btn-info">Editar</button>
            <button @click="emitDelete(campaign.id)" class="btn btn-sm btn-danger">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const props = defineProps({
  campaigns: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const emit = defineEmits(["edit-campaign", "delete-campaign"]);

const emitEdit = (id) => {
  emit("edit-campaign", id);
};

const emitDelete = (id) => {
  // Consider adding a confirmation dialog here in a real application
  emit("delete-campaign", id);
};

const getStatusClass = (status) => {
  switch (status?.toLowerCase()) {
    case 'ativa':
      return 'status-active';
    case 'concluída':
      return 'status-completed';
    case 'cancelada':
      return 'status-cancelled';
    case 'planejada':
    default:
      return 'status-planned';
  }
};
</script>

<style scoped>
.campaigns-table-container {
  margin-top: 30px;
  background-color: #fff;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.campaigns-table-container h3 {
  margin-bottom: 20px;
  color: #343a40;
  font-weight: 600;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

.table th,
.table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #dee2e6;
  vertical-align: middle;
}

.table thead th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #495057;
  font-size: 0.9rem;
  text-transform: uppercase;
}

.table tbody tr:hover {
  background-color: #f1f3f5;
}

.table td {
  font-size: 0.95rem;
  color: #212529;
}

.table td:last-child {
  text-align: right; /* Align actions to the right */
}

.btn {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.85rem;
  transition: background-color 0.2s, box-shadow 0.2s;
  margin-left: 5px;
}

.btn-sm {
  padding: 4px 8px;
  font-size: 0.8rem;
}

.btn-info {
  background-color: #17a2b8;
  color: white;
}

.btn-info:hover {
  background-color: #117a8b;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover {
  background-color: #bd2130;
}

.status-badge {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
  display: inline-block;
  text-align: center;
  min-width: 80px;
}

.status-active {
  background-color: #d4edda; /* Light green */
  color: #155724; /* Dark green */
}

.status-planned {
  background-color: #cce5ff; /* Light blue */
  color: #004085; /* Dark blue */
}

.status-completed {
  background-color: #e2e3e5; /* Light grey */
  color: #383d41; /* Dark grey */
}

.status-cancelled {
  background-color: #f8d7da; /* Light red */
  color: #721c24; /* Dark red */
}
</style>
