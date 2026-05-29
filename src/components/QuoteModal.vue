<script setup>
import { ref, reactive, computed } from 'vue'
import content from '../data/content.js'
import { useWhatsApp } from '../composables/useWhatsApp.js'

const props = defineProps({ modelValue: Boolean })
const emit = defineEmits(['update:modelValue'])

const { quote, services } = content
const { sendQuote } = useWhatsApp()

const step = ref(1)
const error = ref('')
const customRoomInput = ref('')
const showCustomInput = ref(false)

const form = reactive({
  services: [],
  rooms: [],
  description: '',
  name: '',
  phone: '',
})

// Deduplicated room suggestions based on selected services
const suggestedRooms = computed(() => {
  const seen = new Set()
  const result = []
  for (const id of form.services) {
    const svc = services.items.find(s => s.id === id)
    if (svc?.rooms) {
      for (const r of svc.rooms) {
        if (!seen.has(r)) {
          seen.add(r)
          result.push(r)
        }
      }
    }
  }
  return result
})

// Rooms from allRooms not yet added to the list
const availableRooms = computed(() => {
  const added = new Set(form.rooms.map(r => r.name))
  return quote.allRooms.filter(r => !added.has(r))
})

// Auto-calculated total m²
const totalSqm = computed(() => {
  const t = form.rooms.reduce((s, r) => s + (parseFloat(r.sqm) || 0), 0)
  return t > 0 ? t : null
})

function addRoom(name) {
  if (!form.rooms.find(r => r.name === name)) {
    form.rooms.push({ name, sqm: '', services: [...form.services] })
  }
}

function removeRoom(index) {
  form.rooms.splice(index, 1)
}

function addCustomRoom() {
  const name = customRoomInput.value.trim()
  if (name && !form.rooms.find(r => r.name === name)) {
    form.rooms.push({ name, sqm: '', services: [...form.services] })
  }
  customRoomInput.value = ''
  showCustomInput.value = false
}

const stepTitle = computed(() => quote.stepTitles[step.value - 1])
const stepSubtitle = computed(() => quote.stepSubtitles[step.value - 1])
const trackFillWidth = computed(() => `${(step.value - 1) * 50}%`)

function getStepClass(n) {
  if (step.value > n) return 'done'
  if (step.value === n) return 'active'
  return 'pending'
}

function getServiceLabel(id) {
  return quote.serviceOptions.find(o => o.id === id)?.label ?? id
}

function toggleRoomService(roomIndex, serviceId) {
  const room = form.rooms[roomIndex]
  const idx = room.services.indexOf(serviceId)
  if (idx === -1) room.services.push(serviceId)
  else room.services.splice(idx, 1)
}

function handleNext() {
  error.value = ''
  if (step.value === 1) {
    if (form.services.length === 0) {
      error.value = 'Selecione ao menos um serviço para continuar.'
      return
    }
    // Pre-populate rooms from suggestions (only if list is empty)
    if (form.rooms.length === 0) {
      for (const name of suggestedRooms.value) {
        form.rooms.push({ name, sqm: '', services: [...form.services] })
      }
    }
    step.value = 2
    return
  }
  if (step.value === 2) {
    step.value = 3
    return
  }
  if (step.value === 3) {
    if (!form.name.trim()) {
      error.value = 'Informe seu nome para continuar.'
      return
    }
    sendQuote({ ...form, rooms: form.rooms.filter(r => r.name) })
    closeAndReset()
  }
}

function handleBack() {
  if (step.value > 1) {
    step.value--
    error.value = ''
  }
}

function closeAndReset() {
  emit('update:modelValue', false)
  setTimeout(() => {
    step.value = 1
    error.value = ''
    customRoomInput.value = ''
    showCustomInput.value = false
    Object.assign(form, {
      services: [],
      rooms: [],
      description: '',
      name: '',
      phone: '',
    })
  }, 350)
}
</script>

