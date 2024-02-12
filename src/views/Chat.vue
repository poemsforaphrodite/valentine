<template>
    <div class="chat-container">
        <div class="chat-messages">
            <div v-for="(message, index) in messages" :key="index"
                :class="{ 'system-message': message.role === 'system', 'user-message': message.role === 'user' }">
                <p>{{ message.content }}</p>
            </div>
        </div>
        <div class="chat-input">
            <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type your message...">
        </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';

const messages = ref([]);
const newMessage = ref('');
const DEEPSEEK_API_KEY = 'sk-f0e6fd9443b144fdbbda6f3582ed621f';

async function sendMessage() {
    if (newMessage.value.trim() !== '') {
        const userMessage = { role: 'user', content: newMessage.value.trim() };
        messages.value.push(userMessage);

        const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [
                    { role: 'system', content: "You are an expert." },
                    userMessage
                ]
            })
        });

        if (response.ok) {
            const data = await response.json();
            const systemMessage = { role: 'system', content: data.choices[0].message.content };
            messages.value.push(systemMessage);
        } else {
            console.error('Error:', response.status);
        }

        newMessage.value = '';
    }
}
</script>
  
<style scoped>
.chat-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 20px;
    box-sizing: border-box;
}

.chat-messages {
    flex-grow: 1;
    overflow-y: auto;
    margin-bottom: 10px;
}

.chat-input {
    display: flex;
    align-items: center;
}

.chat-input input {
    flex-grow: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 10px;
}

.chat-input button {
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.system-message,
.user-message {
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 4px;
}

.system-message {
    background-color: #f0f0f0;
    align-self: flex-start;
}

.user-message {
    background-color: #007bff;
    color: white;
    align-self: flex-end;
}

/* Responsive styles */
@media (max-width: 768px) {
    .chat-container {
        padding: 10px;
    }

    .chat-input input {
        padding: 8px;
        font-size: 0.9em;
    }

    .chat-input button {
        padding: 8px;
        font-size: 0.9em;
    }

    .system-message,
    .user-message {
        padding: 8px;
        font-size: 0.9em;
    }
}

@media (max-width: 480px) {
    .chat-container {
        padding: 5px;
    }

    .chat-input input {
        padding: 6px;
        font-size: 0.8em;
    }

    .chat-input button {
        padding: 6px;
        font-size: 0.8em;
    }

    .system-message,
    .user-message {
        padding: 6px;
        font-size: 0.8em;
    }
}
</style>