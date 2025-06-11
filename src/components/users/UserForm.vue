<script setup lang="ts">
import { useUserStore } from '@/store/UserStore';
import { useRoleStore } from '@/store/RoleStore'; // Para obtener roles disponibles
import { UserValidator } from "@/utils/UserValidators";
import Swal from "sweetalert2";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from 'vue-router';

const props = defineProps<{ userId?: number }>();

const user = reactive({
  name: "",
  email: "",
  password: "",
  is_active: false,

  profile: {
    age: null,
    phone: "",
  },
  address: {
    city: "",
  },
  roles: [] as number[], // Solo IDs de roles seleccionados
});

const errors = reactive<Record<string, string>>({});
const isSubmitting = ref(false);
const successMessage = ref("");
const store = useUserStore();
const roleStore = useRoleStore();
const router = useRouter();

const roles = ref<{ id: number, name: string }[]>([]);

const validateField = (fieldPath: string) => {
  const [main, sub] = fieldPath.split(".");
  const value = sub ? user[main][sub] : user[main];

  const result = UserValidator.validateField(fieldPath, value);

  if (!result.success) {
    errors[fieldPath] = result.error.errors[0].message;
  } else {
    delete errors[fieldPath];
  }
};

const validateAllFields = () => {
  ["name", "email", "password", "profile.age", "address.city", "profile.phone"].forEach(validateField);
};

onMounted(async () => {
  try {
    roles.value = await roleStore.getAll(); // Cargar roles
  } catch (err) {
    console.error("Error cargando roles", err);
  }

  if (props.userId) {
    try {
      const response = await store.getUser(props.userId);
      if (response.status === 200) {
        const fetchedUser = response.data;
        Object.assign(user, {
          ...fetchedUser,
          profile: fetchedUser.profile || { age: null, phone: "" },
          address: fetchedUser.address || { city: "" },
          roles: fetchedUser.roles?.map((r: any) => r.id) || [],
        });
      }
    } catch (error) {
      console.error("Error al cargar usuario:", error);
    }
  }
});

const submitForm = async () => {
  validateAllFields();
  if (Object.keys(errors).length > 0) return;

  isSubmitting.value = true;
  successMessage.value = "";

  try {
    let response;
    if (props.userId) {
      response = await store.editUser(props.userId, user);
    } else {
      response = await store.addUser(user);
    }

    if ([200, 201].includes(response.status)) {
      Swal.fire({
        title: 'Éxito',
        text: props.userId ? 'Usuario actualizado con éxito ✅' : 'Usuario creado con éxito ✅',
        icon: 'success',
        confirmButtonText: 'OK',
        timer: 3000
      });
      router.push('/users');
    } else {
      throw new Error(response.data?.message || "Error");
    }
  } catch (error) {
    Swal.fire({
      title: 'Error',
      text: '❌ Ocurrió un error al guardar el usuario.',
      icon: 'error',
      confirmButtonText: 'OK',
      timer: 3000
    });
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="w-full bg-white shadow-lg rounded-lg p-8">
      <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">
        {{ props.userId ? "Editar Usuario" : "Crear Usuario" }}
      </h2>

      <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Datos básicos -->
        <div>
          <label class="block">Nombre:</label>
          <input v-model="user.name" @blur="() => validateField('name')" type="text" class="input" />
          <span class="error" v-if="errors.name">{{ errors.name }}</span>
        </div>

        <div>
          <label class="block">Email:</label>
          <input v-model="user.email" @blur="() => validateField('email')" type="email" class="input" />
          <span class="error" v-if="errors.email">{{ errors.email }}</span>
        </div>

        <div>
          <label class="block">Contraseña:</label>
          <input v-model="user.password" @blur="() => validateField('password')" type="password" class="input" />
          <span class="error" v-if="errors.password">{{ errors.password }}</span>
        </div>

        <!-- Profile -->
        <div>
          <label class="block">Edad:</label>
          <input v-model.number="user.profile.age" @blur="() => validateField('profile.age')" type="number" class="input" />
          <span class="error" v-if="errors['profile.age']">{{ errors['profile.age'] }}</span>
        </div>

        <div>
          <label class="block">Teléfono:</label>
          <input v-model="user.profile.phone" @blur="() => validateField('profile.phone')" type="text" class="input" />
          <span class="error" v-if="errors['profile.phone']">{{ errors['profile.phone'] }}</span>
        </div>

        <!-- Address -->
        <div>
          <label class="block">Ciudad:</label>
          <input v-model="user.address.city" @blur="() => validateField('address.city')" type="text" class="input" />
          <span class="error" v-if="errors['address.city']">{{ errors['address.city'] }}</span>
        </div>

        <!-- Roles -->
        <div class="col-span-1 md:col-span-2">
          <label class="block">Roles:</label>
          <select v-model="user.roles" multiple class="input h-32">
            <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
          </select>
        </div>

        <!-- Estado activo -->
        <div class="col-span-2 flex items-center">
          <input type="checkbox" v-model="user.is_active" />
          <label class="ml-2">Activo</label>
        </div>

        <!-- Botón enviar -->
        <div class="col-span-2">
          <button type="submit" :disabled="isSubmitting" class="btn-primary w-full">
            {{ isSubmitting ? "Enviando..." : props.userId ? "Actualizar" : "Crear" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.input {
  @apply mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500;
}
.error {
  @apply text-red-500 text-sm;
}
.btn-primary {
  @apply bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400;
}
</style>
