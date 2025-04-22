<script setup>
import { useUserStore } from '@/stores/user';
import { server_url } from '@/util';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const user = ref({});
const error = ref(null);
const token = userStore.token;
const isModalOpen = ref(false);
const router = useRouter();

async function fetchUserProfile() {
    if (!token) {
        error.value = "Unauthorized: No token found.";
        return;
    }

    try {
        const response = await fetch(server_url + '/user', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            user.value = data.user;
            // user.value = {
            //     ...data,
            //     firstName: data.firstName,
            //     lastName: data.lastName
            // };
            console.log("fetch", data)
        } else if (response.status === 401) {
            error.value = "Unauthorized: Invalid token.";
        } else {
            error.value = "Failed to fetch user data.";
        }
    } catch (err) {
        error.value = "An error occurred while fetching data.";
        console.error(err);
    }
}

const openModal = () => {
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
};

const saveChanges = async () => {
    try {
        const payload = {
            userName: user.value.userName,
            firstName: user.value.firstName,
            lastName: user.value.lastName,
            email: user.value.email,
            password: user.value.password
        };

        const response = await fetch(server_url + '/user', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            console.log("changes saved")
            const updatedUser = await response.json();
            user.value = updatedUser;
            userStore.setUser(
                userStore.token,
                updatedUser.firstName,
                updatedUser.lastName,
                updatedUser.email,
                updatedUser.userName
            );
            // window.updateMainUsername();
            fetchUserProfile();
            closeModal();
        } else {
            const errorData = await response.json();
            error.value = `Failed to update user data: ${errorData.message}`;
        }
    } catch (err) {
        error.value = "An error occurred while updating data.";
        console.error(err);
    }
};

onMounted(fetchUserProfile);
</script>

<template>
    <main>
        <h1>Profile</h1>
        <div id="profile-cont">

            <div v-if="error" class="error-message">
                <p>{{ error }}</p>
            </div>

            <div v-else-if="user">
                <p><strong>Username:</strong> {{ user.userName }}</p>
                <p><strong>First Name:</strong> {{ user.firstName }}</p>
                <p><strong>Last Name:</strong> {{ user.lastName }}</p>
                <p><strong>Email:</strong> {{ user.email }}</p>
                <button @click="openModal" class="edit-button">Edit</button>
            </div>

            <!-- <button @click="router.back()" class="back-button">Go Back</button> -->

            <div v-if="isModalOpen" class="modal" @click.self="closeModal">
                <div class="modal-content">
                    <button class="close-button" @click="closeModal">X</button>
                    <h3>Edit Profile</h3>
                    <label>
                        Username:
                        <input type="text" v-model="user.userName" />
                    </label>
                    <label>
                        First Name:
                        <input type="text" v-model="user.firstName" />
                    </label>
                    <label>
                        Last Name:
                        <input type="text" v-model="user.lastName" />
                    </label>
                    <label>
                        Email:
                        <input type="email" v-model="user.email" />
                    </label>
                    <div class="modal-actions">
                        <button @click="saveChanges">Save</button>
                        <button @click="closeModal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>

#profile-cont {
    font-size: larger;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 60%;
    background-color: var(--anakiwa);
    padding: 20px;
    border-radius: 10px;
}

main {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90vw;
    margin-top: 70px;
}


.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.close-button {
    background: none;
    border: none;
    font-size: 1.5rem;
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
}

.modal-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.edit-button{
    margin-top: 10px;
    padding: 10px 20px;
    background-color: var(--dodgerblue);
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.edit-button:hover{
    background-color: var(--darkteal);
}
</style>

