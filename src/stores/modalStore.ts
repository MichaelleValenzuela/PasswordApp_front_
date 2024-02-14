import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRoute } from 'vue-router';
import { adminResourceStore } from './adminResourceStore';
import { userResourceStore } from './userResource';

export const modalStore = defineStore('modalStore', () => {
    const userStore = userResourceStore()
    const useAdmin = adminResourceStore()

    const isModalOpen = ref(false);
    const isRefreshRecord = ref(false);
    const objectToEdit = ref({ isEditable: true, data: {} });

    const $route = useRoute();

    const onOpenModal = () => {
        isModalOpen.value = true;
        isRefreshRecord.value = false;
        objectToEdit.value= {isEditable: true, data: {}};
    }

    const onCloseModal = () => {    

        isModalOpen.value = false;
        isRefreshRecord.value = true;
        objectToEdit.value= {isEditable: true, data: {}};

        if($route.path === "/admin-resource"){
            useAdmin.actionMainAdminResourceStore("ACTION_GET_ADMIN_RESOURCES", null);
        } else if($route.path === "/entries"){
            userStore.actionMainUserResourceStore("ACTION_GET_USER_RESOURCES", null)
        }

    }

    const onEditData = (data: any) => {
        isModalOpen.value = true;
        objectToEdit.value = {isEditable: true, data: data};
    }
    
    const onOnlyWtachData = (data: any) => {
        isModalOpen.value = true;
        objectToEdit.value = {isEditable: false, data: data};
    }

    return {
        isModalOpen,
        isRefreshRecord,
        objectToEdit,
        onOpenModal,
        onCloseModal,
        onEditData,
        onOnlyWtachData
    }
})