<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    max-width="580"
    persistent
    scrollable
  >
    <v-card style="border-radius: 16px !important; overflow: hidden">
      <!-- Header -->
      <div
        style="
          background: linear-gradient(135deg, #1E3A47 0%, #2E5266 100%);
          padding: 24px 24px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <div>
          <h2
            style="
              font-family: Montserrat, sans-serif;
              font-weight: 800;
              font-size: 1.15rem;
              color: white;
              margin: 0 0 4px;
            "
          >
            {{ quote.title }}
          </h2>
          <p style="color: rgba(255,255,255,0.65); font-size: 0.82rem; margin: 0">
            Gratuito e sem compromisso
          </p>
        </div>
        <v-btn
          icon
          variant="text"
          size="small"
          style="color: rgba(255,255,255,0.7)"
          @click="closeAndReset"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>

      <!-- Step indicator -->
      <div style="padding: 20px 24px 0">
        <div class="step-indicator">
          <div class="step-track">
            <div class="step-track-fill" :style="{ width: trackFillWidth }" />
          </div>
          <div v-for="n in 3" :key="n" class="step-item">
            <div :class="['step-dot', getStepClass(n)]">
              <v-icon v-if="step > n" size="14">mdi-check</v-icon>
              <span v-else>{{ n }}</span>
            </div>
            <span
              class="step-item-label"
              :style="{ color: step === n ? '#1E3A47' : '#9CA3AF' }"
            >{{ quote.stepLabels[n - 1] }}</span>
          </div>
        </div>
      </div>

      <!-- Content -->
      <v-card-text style="padding: 20px 24px">
        <div class="mb-4">
          <h3 style="font-family: Montserrat, sans-serif; font-weight: 700; font-size: 1rem; color: #1E3A47; margin-bottom: 4px">
            {{ stepTitle }}
          </h3>
          <p style="color: #6B7280; font-size: 0.85rem; margin: 0">{{ stepSubtitle }}</p>
        </div>

        <!-- Step 1: Services -->
        <div v-if="step === 1">
          <v-row>
            <v-col
              v-for="opt in quote.serviceOptions"
              :key="opt.id"
              cols="6"
            >
              <v-checkbox
                v-model="form.services"
                :value="opt.id"
                :label="opt.label"
                color="primary"
                density="comfortable"
                hide-details
              />
            </v-col>
          </v-row>
        </div>

        <!-- Step 2: Rooms -->
        <div v-else-if="step === 2">

          <!-- Added rooms list -->
          <div v-if="form.rooms.length > 0" class="room-list mb-3">
            <div
              v-for="(room, i) in form.rooms"
              :key="i"
              class="room-row"
            >
              <div class="room-row-header">
                <span class="room-name">{{ room.name }}</span>
                <div class="room-sqm-wrap">
                  <input
                    v-model="room.sqm"
                    type="number"
                    min="1"
                    placeholder="m²"
                    class="room-sqm-input"
                  />
                  <span class="room-sqm-unit">m²</span>
                </div>
                <button class="room-remove-btn" @click="removeRoom(i)" aria-label="Remover">
                  <v-icon size="16" color="grey">mdi-close</v-icon>
                </button>
              </div>
              <div v-if="form.services.length > 0" class="room-service-tags">
                <button
                  v-for="svcId in form.services"
                  :key="svcId"
                  :class="['room-svc-tag', room.services.includes(svcId) ? 'active' : '']"
                  @click="toggleRoomService(i, svcId)"
                >
                  {{ getServiceLabel(svcId) }}
                </button>
              </div>
            </div>
          </div>

          <!-- Total summary -->
          <div
            v-if="totalSqm"
            class="room-total"
          >
            <v-icon size="15" color="secondary" class="mr-1">mdi-ruler-square</v-icon>
            Área total aprox.: <strong>{{ totalSqm }}m²</strong>
          </div>

          <!-- Available room chips -->
          <div v-if="availableRooms.length > 0 || !showCustomInput" class="mt-3">
            <p style="font-size: 0.78rem; color: #9CA3AF; margin-bottom: 8px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px">
              Adicionar cômodo
            </p>
            <div class="room-chips">
              <button
                v-for="name in availableRooms"
                :key="name"
                class="room-chip"
                @click="addRoom(name)"
              >
                <v-icon size="13" class="mr-1">mdi-plus</v-icon>
                {{ name }}
              </button>
              <button
                v-if="!showCustomInput"
                class="room-chip room-chip--custom"
                @click="showCustomInput = true"
              >
                <v-icon size="13" class="mr-1">mdi-pencil-outline</v-icon>
                Personalizado...
              </button>
            </div>
          </div>

          <!-- Custom room input -->
          <div v-if="showCustomInput" class="mt-3 d-flex align-center" style="gap: 8px">
            <v-text-field
              v-model="customRoomInput"
              label="Nome do cômodo"
              placeholder="Ex: Varanda gourmet"
              density="compact"
              variant="outlined"
              color="primary"
              hide-details
              autofocus
              style="flex: 1"
              @keyup.enter="addCustomRoom"
            />
            <v-btn color="primary" size="small" icon @click="addCustomRoom">
              <v-icon size="18">mdi-check</v-icon>
            </v-btn>
            <v-btn variant="text" size="small" icon @click="showCustomInput = false; customRoomInput = ''">
              <v-icon size="18" color="grey">mdi-close</v-icon>
            </v-btn>
          </div>

          <!-- Empty state -->
          <div
            v-if="form.rooms.length === 0"
            style="
              background: #F9FAFB;
              border: 1px dashed #D1D5DB;
              border-radius: 10px;
              padding: 16px;
              text-align: center;
              color: #9CA3AF;
              font-size: 0.85rem;
              margin-bottom: 12px;
            "
          >
            <v-icon size="24" color="grey-lighten-1" class="mb-1">mdi-home-outline</v-icon>
            <p style="margin: 0">Nenhum cômodo adicionado. Use os chips acima para adicionar.</p>
          </div>

          <!-- Description -->
          <v-textarea
            v-model="form.description"
            label="Detalhes adicionais (opcional)"
            placeholder="Ex: Reforma completa de apartamento, incluindo troca de piso e pintura..."
            rows="3"
            color="primary"
            hide-details="auto"
            class="mt-4"
          />
        </div>

        <!-- Step 3: Contact -->
        <div v-else class="d-flex flex-column" style="gap: 16px">
          <v-text-field
            v-model="form.name"
            label="Seu nome completo"
            placeholder="Ex: João Silva"
            color="primary"
            required
            hide-details="auto"
          >
            <template #prepend-inner>
              <v-icon size="18" color="primary">mdi-account-outline</v-icon>
            </template>
          </v-text-field>

          <v-text-field
            v-model="form.phone"
            label="Seu WhatsApp (opcional)"
            type="tel"
            placeholder="Ex: (11) 98765-4321"
            color="primary"
            hide-details="auto"
          >
            <template #prepend-inner>
              <v-icon size="18" color="primary">mdi-whatsapp</v-icon>
            </template>
          </v-text-field>

          <div
            style="
              background: rgba(245,155,10,0.08);
              border: 1px solid rgba(245,155,10,0.25);
              border-radius: 10px;
              padding: 12px 14px;
              display: flex;
              align-items: flex-start;
              gap: 10px;
            "
          >
            <v-icon size="18" color="secondary" style="margin-top: 1px; flex-shrink: 0">mdi-information-outline</v-icon>
            <p style="font-size: 0.8rem; color: #6B7280; margin: 0; line-height: 1.6">
              Ao clicar em <strong>"Enviar via WhatsApp"</strong>, abriremos o WhatsApp com uma mensagem pré-preenchida com todos os detalhes do seu pedido para o Kairo.
            </p>
          </div>
        </div>

        <!-- Error -->
        <v-alert
          v-if="error"
          type="error"
          variant="tonal"
          density="compact"
          class="mt-4"
          style="font-size: 0.85rem"
        >
          {{ error }}
        </v-alert>
      </v-card-text>

      <!-- Actions -->
      <v-card-actions style="padding: 0 24px 24px; gap: 12px">
        <v-btn
          v-if="step > 1"
          variant="text"
          color="primary"
          class="font-weight-bold"
          @click="handleBack"
        >
          <v-icon start>mdi-arrow-left</v-icon>
          Voltar
        </v-btn>

        <v-spacer />

        <v-btn
          color="primary"
          size="large"
          class="font-weight-bold px-6"
          style="min-width: 160px"
          @click="handleNext"
        >
          <template v-if="step < 3">
            Continuar
            <v-icon end>mdi-arrow-right</v-icon>
          </template>
          <template v-else>
            <v-icon start>mdi-whatsapp</v-icon>
            Enviar via WhatsApp
          </template>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
