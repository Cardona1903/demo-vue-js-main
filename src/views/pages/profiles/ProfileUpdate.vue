<template>
    <div>
        <h1>Editar Perfil</h1>
        <ProfileForm
            v-if="profileId !== null"
            :ProfileId="profileId"
            :modelValue="profile"
            @submit="updateProfile"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ProfileForm from '@/components/profiles/ProfileForm.vue';

const route = useRoute();
const profileId = ref<number | null>(null);
const profile = ref<any>({}); // Replace 'any' with your Profile type if available

onMounted(() => {
    const idParam = route.params.id;
    // Ensure idParam is a string before parsing
    if (typeof idParam === 'string') {
        profileId.value = parseInt(idParam, 10);
    } else if (Array.isArray(idParam) && typeof idParam[0] === 'string') {
        profileId.value = parseInt(idParam[0], 10);
    } else {
        profileId.value = null;
    }
    // TODO: Fetch the profile data by profileId and assign to 'profile.value'
});

function updateProfile(updatedProfile: any) {
    // TODO: Implement the update logic
    // For example, send updatedProfile to your API
    profile.value = updatedProfile;
}
</script>
