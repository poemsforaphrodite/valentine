<template>
  <div class="chat-container">
      <!-- Display downloaded MP4 video -->
      <video controls width="400" v-if="downloadedUrl">
          <source :src="downloadedUrl" type="video/mp4">
          Your browser does not support the video tag.
      </video>

      <div class="chat-messages">
          <div v-for="(message, index) in userMessages" :key="index" class="user-message">
              <p>{{ message.content }}</p>
          </div>
      </div>

      <!-- User input -->
      <div class="chat-input">
          <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type your message...">
      </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const messages = ref([]);
const newMessage = ref('');
const DEEPSEEK_API_KEY = 'sk-f0e6fd9443b144fdbbda6f3582ed621f';
let downloadedUrl = '';

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

          // Fetch using the response from Deepseek API
          const dIdResponse = await fetch('https://api.d-id.com/talks', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Basic cHVzaHBlbmRlcnNvbGFua2lfY28yMWE2XzIzQGR0dS5hYy5pbg:Sys_5ijzmwoCSsZSfjqOh'
              },
              body: JSON.stringify({
                  source_url: "https://d-id-public-bucket.s3.amazonaws.com/or-roman.jpg",
                  script: {
                      type: "text",
                      input: data.choices[0].message.content // Using output from Deepseek API
                  }
              })
          });

          if (dIdResponse.ok) {
              const dIdData = await dIdResponse.json();
              const talkId = dIdData.id;

              let talkStatus = '';
              do {
                  await new Promise(resolve => setTimeout(resolve, 2000));
                  const talkResponse = await fetch(`https://api.d-id.com/talks/${talkId}`, {
                      headers: {
                          'Authorization': 'Basic cHVzaHBlbmRlcnNvbGFua2lfY28yMWE2XzIzQGR0dS5hYy5pbg:Sys_5ijzmwoCSsZSfjqOh'
                      }
                  });
                  const talkData = await talkResponse.json();
                  talkStatus = talkData.status;
              } while (talkStatus !== "done");

              const talkResponse = await fetch(`https://api.d-id.com/talks/${talkId}`, {
                  headers: {
                      'Authorization': 'Basic cHVzaHBlbmRlcnNvbGFua2k4OTVAZ21haWwuY29t:UgWn04MfqbEs-pffRq282'
                  }
              });
              const talkData = await talkResponse.json();
              downloadedUrl = talkData.result_url;
              const systemMessage = { role: 'system', content: `Your talk is ready. You can view it [here](${downloadedUrl}).` };
              messages.value.push(systemMessage);
          } else {
              console.error('Error:', dIdResponse.status);
          }
      } else {
          console.error('Error:', response.status);
      }

      newMessage.value = '';
  }
}

// Computed property to filter out user messages
const userMessages = computed(() => messages.value.filter(message => message.role === 'user'));
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

.user-message {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
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

  .user-message {
      padding: 6px;
      font-size: 0.8em;
  }
}
</style>
