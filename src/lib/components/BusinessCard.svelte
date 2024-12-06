<script>
    export let business;
</script>
  
<div class="card p-4 bg-surface-800 border border-surface-900 rounded-lg shadow-md hover:shadow-xl transition-all transform hover:scale-105">
    <img src={business.avatarUrl} alt={business.name} class="w-24 h-24 object-cover rounded-full mx-auto" />
    <h3 class="text-xl font-semibold mt-4 text-center text-primary-200">{business.name}</h3>
    <p class="text-sm text-primary-300 text-center">{business.type}</p>
    <p class="text-sm mt-2 text-primary-400 text-center">{business.about}</p>
</div>